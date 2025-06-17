import 'dotenv/config';
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { CohereClient } from "cohere-ai";
import path from "path";
import * as fs from 'fs';

// Custom embeddings class that works with Cohere's new API
class CohereEmbeddings {
  private client: CohereClient;

  constructor(apiKey: string) {
    this.client = new CohereClient({ token: apiKey });
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const response = await this.client.embed({
      texts,
      model: "embed-english-v3.0",
      inputType: "search_document",
    });

    // Convert embeddings to number arrays
    return response.embeddings as number[][];
  }

  async embedQuery(text: string): Promise<number[]> {
    const response = await this.client.embed({
      texts: [text],
      model: "embed-english-v3.0",
      inputType: "search_query",
    });

    // Return first embedding as number array
    return (response.embeddings as number[][])[0];
  }
}

// Function to load a document from text file
export async function loadDocumentFromText(filePath: string): Promise<Document[]> {
  try {
    const text = fs.readFileSync(filePath, 'utf-8');
    return [new Document({ pageContent: text })];
  } catch (error) {
    console.error("Error loading document:", error);
    throw new Error(`Failed to load document from ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Simple fallback response generator that doesn't use RAG
 */
async function generateFallbackResponse(query: string, cohereApiKey: string, context?: string): Promise<string> {
  if (!query || typeof query !== 'string') {
    return "I'm sorry, I couldn't understand your question. Please try again with a clear question.";
  }
  
  try {
    // Direct use of Cohere API without RAG
    const client = new CohereClient({ token: cohereApiKey });
    const response = await client.chat({
      message: query,
      model: "command",
      temperature: 0.3,
      preamble: "You are a helpful assistant for a web development agency called Web Agency. You provide information about web development, design, and marketing services. If you don't know something specific, you should still try to provide a helpful general response related to the topic.",
      documents: context ? [{ text: context }] : undefined,
    });
    
    return response.text;
  } catch (error) {
    console.error("Fallback response error:", error);
    return "I'm sorry, I couldn't process your request at this time. Please try asking in a different way.";
  }
}

/**
 * RAG Chain implementation
 */
export const createRAGChain = async () => {
  try {
    const pineconeApiKey = process.env.PINECONE_API_KEY;
    const cohereApiKey = process.env.COHERE_API_KEY;

    if (!pineconeApiKey || !cohereApiKey) {
      throw new Error("Missing API keys in environment variables");
    }

    console.log("Initializing embeddings with Cohere API...");
    const embeddings = new CohereEmbeddings(cohereApiKey);
    
    console.log("Connecting to Pinecone...");
    const pinecone = new Pinecone({ apiKey: pineconeApiKey });
    const index = pinecone.Index("webagency-2");
    
    // Initialize Cohere client for generation
    console.log("Initializing Cohere client for generation...");
    const cohereClient = new CohereClient({ 
      token: cohereApiKey 
    });

    let vectorStore: PineconeStore | null = null;
    
    try {
      console.log("Initializing vector store from Pinecone index...");
      // Use a timestamp-based namespace to ensure fresh data
      const namespace = `chatbot_${Date.now()}`;
      console.log(`Using namespace: ${namespace}`);
      
      vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex: index,
        namespace: namespace,
      });
      
      // Always initialize vector store with fresh documents
      console.log("Loading fresh documents...");
      await initializeVectorStore(vectorStore);
      console.log("Vector store initialized with fresh documents");
      
    } catch (error) {
      console.error("Error setting up vector store:", error);
      throw error;
    }

    return {
      async search(query: string, k: number = 3) {
        if (!query.trim() || !vectorStore) return [];
        try {
          return await vectorStore.similaritySearch(query, k);
        } catch (error) {
          console.error("Search error:", error);
          return [];
        }
      },

      async addDocuments(documents: Document[]) {
        if (!vectorStore) {
          console.log("Vector store not available");
          return { success: false, count: 0 };
        }
        
        try {
          const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 100,
          });

          const splitDocs = await textSplitter.splitDocuments(documents);
          await vectorStore.addDocuments(splitDocs);
          return { success: true, count: splitDocs.length };
        } catch (error) {
          console.error("Error adding documents:", error);
          throw new Error(`Failed to add documents to vector store: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      },
      
      async generateAnswer(query: string) {
        // Check if query is valid
        if (!query || typeof query !== 'string') {
          return "I'm sorry, I couldn't understand your question. Please try again with a clear question.";
        }
        
        try {
          if (!vectorStore) {
            // If vector store is not available, use fallback
            console.log("Vector store not available, using fallback response");
            return generateFallbackResponse(query, cohereApiKey);
          }
          
          console.log("Searching for relevant documents...");
          // Increase the number of documents retrieved for better context
          const docs = await vectorStore.similaritySearch(query, 5);
          console.log(`Found ${docs.length} relevant documents`);
          
          // Extract content from documents
          const context = docs.map((doc: Document) => doc.pageContent).join('\n\n');
          console.log("Retrieved context:", context);
          
          // Generate response using the context
          console.log("Generating answer with Cohere...");
          const response = await cohereClient.chat({
            message: query,
            model: 'command',
            temperature: 0.3,
            preamble: `You are a helpful assistant for GoOnline.Site, a web development agency. You have access to the company's documentation and should use it to answer questions accurately. When asked about people, company details, or services, always refer to the provided context. The company was founded by Yash Siwach and is based in Gurugram, India. Current question: "${query}"`,
            documents: [{ text: context }],
            chatHistory: []
          });
          
          return response.text;
        } catch (error) {
          console.error("Error generating answer:", error);
          // Try fallback response if the main method fails
          return generateFallbackResponse(query, cohereApiKey);
        }
      }
    };
  } catch (error) {
    console.error("Error initializing RAG chain:", error);
    throw new Error(`Failed to initialize RAG chain: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Check if documents exist in the vector store
async function checkDocumentCount(vectorStore: PineconeStore) {
  try {
    const testResults = await vectorStore.similaritySearch("test", 1);
    return testResults.length;
  } catch (error) {
    console.error("Error checking document count:", error);
    return 0;
  }
}

// Initialize vector store with documents if empty
async function initializeVectorStore(vectorStore: PineconeStore) {
  try {
    // Look for a document in the public folder - can be a text file instead of PDF
    const publicPath = path.join(process.cwd(), 'public');
    console.log("Looking for documents in:", publicPath);
    
    // Try to find common document files
    const possibleDocs = [
      'doc.txt',  // Prioritize doc.txt
      'document.txt',
      'info.txt',
      'data.txt',
      'about.txt'
    ];
    
    let documents: Document[] = [];
    let foundDocs = false;
    
    // Try each possible document
    for (const docName of possibleDocs) {
      const filePath = path.join(publicPath, docName);
      console.log(`Checking for document: ${filePath}`);
      if (fs.existsSync(filePath)) {
        console.log(`Found document: ${filePath}`);
        try {
          const text = fs.readFileSync(filePath, 'utf-8');
          console.log(`Document content preview: ${text.substring(0, 100)}...`);
          
          // Split the document into sections based on headers
          const sections = text.split(/^#{1,3}\s+/m).filter(Boolean);
          
          // Create a document for each section to improve context retrieval
          const sectionDocs = sections.map(section => new Document({ 
            pageContent: section.trim(),
            metadata: { source: filePath }
          }));
          
          documents = [...documents, ...sectionDocs];
          foundDocs = true;
          console.log(`Processed ${sectionDocs.length} sections from ${filePath}`);
        } catch (error) {
          console.error(`Error reading ${filePath}:`, error);
        }
      } else {
        console.log(`Document not found: ${filePath}`);
      }
    }
    
    // If no document found, create a simple one with basic info
    if (!foundDocs) {
      console.log("No documents found, creating default content");
      const defaultContent = "This is a chatbot for GoOnline.Site, a web development agency founded by Yash Siwach. We provide web development, design, and marketing services.";
      documents = [new Document({ pageContent: defaultContent })];
    }
    
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500, // Reduced chunk size for better context
      chunkOverlap: 200, // Increased overlap to maintain context
    });

    console.log("Splitting documents into chunks...");
    const splitDocs = await textSplitter.splitDocuments(documents);
    console.log(`Created ${splitDocs.length} document chunks`);
    
    console.log("Adding documents to vector store...");
    await vectorStore.addDocuments(splitDocs);
    console.log("Documents added successfully");
  } catch (error) {
    console.error("Error initializing vector store:", error);
    throw new Error(`Failed to initialize vector store: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

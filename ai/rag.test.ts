import "dotenv/config";
import axios from "axios";

// Load API keys from environment variables
const groqApiKey = process.env.GROQ_API_KEY;
const pineconeApiKey = process.env.PINECONE_API_KEY;
const cohereApiKey = process.env.COHERE_API_KEY;
const pineconeIndex = process.env.PINECONE_INDEX;
const pineconeEnv = process.env.PINECONE_ENVIRONMENT;

async function checkGroq() {
  try {
    console.log("🔍 Checking Groq API...");
    const response = await axios.post(
      "https://api.groq.com/openai/v1/completions",
      {
        model: "mixtral-8x7b-32768",
        prompt: "Hello, are you working?",
        max_tokens: 5,
      },
      {
        headers: { Authorization: `Bearer ${groqApiKey}`, "Content-Type": "application/json" },
      }
    );
    console.log("✅ Groq API is working:", response.data);
  } catch (error: unknown) {
    console.error("❌ API Error:", error instanceof Error ? error.message : JSON.stringify(error));
  }
}

async function checkPinecone() {
  try {
    console.log("🔍 Checking Pinecone API...");
    const response = await axios.get(`https://controller.${pineconeEnv}.pinecone.io/databases`, {
      headers: { "Api-Key": pineconeApiKey },
    });
    if (response.data?.databases?.includes(pineconeIndex)) {
      console.log("✅ Pinecone API is working:", response.data);
    } else {
      console.warn("⚠️ Pinecone API is running, but index not found.");
    }
  } catch (error: unknown) {
    console.error("❌ API Error:", error instanceof Error ? error.message : JSON.stringify(error));
  }
}

async function checkCohere() {
  try {
    console.log("🔍 Checking Cohere API...");
    const response = await axios.post(
      "https://api.cohere.ai/v1/tokenize",
      { text: "Hello, are you working?" },
      {
        headers: { Authorization: `Bearer ${cohereApiKey}`, "Content-Type": "application/json" },
      }
    );
    console.log("✅ Cohere API is working:", response.data);
  } catch (error: unknown) {
    console.error("❌ API Error:", error instanceof Error ? error.message : JSON.stringify(error));
  }
}

async function runChecks() {
  await checkGroq();
  await checkPinecone();
  await checkCohere();
}

runChecks();
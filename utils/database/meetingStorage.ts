import { MongoClient, WithId, Document, ServerApiVersion } from 'mongodb';

// Type definition for a meeting record
export type MeetingRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  meetingType: string;
  date: string;
  timeSlot: string;
  message?: string;
  createdAt: string;
  status: string;
  calendarEventId?: string;
};

// Create a MongoDB client
const getMongoClient = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  // Remove any quotes from the URI
  const cleanUri = process.env.MONGODB_URI.replace(/['"]/g, '');

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(cleanUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    return client;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB. Please check your connection string and network settings.');
  }
};

// Add a new meeting
export const addMeeting = async (meetingData: Omit<MeetingRecord, 'id' | 'createdAt'>): Promise<MeetingRecord> => {
  const client = await getMongoClient();
  
  try {
    const db = client.db('meetings');
    const meetings = db.collection<MeetingRecord>('meetings');
    
    const newMeeting: MeetingRecord = {
      ...meetingData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    
    const result = await meetings.insertOne(newMeeting);
    console.log('Meeting added successfully:', result.insertedId);
    return newMeeting;
  } catch (error) {
    console.error('Error adding meeting:', error);
    throw new Error('Failed to add meeting to database');
  } finally {
    await client.close();
  }
};

// Get all meetings
export const getAllMeetings = async (): Promise<MeetingRecord[]> => {
  const client = await getMongoClient();
  
  try {
    const db = client.db('meetings');
    const meetings = db.collection<MeetingRecord>('meetings');
    
    const meetingRecords = await meetings.find().toArray();
    return meetingRecords;
  } catch (error) {
    console.error('Error fetching meetings:', error);
    throw new Error('Failed to fetch meetings from database');
  } finally {
    await client.close();
  }
};

// Update a meeting
export const updateMeeting = async (id: string, updates: Partial<MeetingRecord>): Promise<MeetingRecord | null> => {
  const client = await getMongoClient();
  
  try {
    const db = client.db('meetings');
    const meetings = db.collection<MeetingRecord>('meetings');
    
    const meeting = await meetings.findOne({ id });
    
    if (!meeting) {
      return null;
    }
    
    const updatedMeeting = { ...meeting, ...updates };
    
    await meetings.updateOne({ id }, { $set: updatedMeeting });
    return updatedMeeting;
  } catch (error) {
    console.error('Error updating meeting:', error);
    throw new Error('Failed to update meeting in database');
  } finally {
    await client.close();
  }
};

// Get a meeting by ID
export const getMeetingById = async (id: string): Promise<MeetingRecord | null> => {
  const client = await getMongoClient();
  
  try {
    const db = client.db('meetings');
    const meetings = db.collection<MeetingRecord>('meetings');
    
    const meeting = await meetings.findOne({ id });
    return meeting as MeetingRecord | null;
  } catch (error) {
    console.error('Error fetching meeting by ID:', error);
    throw new Error('Failed to fetch meeting from database');
  } finally {
    await client.close();
  }
};

// Delete a meeting
export const deleteMeeting = async (id: string): Promise<boolean> => {
  const client = await getMongoClient();
  
  try {
    const db = client.db('meetings');
    const meetings = db.collection<MeetingRecord>('meetings');
    
    const result = await meetings.deleteOne({ id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Failed to delete meeting from database');
  } finally {
    await client.close();
  }
}; 
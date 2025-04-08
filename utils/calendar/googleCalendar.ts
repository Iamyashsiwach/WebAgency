import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Type for meeting data
type MeetingData = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  meetingType: string;
  date: string;
  timeSlot: string;
  message?: string;
};

// Initialize the OAuth2 client with credentials
const getOAuth2Client = (): OAuth2Client => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
    throw new Error('Missing Google OAuth credentials');
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });

  return oauth2Client;
};

/**
 * Convert time slot string (e.g., "9:00 AM") to hours and minutes
 */
const parseTimeSlot = (timeSlot: string): { hours: number; minutes: number } => {
  const [time, period] = timeSlot.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (period === 'PM' && hours < 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};

/**
 * Add an event to Google Calendar
 */
export const addToCalendar = async (meetingData: MeetingData): Promise<{ success: boolean; eventId?: string; error?: any }> => {
  try {
    const { name, email, phone, company, meetingType, date, timeSlot, message } = meetingData;
    
    // Get OAuth2 client
    const oauth2Client = getOAuth2Client();
    
    // Create Google Calendar instance
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    // Parse date and time
    const { hours, minutes } = parseTimeSlot(timeSlot);
    
    // Create start date
    const startDate = new Date(date);
    startDate.setHours(hours, minutes, 0, 0);
    
    // Create end date (1 hour after start)
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);
    
    // Create event description
    const description = `
Meeting Type: ${meetingType}
Client: ${name}
Email: ${email}
Phone: ${phone}
${company ? `Company: ${company}` : ''}
${message ? `\nAdditional Notes:\n${message}` : ''}
    `.trim();
    
    // Create event
    const event = {
      summary: `${meetingType} with ${name}${company ? ` from ${company}` : ''}`,
      description,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: 'UTC', // Change to your timezone
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'UTC', // Change to your timezone
      },
      attendees: [
        { email }, // Client email
        { email: process.env.TEAM_EMAIL || 'team@webagency.com' }, // Your team email
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 30 }, // 30 minutes before
        ],
      },
    };
    
    // Add event to calendar
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });
    
    console.log('Event created:', response.data.htmlLink);
    return { success: true, eventId: response.data.id || undefined };
  } catch (error) {
    console.error('Error adding event to calendar:', error);
    return { success: false, error };
  }
}; 
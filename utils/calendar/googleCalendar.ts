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
  try {
    console.log('Parsing time slot:', timeSlot);
    const [time, period] = timeSlot.split(' ');
    if (!time || !period) {
      console.error('Invalid time format - missing time or period');
      throw new Error('Invalid time format');
    }

    console.log('Time parts:', { time, period });
    let [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      console.error('Invalid time values:', { hours, minutes });
      throw new Error('Invalid time values');
    }

    console.log('Parsed time:', { hours, minutes, period });
    if (period === 'PM' && hours < 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      console.error('Time values out of range:', { hours, minutes });
      throw new Error('Time values out of range');
    }

    console.log('Final parsed time:', { hours, minutes });
    return { hours, minutes };
  } catch (error) {
    console.error('Error parsing time slot:', {
      timeSlot,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw new Error(`Invalid time format: ${timeSlot}`);
  }
};

/**
 * Add an event to Google Calendar
 */
export const addToCalendar = async (meetingData: MeetingData): Promise<{ success: boolean; eventId?: string; error?: any }> => {
  try {
    console.log('Adding event to calendar with data:', JSON.stringify(meetingData, null, 2));
    const { name, email, phone, company, meetingType, date, timeSlot, message } = meetingData;
    
    if (!date || !timeSlot) {
      console.error('Missing required fields:', { date, timeSlot });
      throw new Error('Date and time slot are required');
    }

    // Validate date format
    console.log('Validating date:', date);
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date format:', date);
      throw new Error('Invalid date format');
    }
    
    // Get OAuth2 client
    console.log('Getting OAuth2 client...');
    const oauth2Client = getOAuth2Client();
    
    // Create Google Calendar instance
    console.log('Creating Google Calendar instance...');
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    // Parse date and time
    console.log('Parsing time slot:', timeSlot);
    const { hours, minutes } = parseTimeSlot(timeSlot);
    
    // Create start date
    console.log('Creating start date with:', { date, hours, minutes });
    const startDate = new Date(date);
    startDate.setHours(hours, minutes, 0, 0);
    
    // Validate that the date is not in the past
    const now = new Date();
    console.log('Validating date is not in past:', { startDate, now });
    if (startDate < now) {
      console.error('Date is in the past:', { startDate, now });
      throw new Error('Cannot schedule meetings in the past');
    }
    
    // Create end date (1 hour after start)
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);
    console.log('Created date range:', { startDate, endDate });
    
    // Create event
    const event = {
      summary: `${meetingType} with ${name}${company ? ` from ${company}` : ''}`,
      description: `
Meeting Type: ${meetingType}
Client: ${name}
Email: ${email}
Phone: ${phone}
${company ? `Company: ${company}` : ''}
${message ? `\nAdditional Notes:\n${message}` : ''}
      `.trim(),
      start: {
        dateTime: startDate.toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'UTC',
      },
      attendees: [
        { email },
        { email: process.env.TEAM_EMAIL || 'team@goonline.site' },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };
    
    console.log('Attempting to create calendar event:', JSON.stringify(event, null, 2));
    
    // Add event to calendar
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });
    
    console.log('Event created successfully:', response.data.htmlLink);
    return { success: true, eventId: response.data.id || undefined };
  } catch (error) {
    console.error('Error adding event to calendar:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      type: error instanceof Error ? error.constructor.name : typeof error
    });
    return { success: false, error };
  }
}; 
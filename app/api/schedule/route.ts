import { NextResponse } from 'next/server';
import { sendEmail, generateClientEmail, generateTeamEmail } from '@/utils/email/sendEmail';
import { addToCalendar } from '@/utils/calendar/googleCalendar';
import { addMeeting } from '@/utils/database/meetingStorage';

export async function POST(request: Request) {
  let meetingRecord;
  
  try {
    const data = await request.json();
    console.log('Received meeting data:', JSON.stringify(data, null, 2));
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'meetingType', 'date', 'timeSlot'];
    for (const field of requiredFields) {
      if (!data[field]) {
        console.log(`Missing required field: ${field}`);
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Step 1: Store in database
    try {
      console.log('Attempting to store meeting in database with data:', JSON.stringify(data, null, 2));
      meetingRecord = await addMeeting({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        meetingType: data.meetingType,
        date: data.date,
        timeSlot: data.timeSlot,
        message: data.message,
        status: 'scheduled'
      });
      console.log('Meeting stored successfully:', JSON.stringify(meetingRecord, null, 2));
    } catch (error) {
      const dbError = error as Error;
      console.error('Database error details:', {
        message: dbError.message,
        stack: dbError.stack
      });
      throw new Error(`Database error: ${dbError.message}`);
    }
    
    // Step 2: Add to Google Calendar
    try {
      console.log('Attempting to add to Google Calendar with data:', JSON.stringify(data, null, 2));
      const calendarResult = await addToCalendar(data);
      console.log('Calendar result:', JSON.stringify(calendarResult, null, 2));
      if (!calendarResult.success) {
        console.error('Calendar error details:', calendarResult.error);
        throw new Error(`Calendar error: ${calendarResult.error?.message || 'Unknown error'}`);
      }
    } catch (error) {
      const calendarError = error as Error;
      console.error('Calendar error details:', {
        message: calendarError.message,
        stack: calendarError.stack
      });
      throw new Error(`Calendar error: ${calendarError.message}`);
    }
    
    // Step 3: Send emails
    try {
      console.log('Attempting to send confirmation emails');
      await sendEmail({
        to: data.email,
        subject: 'Your Meeting with Web Agency is Confirmed',
        html: generateClientEmail(data),
      });
      
      await sendEmail({
        to: process.env.TEAM_EMAIL || 'team@goonline.site',
        subject: `New Meeting: ${data.meetingType} with ${data.name}`,
        html: generateTeamEmail(data),
      });
      console.log('Emails sent successfully');
    } catch (error) {
      const emailError = error as Error;
      console.error('Email error details:', {
        message: emailError.message,
        stack: emailError.stack
      });
      throw new Error(`Email error: ${emailError.message}`);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Meeting scheduled successfully',
      meetingId: meetingRecord.id,
      calendarEventCreated: true
    });
  } catch (error) {
    const err = error as Error;
    console.error('Detailed error in schedule route:', {
      message: err.message,
      stack: err.stack,
      type: err.constructor.name
    });
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to schedule meeting',
        error: err.message,
        details: err.stack
      }, 
      { status: 500 }
    );
  }
} 
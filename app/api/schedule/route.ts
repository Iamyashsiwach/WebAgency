import { NextResponse } from 'next/server';
import { sendEmail, generateClientEmail, generateTeamEmail } from '@/utils/email/sendEmail';
import { addToCalendar } from '@/utils/calendar/googleCalendar';
import { addMeeting } from '@/utils/database/meetingStorage';

export async function POST(request: Request) {
  let meetingRecord;
  
  try {
    const data = await request.json();
    console.log('Received data:', data);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'meetingType', 'date', 'timeSlot'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Step 1: Store in database
    try {
      console.log('Attempting to store meeting in database...');
      meetingRecord = await addMeeting({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        meetingType: data.meetingType,
        date: data.date,
        timeSlot: data.timeSlot,
        message: data.message,
        status: 'scheduled' // Add the required status field
      });
      console.log('Meeting stored successfully:', meetingRecord);
    } catch (error) {
      const dbError = error as Error;
      console.error('Database error:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }
    
    // Step 2: Add to Google Calendar
    try {
      console.log('Attempting to add to Google Calendar...');
      const calendarResult = await addToCalendar(data);
      console.log('Calendar result:', calendarResult);
      if (!calendarResult.success) {
        throw new Error(`Calendar error: ${calendarResult.error?.message || 'Unknown error'}`);
      }
    } catch (error) {
      const calendarError = error as Error;
      console.error('Calendar error:', calendarError);
      throw new Error(`Calendar error: ${calendarError.message}`);
    }
    
    // Step 3: Send emails
    try {
      console.log('Attempting to send emails...');
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
      console.error('Email error:', emailError);
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
    console.error('Detailed error in schedule route:', err);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to schedule meeting',
        error: err.message 
      }, 
      { status: 500 }
    );
  }
} 
import Mailjet from 'node-mailjet';

type EmailData = {
  to: string;
  subject: string;
  html: string;
};

// Initialize Mailjet client
const getMailjetClient = () => {
  const apiKey = process.env.MAILJET_API_KEY;
  const secretKey = process.env.MAILJET_SECRET_KEY;
  
  if (!apiKey || !secretKey) {
    throw new Error('Mailjet API keys are not configured');
  }
  
  return new Mailjet({
    apiKey,
    apiSecret: secretKey,
  });
};

export const sendEmail = async ({ to, subject, html }: EmailData) => {
  try {
    const mailjet = getMailjetClient();
    
    const response = await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.EMAIL_FROM || 'noreply@webagency.com',
              Name: 'Web Agency',
            },
            To: [
              {
                Email: to,
              },
            ],
            Subject: subject,
            HTMLPart: html,
          },
        ],
      } as any); // Add type assertion to avoid TypeScript error
    
    console.log('Email sent successfully');
    return { success: true, messageId: response.body.Messages[0].To[0].MessageID };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

export const generateClientEmail = (data: any) => {
  const { name, meetingType, date, timeSlot } = data;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h2 style="color: #333; text-align: center;">Meeting Confirmation</h2>
      <p>Hello ${name},</p>
      <p>Thank you for scheduling a ${meetingType} with Web Agency. We're looking forward to speaking with you!</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #555;">Meeting Details:</h3>
        <p><strong>Type:</strong> ${meetingType}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${timeSlot}</p>
      </div>
      
      <p>If you need to reschedule or have any questions before our meeting, please reply to this email or contact us at contact@webagency.com.</p>
      
      <p>Best regards,<br>The Web Agency Team</p>
    </div>
  `;
};

export const generateTeamEmail = (data: any) => {
  const { name, email, phone, company, meetingType, date, timeSlot, message } = data;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h2 style="color: #333; text-align: center;">New Meeting Scheduled</h2>
      <p>A new meeting has been scheduled:</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #555;">Meeting Details:</h3>
        <p><strong>Type:</strong> ${meetingType}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${timeSlot}</p>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #555;">Client Information:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${message ? `
          <h4 style="margin-bottom: 5px;">Additional Message:</h4>
          <p style="margin-top: 0;">${message}</p>
        ` : ''}
      </div>
      
      <p>Please prepare for this meeting and add it to your calendar.</p>
    </div>
  `;
}; 
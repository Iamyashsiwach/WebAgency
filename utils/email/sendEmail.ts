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
              Email: process.env.EMAIL_FROM || 'iamyashsiwach@gmail.com',
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
  const { name, email, phone, company, meetingType, date, timeSlot, message } = data;
  
  // Convert date to a more readable format (e.g., Monday, January 1, 2023)
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Base URL for the app
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://goonline.site';
  
  // Google Calendar link (simplified version - ideally would include the actual event details)
  const calendarLink = `https://calendar.google.com/calendar`;
  
  // Logo URL - update with your actual logo URL
  const logoUrl = `${baseUrl}/icon.png`;
  
  const teamImageUrl = `${baseUrl}/boy.png`;
  
  console.log('Base URL:', baseUrl);
  console.log('Team Image URL:', teamImageUrl);
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Meeting Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #4b575e;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          background-color: #7c7c7c;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .logo {
          width: 100px;
          height: auto;
          background-color: #000;
          padding: 10px;
        }
        .content {
          padding: 30px 20px;
          background-color: #ffffff;
        }
        .meeting-confirmed {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
          color: #4b575e;
        }
        .meeting-message {
          margin-bottom: 30px;
          text-align: center;
        }
        .btn {
          display: inline-block;
          background-color: #393939;
          color: #ffffff !important;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 50px;
          font-weight: bold;
          margin: 15px 0;
        }
        .footer {
          background-color: #7c7c7c;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .connect-section {
          margin: 30px 0;
          text-align: center;
        }
        .connect-image {
          display: inline-block;
          margin-bottom: 20px;
        }
        .connect-text {
          display: inline-block;
          max-width: 80%;
          margin: 0 auto;
        }
        .social-icons {
          margin: 20px 0;
        }
        .social-icon {
          display: inline-block;
          width: 30px;
          height: 30px;
          background-color: #444444;
          border-radius: 50%;
          margin: 0 5px;
          text-align: center;
          line-height: 30px;
        }
        .meeting-details {
          background-color: #bcbcbc;
          padding: 20px;
          border-radius: 5px;
          margin: 20px 0;
          color: #4b575e;
        }
        .meeting-detail-item {
          margin-bottom: 10px;
        }
        @media screen and (max-width: 600px) {
          .connect-image, .connect-text {
            padding: 0;
            text-align: center;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <div>Meeting Confirmation | <a href="${baseUrl}" style="color: white; text-decoration: underline;">View in your browser</a></div>
          <div style="margin-top: 15px;">
            <img src="${logoUrl}" alt="Web Agency Logo" class="logo">
          </div>
        </div>
        
        <div class="content">
          <div class="meeting-confirmed">Your Meeting is Confirmed</div>
          
          <div class="meeting-message">
            We are pleased to confirm that the meeting you have scheduled has been successfully arranged. You can now check your Google Calendar for the meeting details. Thank you for reaching out to us. See you soon!
          </div>
          
          <div class="meeting-details">
            <div class="meeting-detail-item"><strong>Name:</strong> ${name}</div>
            <div class="meeting-detail-item"><strong>Email:</strong> ${email}</div>
            <div class="meeting-detail-item"><strong>Phone:</strong> ${phone}</div>
            ${company ? `<div class="meeting-detail-item"><strong>Company:</strong> ${company}</div>` : ''}
            <div class="meeting-detail-item"><strong>Meeting Type:</strong> ${meetingType}</div>
            <div class="meeting-detail-item"><strong>Date:</strong> ${formattedDate}</div>
            <div class="meeting-detail-item"><strong>Time:</strong> ${timeSlot}</div>
            ${message ? `<div class="meeting-detail-item"><strong>Message:</strong> ${message}</div>` : ''}
          </div>
          
          <div style="text-align: center;">
            <a href="${calendarLink}" class="btn">Check Calendar</a>
          </div>
          
          <div class="connect-section">
            <div class="connect-image">
                  <img src="${teamImageUrl}" alt="Team Member" style="max-width: 200px; border-radius: 5px; display: block; margin: 0 auto;">
            </div>
            <div class="connect-text">
              <h3>Stay Connected</h3>
              <p>Your trusted partner for innovative tech solutions — tailored for every need.</p>
              <a href="${baseUrl}/chatbot" class="btn" style="padding: 8px 16px; font-size: 14px;">Learn More</a>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <div class="social-icons">
            <a href="https://linkedin.com/yash-siwach" class="social-icon" style="color: white; text-decoration: none;">in</a>
            <a href="https://twitter.com/iamyashsiwach" class="social-icon" style="color: white; text-decoration: none;">X</a>
          </div>
          <div>
            This e-mail has been sent to [[EMAIL_TO]], <a href="#" style="color: white;">click here to unsubscribe</a>.
          </div>
        </div>
      </div>
    </body>
    </html>
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
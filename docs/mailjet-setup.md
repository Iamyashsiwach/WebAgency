# Setting Up Mailjet for Email Notifications

This guide will walk you through the process of setting up Mailjet for your meeting scheduling system's email notifications.

## Step 1: Create a Mailjet Account

1. Go to [Mailjet's website](https://www.mailjet.com/) and sign up for a free account
2. The free plan includes 200 emails per day, which should be sufficient for most small to medium-sized agencies

## Step 2: Verify Your Domain (Optional but Recommended)

1. In your Mailjet dashboard, go to "Senders & Domains"
2. Click on "Add a domain"
3. Follow the steps to verify your domain ownership
4. This improves email deliverability and reduces the chance of emails going to spam

## Step 3: Get Your API Keys

1. In your Mailjet dashboard, go to "Account Settings" 
2. Click on "REST API" in the left menu
3. You'll see your "API Key" and "Secret Key" displayed
4. Copy both of these keys

## Step 4: Configure Your Environment Variables

1. Open your project's `.env.local` file
2. Add the following lines, replacing the placeholders with your actual keys:

```
MAILJET_API_KEY=your-api-key-here
MAILJET_SECRET_KEY=your-secret-key-here
EMAIL_FROM=your-verified-sender-email@example.com
TEAM_EMAIL=your-team-email@example.com
```

## Step 5: Test the Integration

1. Start your development server
2. Fill out and submit the meeting scheduling form
3. Check both the client email address and your team email to verify that notifications are being sent

## Troubleshooting

If emails aren't being sent:

1. Check your Mailjet dashboard for any error messages
2. Verify that your API keys are correctly entered in `.env.local`
3. Make sure your sender email is verified in Mailjet
4. Check your application logs for any error messages

## Production Considerations

For production deployment:

1. Set up a dedicated transactional sending domain
2. Create email templates in Mailjet for consistent branding
3. Set up dedicated SMTP relays for improved deliverability
4. Monitor your email sending statistics in the Mailjet dashboard 
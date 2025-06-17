import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 },
    );
  }

  const transporter = nodemailer.createTransport({
    // You'll need to configure your email provider here.
    // This is an example using Ethereal for testing.
    host: process.env.EMAIL_HOST || "smtp.ethereal.email",
    port: parseInt(process.env.EMAIL_PORT || "587", 10),
    secure: (process.env.EMAIL_SECURE || "false") === "true", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.CONTACT_EMAIL, // The email address you want to receive messages at
    subject: `New message from ${name} via your website`,
    text: message,
    html: `<p>You have a new message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return NextResponse.json(
      { success: true, message: "Your message has been sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "There was an error sending your message." },
      { status: 500 },
    );
  }
} 
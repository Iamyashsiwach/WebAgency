# 🚀 [ Agency ] - Web Development, SEO & Digital Solutions

Welcome to **[ Agency ]**, your trusted partner in **web development, UI/UX design, SEO, and digital marketing**. We specialize in crafting modern, high-performing websites and applications that drive business success and improve search engine rankings.

---

## 🔹 About Us

At **[ Agency ]**, we believe in creating digital experiences that captivate, convert, and inspire. Whether you're a startup, small business, or enterprise, we tailor our solutions to meet your unique needs and enhance your online visibility.

---

## 🌟 Services We Offer

✅ **Web Development** – Responsive, scalable, and fast websites built with modern technologies.  
✅ **UI/UX Design** – Intuitive and user-friendly interfaces that enhance customer engagement.  
✅ **E-commerce Solutions** – Secure and high-performing online stores.  
✅ **SEO (Search Engine Optimization)** – Advanced strategies to improve your Google ranking.  
✅ **Content Marketing** – High-quality content to attract and retain customers.  
✅ **Pay-Per-Click (PPC) Advertising** – Targeted campaigns for higher conversions.  
✅ **Social Media Marketing** – Boost brand awareness and engagement on platforms like Facebook, Instagram, and LinkedIn.  
✅ **Branding & Graphic Design** – Elevating your brand with creative visuals.  
✅ **Custom Web Apps** – Tailor-made solutions for your business needs.

---

## 🚀 Technologies We Use

We leverage the latest technologies to build robust and scalable web solutions:

- **Frontend:** React, Next.js, Vue.js, Tailwind CSS
- **Backend:** Node.js, Express.js, Laravel, Django
- **CMS & E-commerce:** WordPress, Shopify, Webflow
- **SEO & Analytics:** Google Analytics, Ahrefs, SEMrush, Moz
- **Databases:** MongoDB, PostgreSQL, Firebase
- **Cloud & DevOps:** AWS, Vercel, Docker

---

## 📂 Project Structure

```
your-project/
│
├── app/
│   ├── sections/
│   │   ├── cards.tsx
│   │   ├── footer.tsx
│   │   ├── Hero.tsx
│   │   ├── intro.tsx
│   │   ├── cta.tsx
│   │   └── ... (other section files)
│   ├── page.tsx
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   │   ├── Navbar/
│   │   │   └── Navbar.tsx
│   │   ├── DisplacementSphere/
│   │   │   └── DisplacementSphere.tsx
│   │   ├── focus-cards.tsx
│   │   ├── hero-parallax.tsx
│   │   ├── sparkles.tsx
│   │   ├── text-generate-effect.tsx
│   │   ├── cover.tsx
│   │   ├── wobble-card.tsx
│   │   └── ... (other UI components)
│   └── wrapper/
│       ├── GridBackgroudLayout/
│       │   └── GridBackgroudLayout.tsx
│       ├── MainComponent/
│       │   └── MainComponent.tsx
│       └── ErrorBoundary/
│           └── ErrorBoundary.tsx
│
├── styles/
│   ├── globals.css
│   └── components/
│       └── Error/
│           └── styles.module.css
│
├── next.config.js
├── tailwind.config.ts
└── README.md
```

---

## 🔧 How to Get Started

1. Clone the repository:
   ```bash
   git clone https://github.com/iamyashsiwach/webagency.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

live at https://webagency-alpha.vercel.app

## 📩 Get in Touch

📧 Email: [iamyashsiwach@gmail.com](mailto:iamyashsiwach@gmail.com)  
🌍 Website: [yashsiwach.space](https://yashsiwach.space)

Let's build something amazing together! 🚀

## Meeting Scheduling System

The website includes a meeting scheduling system that allows clients to book appointments with your team. 

### Email Configuration with Mailjet

To set up email notifications for meeting bookings:

1. Create a free account at [Mailjet](https://www.mailjet.com/)
2. Get your API Key and Secret Key from the Mailjet dashboard
3. Add these keys to your `.env.local` file:

```
MAILJET_API_KEY=your-api-key-here
MAILJET_SECRET_KEY=your-secret-key-here
EMAIL_FROM=your-sender-email@example.com
TEAM_EMAIL=your-team-email@example.com
```

### Google Calendar Integration (Optional)

For Google Calendar integration:

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Google Calendar API
3. Create OAuth 2.0 credentials
4. Get a refresh token using OAuth Playground
5. Add the credentials to your `.env.local` file:

```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token
```

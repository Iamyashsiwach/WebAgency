# Codebase Overview

This document provides a high-level overview of the `agency-next` codebase.

## Project Description

This is a Next.js web application for a web agency. It includes a variety of modern features, including a chatbot, voice calls, and a scheduling system. It also appears to make heavy use of AI and Large Language Models (LLMs).

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **UI Libraries**:
    *   [NextUI](https://nextui.org/)
    *   [Radix UI](https://www.radix-ui.com/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [Framer Motion](https://www.framer.com/motion/)
    *   [Three.js](https://threejs.org/) for 3D graphics
    *   [tsparticles](https://particles.js.org/) for particle effects
*   **AI/ML**:
    *   [LangChain](https://www.langchain.com/) for building applications with LLMs
    *   LLM providers: [OpenAI](https://openai.com/), [Groq](https://groq.com/), [Cohere](https://cohere.ai/)
    *   Vector Database: [Pinecone](https://www.pinecone.io/) for Retrieval-Augmented Generation (RAG)
*   **Databases**:
    *   [Pinecone](https://www.pinecone.io/) (Vector)
    *   [MongoDB](https://www.mongodb.com/)
*   **Communication**:
    *   [Daily.co](https://www.daily.co/) for voice/video calls
    *   [Nodemailer](https://nodemailer.com/) and [Mailjet](https://www.mailjet.com/) for sending emails
*   **Tooling**:
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [ESLint](https://eslint.org/) for linting
    *   [Prettier](https://prettier.io/) for code formatting
    *   [Storybook](https://storybook.js.org/) for component development and testing
*   **Deployment**: [Vercel](https://vercel.com/)

## Project Structure

*   `app/`: The core of the Next.js application, using the App Router.
    *   `api/`: API routes.
    *   `chatbot/`: The chatbot feature.
    *   `Schedule/`: The scheduling feature.
    *   `voice-call/`: The voice call feature.
    *   `sections/`: Likely contains components that are part of a larger page.
*   `components/`: Reusable React components.
    *   `ui/`: Basic UI components.
    *   `Chatbot/`: Components specific to the chatbot.
    *   `magicui/`: Custom, more complex UI components.
*   `hooks/`: Custom React hooks.
*   `libs/`: Third-party libraries and utilities.
*   `ai/`: Code related to AI/ML features, including LangChain and RAG.
*   `public/`: Static assets.
*   `stories/`: Storybook stories.

## Key Features

*   **Chatbot**: An AI-powered chatbot, likely using RAG to answer questions.
*   **Voice Calls**: Real-time voice communication.
*   **Scheduling**: A system for scheduling appointments or meetings.
*   **Interactive UI**: The use of Three.js and Framer Motion suggests a highly interactive and animated user interface.

This overview should provide a good starting point for understanding the codebase. 
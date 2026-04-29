WebNix: AI-Powered SaaS Webinar Platform

WebNix is a disruptive SaaS platform designed for marketers and business owners to revolutionize webinars by deploying an "army of sales reps that never sleep".
It automates the sales process by integrating human-like voice AI agents directly into the webinar experience to qualify and close leads in real-time.

🚩 Problem Statement

Marketers and high-ticket service providers often struggle with a lack of automation and low-quality leads affecting their day-to-day operations.

Traditional webinars are passive; once the presentation ends, the host physically cannot handle hundreds or thousands of one-on-one qualification calls required to close high-ticket sales.

This creates a bottleneck where potential customers are lost due to:

Lack of immediate engagement
Inability to scale manual sales qualification

✅ Our Solution

Webnix provides a seamless infrastructure where AI sales agents handle the "heavy lifting" of sales during and after a webinar.

The platform allows hosts to:

🔹 Deploy AI Sales Reps

Human-like voice AI agents (powered by Vapi AI) can:

Speak to customers
Book meetings
Close leads on one-on-one calls

🔹 Automated Breakout Rooms
Redirect attendees from live stream into private rooms
AI agents filter leads, encourage sales, and push them through the pipeline

🔹 High-Conversion CTAs
"Buy Now" → Immediate product sales via Stripe
"Book a Call" → AI-led qualification sessions

🔹 Production-Grade Streaming
Integration with OBS and Stream (GetStream.io)
Scalable, high-quality broadcasting for thousands of viewers

📸 Screenshots

1. The Main Dashboard & Pipeline

Managing leads through various stages from registration to purchase.


2. Live Webinar Room

Production-grade streaming with integrated real-time chat.


3. AI Agent Configuration

Tweak the system prompt and first messages for your custom sales agent.

![alt text](image.png)


4. High-Ticket Breakout Room

Real-time voice interaction with an AI setter.
![alt text](image2.png)


🛠️ Tech Stack
Framework: Next.js 15 (App Router)
Authentication: Clerk (User management & Auth)
Database: Neon (Serverless PostgreSQL) with Prisma ORM
AI Voice Technology: Vapi AI (Real-time conversational agents)
Streaming & Chat: Stream (GetStream.io SDKs)
Payments: Stripe Connect & Checkout (Hard paywall & product processing)
State Management: Zustand
Animations: Framer Motion
Styling: Tailwind CSS & Shadcn UI
Deployment: Docker, Coolify, and Hostinger VPS
🚀 Core Features
🔐 Hard Paywall Monetization

Users must have an active Stripe subscription to create and host webinars, ensuring a high-value user base.

📊 Dynamic Lead Pipelines

Automatically track:

Registration
Attendance
Add to cart
Call completion
🎥 OBS Integration

Hosts can grab RTMP credentials to stream directly from professional broadcasting software.

⚡ Real-time Event Handling

Fire custom events through chat channels to:

Open CTAs
Trigger modals for all participants simultaneously
🤖 Custom AI Prompting

Provide specific sales prompts to your agents to achieve high close rates.
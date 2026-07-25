# CivicAI - Citizen Grievance Management Platform

CivicAI is an AI-powered national citizen grievance management platform where citizens report municipal issues and government officials resolve them through an AI-assisted smart triage, auto-routing, and verification workflow.

## Features

- **Multi-Role Access Control (RBAC)**:
  - **Citizen**: File grievances with photos, GPS tags, and voice notes. Track real-time resolution timelines, chat with CivicBot, and rate official resolutions (1-5 stars).
  - **Government Official**: Review AI-triaged tickets, accept/reject complaints, assign field staff squads, and upload photo proof of completed works with AI vision checks.
  - **Administrator**: City-wide analytics dashboard, official account verification, department SLA management, duplicate cluster inspector, and immutable audit logs.
- **AI Smart Triage & Workflow**:
  - **Automated Classification & Routing**: Powered by Gemini 3.6 Flash.
  - **Priority & Urgency Scoring**: Calculates 0-100 urgency score with expedited 12-hour SLA for public safety risks.
  - **Duplicate Detection**: Proximity & semantic matching to merge duplicate complaints.
  - **Multilingual Support**: Real-time translation between English, Telugu, and Hindi.
  - **Multimodal Image Verification**: Verifies completion photos against reported defects.
  - **CivicBot AI Assistant**: Interactive assistant for ticket lookup, SLA queries, and guidance.
- **Interactive Maps**: GPS location selector with interactive issue markers and satellite view toggle.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons.
- **Backend**: Express.js + Vite Dev Server, TypeScript (`tsx` / `esbuild`).
- **AI Engine**: `@google/genai` (Gemini 3.6 Flash & Multimodal Vision).
- **Database**: In-memory persistent store with PostgreSQL export schema (`schema.sql`).

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables in .env
GEMINI_API_KEY="your-gemini-api-key"

# 3. Start development server
npm run dev
```

App will run on `http://localhost:3000`.

---

## Production Deployment Guide

### Frontend → Vercel
1. Push repository to GitHub.
2. Import project into Vercel.
3. Build command: `npm run build`.

### Backend → Railway
1. Create a new service on Railway connected to your repository.
2. Set Environment Variables: `GEMINI_API_KEY`.
3. Railway will execute `Dockerfile` automatically.

### Database → Supabase PostgreSQL
1. Create a Supabase PostgreSQL instance.
2. Run `schema.sql` in the Supabase SQL Editor.

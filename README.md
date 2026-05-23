# Vexa — Premium AI Automation Agency Website

A full-stack web application for an AI automation agency targeting Indian MSMEs.

## Tech Stack

**Frontend:** React + Vite + TypeScript + Tailwind CSS + Framer Motion + Three.js  
**Backend:** Node.js + Express.js + MongoDB + JWT Auth

## Project Structure

```
project/
├── frontend/              # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/     # ProtectedRoute
│   │   │   ├── hooks/     # useInView
│   │   │   ├── layout/    # Navbar, Footer, Layout
│   │   │   ├── sections/  # Hero, Services, WhyUs, Process, Testimonials, CTA
│   │   │   └── ui/        # HeroScene (3D), SectionWrapper
│   │   ├── lib/           # axios instance
│   │   ├── pages/         # Home, Services, About, Contact, AdminLogin, AdminDashboard
│   │   └── types/         # TypeScript interfaces
│   └── ...
└── backend/               # Node.js + Express
    └── src/
        ├── config/        # MongoDB connection
        ├── middleware/     # JWT auth
        ├── models/        # Inquiry schema
        └── routes/        # contact, auth, inquiries
```

## Quick Start

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and change secrets
npm install
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Environment Variables (Backend)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nexbotai
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@nexbotai.com
ADMIN_PASSWORD=Admin@NexBot2024
```

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/contact | ❌ | Submit contact form |
| POST | /api/auth/login | ❌ | Admin login |
| GET | /api/inquiries | ✅ JWT | Get all inquiries + stats |
| DELETE | /api/inquiries/:id | ✅ JWT | Delete inquiry |
| GET | /api/health | ❌ | Health check |

## Admin Access

- URL: `/admin/login`
- Default: `admin@nexbotai.com` / `Admin@NexBot2024`
- **Change in `.env` before deployment!**

## Pages

- `/` — Home (Hero, Services, Why Us, Process, Testimonials, CTA)
- `/services` — Detailed service listings with pricing
- `/about` — Company story, team, stats
- `/contact` — Contact form + WhatsApp link
- `/admin/login` — Admin login (hidden)
- `/admin/dashboard` — Protected admin panel

## Production Deployment

1. Build frontend: `cd frontend && npm run build`
2. Serve `frontend/dist` via nginx or Vercel
3. Deploy backend to Railway, Render, or VPS
4. Set production env vars
5. Update CORS origin in `backend/src/index.js`

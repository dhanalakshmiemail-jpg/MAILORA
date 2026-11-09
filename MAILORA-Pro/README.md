# MAILORA — Intelligent Email Campaign Platform

A full-stack MERN campaign operations platform with a premium SaaS interface. This is an advanced starter implementation, not a single-page beginner mail form.

## Architecture
- **Frontend:** React, Vite, strict TypeScript, Material UI, Redux Toolkit, React Router, React Hook Form, Yup, Recharts, native Fetch
- **Backend:** Node.js, Express, TypeScript, Mongoose, JWT authentication, Nodemailer
- **Database:** MongoDB
- **Security:** password hashing, JWT-protected routes, role checks, Helmet, CORS, rate limiting, request validation
- **Email:** SMTP transport, per-recipient result tracking, retries, campaign drafts, scheduled campaign processing

## Included modules
1. Overview dashboard with KPI cards, delivery chart, recent campaigns and quick actions
2. Campaign studio with rich-text editor, templates, recipient selection, personalization, preview, draft/save/send
3. Contacts with search, filtering, groups, create/edit/delete and CSV import/export
4. Campaign history and recipient-level delivery statuses
5. Analytics with campaign performance comparisons
6. Templates library
7. Team roles (admin / manager) and protected routes
8. Profile/settings and theme toggle
9. Activity log and retry-failed-recipient endpoint

## Prerequisites
- Node.js 20+
- npm 10+
- MongoDB local service or MongoDB Atlas connection
- SMTP account (Gmail app password, Brevo SMTP, Mailtrap, etc.)

## 1. Extract and open
Extract `MAILORA-Pro.zip`, open the **MAILORA-Pro** folder in VS Code.

## 2. Backend setup
Open a terminal in VS Code:

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` and set `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, and SMTP values.

Create the first admin user:

```bash
npm run seed:admin
```

Start the API:

```bash
npm run dev
```

API runs at `http://localhost:5000`; health check: `http://localhost:5000/api/health`.

## 3. Frontend setup
Open a **second terminal**:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

## Demo admin
The seed script reads `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` from `backend/.env`. Change the password before using the app.

## SMTP setup
For Gmail, enable 2-Step Verification and create an App Password. Use:
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `SMTP_USER=your-email@gmail.com`
- `SMTP_PASS=your-16-character-app-password`
- `MAIL_FROM="MAILORA <your-email@gmail.com>"`

Never commit `.env`. Do not use your normal Gmail password.

## Important delivery note
SMTP providers may impose daily/hourly sending limits. Start with a small test list, use opted-in contacts only, and configure SPF, DKIM and DMARC for a production sending domain. Provider acceptance is not proof of inbox delivery; true delivery/bounce events require provider webhooks, which are prepared as an extension point but are not falsely simulated here.

## Scripts
Backend: `npm run dev`, `npm run build`, `npm start`, `npm run seed:admin`
Frontend: `npm run dev`, `npm run build`, `npm run preview`, `npm run test`

## Project structure
```text
MAILORA-Pro/
├── frontend/
│   ├── src/app/             # Redux store, routing, API client
│   ├── src/components/      # Reusable navigation, layout, UI
│   ├── src/features/        # Auth, campaigns, contacts, analytics
│   ├── src/pages/           # Product screens
│   ├── src/theme/           # MUI theme
│   └── src/styles/          # Global styles
└── backend/
    └── src/
        ├── config/
        ├── middleware/
        ├── models/
        ├── routes/
        ├── services/
        ├── utils/
        └── scripts/
```

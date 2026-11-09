
# MAILORA – Intelligent Email Campaign Platform

### Create. Connect. Campaign. Grow.

MAILORA is a full-stack email campaign management platform designed to simplify bulk email communication. It helps businesses manage contacts, create email campaigns, monitor campaign performance, and organize email marketing activities through a modern dashboard.

## ✨ Features

### Dashboard
- Campaign performance overview
- Total contacts and subscribed contacts
- Sent campaign statistics
- Recent campaign activity

### Contact Management
- Add, edit, and delete contacts
- Import contacts using CSV files
- Manage subscriber information
- Search and organize contacts

### Email Campaigns
- Create and manage email campaigns
- Save campaigns as drafts
- Send bulk email campaigns
- Retry failed campaigns
- Track campaign status

### Authentication & Security
- Admin login and authentication
- JWT-based authentication
- Protected API routes
- Role-based user access

### Activity Tracking
- Monitor campaign activities
- View campaign status
- Track email delivery attempts

## 🛠️ Technologies Used

### Frontend
- React.js
- TypeScript
- Vite
- Material UI (MUI)
- Redux Toolkit
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer
- JSON Web Token (JWT)

### Development Tools
- Visual Studio Code
- Git
- GitHub
- npm

## 📁 Project Structure

```text
MAILORA/
│
├── backend/
│   ├── scripts/
│   │   └── seedAdmin.js
│   ├── src/
│   │   ├── models.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── api.ts
│   │   ├── store.ts
│   │   ├── main.tsx
│   │   └── style.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd MAILORA
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`.

For Windows:

```bash
copy .env.example .env
```

For Linux/macOS:

```bash
cp .env.example .env
```

Configure the following environment variables in your backend `.env` file:

- MongoDB connection string
- JWT secret
- Admin email and password
- SMTP host
- SMTP port
- SMTP email username
- SMTP email password

Seed the admin account:

```bash
npm run seed:admin
```

Start the backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal in the main MAILORA folder.

```bash
cd frontend
npm install
```

Create the frontend `.env` file.

For Windows:

```bash
copy .env.example .env
```

For Linux/macOS:

```bash
cp .env.example .env
```

Start the frontend:

```bash
npm run dev
```

Open the application:

```text
http://localhost:5173
```

## 🔐 Environment Configuration

Configure the environment variables using the provided `.env.example` files.

Never upload actual `.env` files, passwords, SMTP credentials, or secret keys to GitHub.

## 📧 Email Configuration

MAILORA uses Nodemailer and SMTP configuration to send campaign emails.

To enable email delivery, configure valid SMTP credentials in the backend environment file.

## 🚀 Future Enhancements

- Advanced campaign scheduling
- Email open and click tracking
- Campaign analytics and visual reports
- Drag-and-drop email template builder
- Contact segmentation and smart targeting
- Automated email workflows
- Unsubscribe and suppression management
- Background email processing and queue management

## 🎯 Project Objective

The objective of MAILORA is to develop a scalable and user-friendly email campaign management system that combines modern frontend technologies, secure backend APIs, database management, and email delivery functionality.

## 👩‍💻 Developed With

**MAILORA – Intelligent Email Campaign Platform**

*Your Communication. Smarter. Faster. Better.*

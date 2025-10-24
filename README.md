# Nirogya Healthcare Platform - Frontend

A modern, secure healthcare web application built with Next.js and React.

## Features

- User authentication (Patient, Doctor, Admin roles)
- Medical report upload and management
- Appointment booking system
- Real-time doctor-patient consultations
- AI Health Assistant powered by Google Gemini
- Health insights and analytics dashboard
- Admin verification system for doctors

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend API running on `http://localhost:8080/api`

### Installation

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8080/api
\`\`\`

### Running the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
nirogya-frontend/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (proxy to backend)
│   ├── dashboard/         # Dashboard pages (patient, doctor, admin)
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── patient/         # Patient-specific components
│   ├── doctor/          # Doctor-specific components
│   └── admin/           # Admin-specific components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── public/              # Static assets
└── styles/              # Global styles
\`\`\`

## API Integration

The frontend communicates with the Spring Boot backend through Next.js API routes that proxy requests to `http://localhost:8080/api`.

### Key API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/patient/reports` - Get patient reports
- `POST /api/patient/reports/upload` - Upload medical report
- `GET /api/appointments` - Get appointments
- `POST /api/appointments` - Book appointment
- `POST /api/ai-assistant/chat` - AI health assistant chat

## Technologies Used

- **Framework**: Next.js 16
- **UI Library**: shadcn/ui with Radix UI
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **AI**: Vercel AI SDK with Google Gemini
- **State Management**: React hooks with SWR

## License

MIT

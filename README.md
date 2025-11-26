# NASA APOD Explorer 🚀

A full-stack web application that displays NASA's Astronomy Picture of the Day (APOD) with a modern, space-themed UI.

## Features

- **Dashboard** - View today's astronomy picture with full details
- **Gallery** - View your history of visited astronomy pictures
- **Explorer** - Search any date from June 16, 1995 to today
- **Caching** - SQLite-based cache with TTL and max size limits
- **Responsive** - Works on desktop, tablet, and mobile

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express.js |
| Database | SQLite (better-sqlite3) |
| Frontend | React 18, Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |

## Prerequisites

- Node.js v18 or higher
- npm
- NASA API Key (free at https://api.nasa.gov/)

## Setup

### 1. Clone the repository
```bash
git clone <repo-url>
cd nasa-apod-explorer
```

### 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env
# Edit .env and add your NASA_API_KEY
```

### 3. Setup Frontend
```bash
cd ../client
npm install
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# Runs on http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/apod` | Today's APOD |
| GET | `/api/apod/:date` | APOD by date (YYYY-MM-DD) |
| GET | `/api/apod/history` | All cached/visited APODs |
| GET | `/api/apod/range?start=YYYY-MM-DD&end=YYYY-MM-DD` | APODs in date range |

## Cache Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| TTL | 24 hours | Cache entries expire after 24 hours |
| Max Size | 100 entries | Oldest entries removed when limit exceeded |

## Project Structure

```
nasa-apod-explorer/
├── server/                 # Backend API
│   ├── src/
│   │   ├── index.js       # Express entry point
│   │   ├── config/        # Environment config
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # NASA API service
│   │   ├── database/      # SQLite connection & repository
│   │   ├── cache/         # Cache manager
│   │   └── middleware/    # Error handling, validation
│   └── data/              # SQLite database
│
└── client/                 # Frontend React app
    └── src/
        ├── components/    # Reusable components
        ├── pages/         # Dashboard, Gallery, Explorer
        ├── hooks/         # Custom React hooks
        ├── services/      # API client
        └── utils/         # Helper functions
```

## Screenshots

### Dashboard
Today's APOD with full-screen hero image and details.

### Gallery
Grid view of all the astronomy pictures you have visited.

### Explorer
Date picker to explore any APOD from the archive.

## License

MIT

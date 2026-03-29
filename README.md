# Analytics Dashboard

Dashboard is a full-stack analytics dashboard platform with a dockable multi-panel frontend UI and a FastAPI backend service.

It supports:
- draggable/resizable dashboard panels using Golden Layout
- chart, table, logs, and map panels
- PostgreSQL-backed data with automatic fallback to sample data when DB is unavailable

## Tech Stack

### Frontend
- React 19
- Vite 8
- Golden Layout
- Recharts
- React Leaflet / Leaflet
- Tailwind CSS

### Backend
- FastAPI
- Uvicorn
- SQLAlchemy
- PostgreSQL (optional in local dev; app falls back to sample data)

## Monorepo Structure

```text
Flodata Analytic/
├── README.md
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── runtime.txt
│   └── app/
│       ├── config.py
│       ├── main.py
│       ├── controllers/
│       ├── data/
│       ├── models/
│       └── router/
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── config.js
        ├── pages/
        ├── components/
        └── utils/
```

## Prerequisites

- Python 3.10+
- Node.js 18+ (or latest LTS)
- npm
- PostgreSQL (optional for local development)

## Environment Variables

### Backend (`backend/.env`)

`DATABASE_URL` (optional)

Default used by app if not provided:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dashboard_db
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:8000
```

If not set, frontend also defaults to `http://localhost:8000`.

## Local Development Setup

### 1) Start Backend

```bash
cd backend
python -m venv venv
```

Activate virtual environment:

Windows PowerShell:

```powershell
venv\Scripts\Activate.ps1
```

Windows CMD:

```cmd
venv\Scripts\activate.bat
```

macOS/Linux:

```bash
source venv/bin/activate
```

Install dependencies and run:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: `http://localhost:8000/docs`

### 2) Start Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL (default Vite): `http://localhost:5173`

## API Endpoints

Base URL: `http://localhost:8000`

- `GET /` : health/status payload with current mode (`postgresql` or `sample`)
- `GET /api/stats` : chart data
- `GET /api/table` : table data
- `GET /api/logs` : logs data

## Data Behavior

- On startup, backend tries to connect to PostgreSQL using `DATABASE_URL`.
- If DB connection succeeds:
  - tables are created if missing
  - initial seed data is inserted when tables are empty
  - APIs read from PostgreSQL
- If DB connection fails:
  - APIs serve in-memory sample data from `backend/app/data/data.py`

This makes local setup quick even without a running database.

## Frontend Scripts

From `frontend/`:

- `npm run dev` : start development server
- `npm run build` : production build
- `npm run preview` : preview production build
- `npm run lint` : run ESLint

## Backend Dependencies

From `backend/requirements.txt`:

- fastapi
- uvicorn
- SQLAlchemy
- psycopg2-binary
- python-dotenv

## Troubleshooting

### Backend starts in sample mode

Reason: PostgreSQL is not reachable with current `DATABASE_URL`.

Fix:
- verify PostgreSQL is running
- verify database/user/password in `DATABASE_URL`
- restart backend

### Frontend cannot reach backend

Fix:
- make sure backend runs on port `8000`
- confirm `VITE_API_BASE_URL` in `frontend/.env`
- restart `npm run dev` after env changes

### Leaflet map marker icon issue

The project already sets marker icon assets explicitly in the map panel. If map markers disappear after dependency changes, reinstall frontend dependencies and restart the dev server.

## Notes

- CORS is currently open (`allow_origins=["*"]`) for development convenience.

# 📊 Flodata Analytics

A powerful, interactive full-stack analytics dashboard designed for real-time data visualization and monitoring. Built with a robust FastAPI backend and a dynamic React frontend featuring a dockable multi-panel layout.

## 🚀 Key Features

-   **🧩 Dynamic Multi-Panel Layout**: Uses `Golden Layout` for a fully customizable, dockable, and resizable interface.
-   **📈 Real-time Visualizations**: Interactive charts powered by `Recharts` for insightful data trends.
-   **🗺️ Geographic Mapping**: Integrated `Leaflet` maps for location-based data tracking.
-   **📄 Live Operation Logs**: Dedicated panel for monitoring system events and logs in real-time.
-   **🗄️ Robust Backend**: High-performance FastAPI server with SQLAlchemy integration.
-   **💾 Database Flexibility**: Supports PostgreSQL with a seamless fallback to localized sample data.
-   **⚡ Modern Frontend**: Built with React 19, Vite, and Tailwind CSS for ultimate speed and style.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS
- **Layout**: Golden Layout
- **Charts**: Recharts
- **Maps**: Leaflet / React-Leaflet
- **Icons**: React Icons

### **Backend**
- **Framework**: FastAPI
- **ORM**: SQLAlchemy
- **Database**: PostgreSQL (optional)
- **Environment**: Python 3.x

---

## 📁 Project Structure

```text
Flodata Analytics/
├── backend/                # FastAPI Application
│   ├── app/                # Core logic (routes, models, controllers)
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Backend configuration
├── frontend/               # React Application (Vite)
│   ├── src/                # Components, Pages, Utils
│   ├── package.json        # Frontend dependencies
│   └── .env.example        # Frontend environment template
└── README.md               # Project documentation
```

---

## ⚙️ Getting Started

### **1. Backend Setup**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

### **2. Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
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

## 📝 Configuration

### **Backend (.env)**
Create a `.env` file in the `backend/` folder:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/db_name
# If DATABASE_URL is missing, it skips PostgreSQL and uses sample data.
```

### **Frontend (.env)**
Create a `.env` file in the `frontend/` folder:
```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 📄 License
This project is for demonstration purposes. All rights reserved.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config import DATABASE_URL
from app.controllers.dashboard_controller import seed_data
from app.router.routes import router


app = FastAPI(title="Dashboard API")


# Add CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.state.engine = None
app.state.session_factory = None

app.include_router(router)


@app.on_event("startup")
def startup_event():
    try:
        app.state.engine = create_engine(DATABASE_URL)
        app.state.session_factory = sessionmaker(bind=app.state.engine, autoflush=False)

        seed_data(app.state.engine, app.state.session_factory)

        print("PostgreSQL connected")
    except Exception:
        app.state.engine = None
        app.state.session_factory = None
        print("PostgreSQL not available, using sample data")


@app.on_event("shutdown")
def shutdown_event():
    if app.state.engine is not None:
        app.state.engine.dispose()


@app.get("/")
async def root():
    return {
        "message": "API running",
        "mode": "postgresql" if app.state.session_factory is not None else "sample",
    }



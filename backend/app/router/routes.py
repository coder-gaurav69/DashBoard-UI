from fastapi import APIRouter, Request

from app.controllers.dashboard_controller import get_logs, get_stats, get_table

router = APIRouter(tags=["Panel Routes"], prefix="/api")


@router.get("/stats")
def stats(request: Request):
    session_factory = request.app.state.session_factory
    return get_stats(session_factory)


@router.get("/table")
def table(request: Request):
    session_factory = request.app.state.session_factory
    return get_table(session_factory)


@router.get("/logs")
def logs(request: Request):
    session_factory = request.app.state.session_factory
    return get_logs(session_factory)
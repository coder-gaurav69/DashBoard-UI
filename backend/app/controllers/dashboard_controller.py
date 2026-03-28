from app.models.dashboard_model import get_logs_data, get_stats_data, get_table_data, seed_all


def get_stats(session_factory):
    return get_stats_data(session_factory)


def get_table(session_factory):
    return get_table_data(session_factory)


def get_logs(session_factory):
    return get_logs_data(session_factory)


def seed_data(engine, session_factory):
    seed_all(engine=engine, session_factory=session_factory)

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

from app.data.data import chart_data, logs_data, table_data


Base = declarative_base()


class Stats(Base):
    __tablename__ = "stats"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(20), nullable=False)
    value = Column(Integer, nullable=False)


class DashboardTable(Base):
    __tablename__ = "dashboard_table"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String(50), nullable=False)
    status = Column(String(20), nullable=False)
    last_login = Column(String(20), nullable=False)


class Logs(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    event = Column(String(100), nullable=False)
    timestamp = Column(String(50), nullable=False)


def ensure_tables(engine):
    if engine is None:
        return
    Base.metadata.create_all(bind=engine)


def get_stats_data(session_factory):
    if session_factory is None:
        return chart_data

    session = session_factory()
    try:
        rows = session.query(Stats).order_by(Stats.id).all()
        if not rows:
            return chart_data
        return [{"name": row.name, "value": row.value} for row in rows]
    finally:
        session.close()


def get_table_data(session_factory):
    if session_factory is None:
        return table_data

    session = session_factory()
    try:
        rows = session.query(DashboardTable).order_by(DashboardTable.id).all()
        if not rows:
            return table_data
        return [
            {
                "id": row.id,
                "user": row.user_name,
                "status": row.status,
                "last_login": row.last_login,
            }
            for row in rows
        ]
    finally:
        session.close()


def get_logs_data(session_factory):
    if session_factory is None:
        return logs_data

    session = session_factory()
    try:
        rows = session.query(Logs).order_by(Logs.id).all()
        if not rows:
            return logs_data
        return [
            {
                "id": row.id,
                "event": row.event,
                "timestamp": row.timestamp,
            }
            for row in rows
        ]
    finally:
        session.close()


def seed_all(engine, session_factory):
    if engine is None or session_factory is None:
        return

    ensure_tables(engine)

    session = session_factory()
    try:
        if session.query(Stats).count() == 0:
            stats_rows = [Stats(name=item["name"], value=item["value"]) for item in chart_data]
            session.add_all(stats_rows)

        if session.query(DashboardTable).count() == 0:
            table_rows = [
                DashboardTable(
                    user_name=item["user"],
                    status=item["status"],
                    last_login=item["last_login"],
                )
                for item in table_data
            ]
            session.add_all(table_rows)

        if session.query(Logs).count() == 0:
            log_rows = [Logs(event=item["event"], timestamp=item["timestamp"]) for item in logs_data]
            session.add_all(log_rows)

        session.commit()
    finally:
        session.close()

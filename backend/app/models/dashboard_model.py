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

def get_stats_data(session_factory):
    if not session_factory: return chart_data
    session = session_factory()
    rows = session.query(Stats).order_by(Stats.id).all()
    session.close()
    if not rows: return chart_data
    return [{"name": r.name, "value": r.value} for r in rows]

def get_table_data(session_factory):
    if not session_factory: return table_data
    session = session_factory()
    rows = session.query(DashboardTable).all()
    session.close()
    if not rows: return table_data
    return [{"id": r.id, "user": r.user_name, "status": r.status, "last_login": r.last_login} for r in rows]

def get_logs_data(session_factory):
    if not session_factory: return logs_data
    session = session_factory()
    rows = session.query(Logs).all()
    session.close()
    if not rows: return logs_data
    return [{"id": r.id, "event": r.event, "timestamp": r.timestamp} for r in rows]

def seed_all(engine, session_factory):
    if not engine or not session_factory: return
    Base.metadata.create_all(bind=engine)
    session = session_factory()
    
    if session.query(Stats).count() == 0:
        for item in chart_data:
            session.add(Stats(name=item["name"], value=item["value"]))
            
    if session.query(DashboardTable).count() == 0:
        for item in table_data:
            session.add(DashboardTable(user_name=item["user"], status=item["status"], last_login=item["last_login"]))
            
    if session.query(Logs).count() == 0:
        for item in logs_data:
            session.add(Logs(event=item["event"], timestamp=item["timestamp"]))
            
    session.commit()
    session.close()

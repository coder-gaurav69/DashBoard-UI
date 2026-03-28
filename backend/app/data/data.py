import random
from datetime import datetime, timezone


chart_data = [
    {"name": "Jan", "value": random.randint(100, 500)},
    {"name": "Feb", "value": random.randint(100, 500)},
    {"name": "Mar", "value": random.randint(100, 500)},
    {"name": "Apr", "value": random.randint(100, 500)},
    {"name": "May", "value": random.randint(100, 500)},
    {"name": "Jun", "value": random.randint(100, 500)},
]
table_data = [
    {"id": 1, "user": "Rahul", "status": "Active", "last_login": "2024-03-20"},
    {"id": 2, "user": "Sneha", "status": "Pending", "last_login": "2024-03-21"},
    {"id": 3, "user": "Amit", "status": "Active", "last_login": "2024-03-19"},
    {"id": 4, "user": "Priya", "status": "Inactive", "last_login": "2024-03-15"},
    {"id": 5, "user": "Vikram", "status": "Active", "last_login": "2024-03-22"},
]

now = datetime.now(timezone.utc).isoformat()
logs_data = [
    {"id": 101, "event": "User Login", "timestamp": now},
    {"id": 102, "event": "Data Updated", "timestamp": now},
    {"id": 103, "event": "System Restart", "timestamp": now},
    {"id": 104, "event": "New Panel Added", "timestamp": now},
]
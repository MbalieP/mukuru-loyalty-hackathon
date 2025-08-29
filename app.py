from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.ensemble import IsolationForest
from datetime import datetime

app = Flask(__name__)
CORS(app)

DEMO_USER = {
    "username": "demo",
    "password": "Demo@123",
    "cellphone": "0712345678"
}

# Simulated login history for Isolation Forest
history = pd.DataFrame({
    "hour": [9, 10, 9, 15, 23],
    "day_of_week": [1,1,2,3,5],
    "failed_attempts": [0,0,1,0,2],
    "distance_km": [0.5,0.3,0.2,50,300]
})
clf = IsolationForest(contamination=0.1, random_state=42)
clf.fit(history)

# Track failed attempts
failed_attempts_dict = {}
MAX_ATTEMPTS = 5

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    cellphone = data.get("cellphone")

    # Initialize failed attempts if user not in dict
    if username not in failed_attempts_dict:
        failed_attempts_dict[username] = 0

    # Check credentials
    if username == DEMO_USER["username"] and password == DEMO_USER["password"] and cellphone == DEMO_USER["cellphone"]:
        # Reset failed attempts on successful login
        failed_attempts_dict[username] = 0
        return jsonify({"status": "success"})

    else:
        # Increment failed attempts
        failed_attempts_dict[username] += 1

        # If user reaches MAX_ATTEMPTS, run anomaly detection
        if failed_attempts_dict[username] >= MAX_ATTEMPTS:
            # Collect login features (simulate)
            now = datetime.now()
            hour = now.hour
            day_of_week = now.weekday()
            distance_km = 100  # simulate unusual location
            features = pd.DataFrame({
                "hour": [hour],
                "day_of_week": [day_of_week],
                "failed_attempts": [failed_attempts_dict[username]],
                "distance_km": [distance_km]
            })
            anomaly = clf.predict(features)[0]  # -1 = anomaly, 1 = normal

            # Reset attempts after anomaly check
            failed_attempts_dict[username] = 0

            if anomaly == -1:
                return jsonify({"status": "suspicious"})
        
        # Normal failed login response
        attempts_left = MAX_ATTEMPTS - failed_attempts_dict[username]
        return jsonify({"status": "fail", "attempts_left": attempts_left})

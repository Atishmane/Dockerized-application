from flask import Flask, jsonify, render_template
import json
import os

app = Flask(__name__)

DATA_PATH = "/app/scraped_data.json"

@app.route("/")
def index():
    if os.path.exists(DATA_PATH):
        with open(DATA_PATH, "r") as f:
            data = json.load(f)
        return render_template("index.html", data=data)
    else:
        return "No scraped data available", 404

@app.route("/api")
def api():
    if os.path.exists(DATA_PATH):
        with open(DATA_PATH, "r") as f:
            data = json.load(f)
        return jsonify(data)
    else:
        return jsonify({"error": "No data found"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)


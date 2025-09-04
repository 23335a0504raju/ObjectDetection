#!/bin/bash
set -e

# ----------------------------
# Step 1: Install dependencies
# ----------------------------
pip install --upgrade pip
pip install -r requirements.txt

# ----------------------------
# Step 2: Run Django migrations
# ----------------------------
python manage.py migrate

# ----------------------------
# Step 3: Collect static files
# ----------------------------
python manage.py collectstatic --noinput

# ----------------------------
# Step 4: Download YOLO model if missing
# ----------------------------
MODEL_FILE="yolov8x.pt"
if [ ! -f "$MODEL_FILE" ]; then
    echo "Downloading YOLO model..."
    curl -L -o "$MODEL_FILE" "https://ultralytics.com/assets/yolov8x.pt"
fi

# ----------------------------
# Step 5: Start Gunicorn server
# ----------------------------
gunicorn object_detection.wsgi:application --bind 0.0.0.0:$PORT

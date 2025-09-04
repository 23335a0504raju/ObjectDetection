#!/bin/bash

# Exit on error
set -e

# Install dependencies (if Render doesn't automatically do it)
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Collect static files (optional)
python manage.py collectstatic --noinput

# Start server using Gunicorn on the assigned PORT
gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT

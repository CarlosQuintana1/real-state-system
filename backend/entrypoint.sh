#!/bin/sh
set -e  # Detener si hay error

echo "Esperando la base de datos..."

echo "Ejecutando seed..."
python seed.py

echo "Iniciando FastAPI..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

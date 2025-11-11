#!/bin/sh
set -e  # Detener si hay error

echo "Esperando la base de datos..."

sleep 5

if [ "$RUN_SEED" = "true" ]; then
  echo "Ejecutando seed..."
  python seed.py
else
  echo "Seed desactivado (RUN_SEED != true)"
fi

echo "Iniciando FastAPI..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

from app.config.db import engine, Base, SessionLocal

Base.metadata.create_all(bind=engine)
#Obtain session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
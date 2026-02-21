from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import shutil
import os
import uuid

# Implemented modules
from feature_extractor import extract_features
from model_loader import load_models, predict
from report_generator import generate_pdf_report

app = FastAPI(title="Parkinson's Voice Detection API", version="1.0.0")

# Setup CORS for frontend communication
# In a real production setup, origins should be restricted to the frontend domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directories for temp logic and reports
TEMP_DIR = "temp_audio"
REPORTS_DIR = "reports"
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(REPORTS_DIR, exist_ok=True)

@app.on_event("startup")
async def startup_event():
    """Load model on backend startup."""
    load_models()

@app.get("/health")
async def health_check():
    """Healthcheck endpoint."""
    return {"status": "healthy", "message": "FastAPI backend is running"}

@app.post("/predict")
async def predict_voice(file: UploadFile = File(...)):
    """Receives an audio file, processes it, and returns the model prediction."""
    if not file.filename.endswith(".wav"):
        raise HTTPException(status_code=400, detail="Only .wav voice files are supported")
    
    file_id = str(uuid.uuid4())
    temp_file_path = os.path.join(TEMP_DIR, f"{file_id}.wav")
    
    try:
        # Save uploaded file
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Extract features (MFCC, ZCR, SC, RMS)
        features = extract_features(temp_file_path)
        
        # Pass features through model
        result = predict(features)
        
        # Link report ID for PDF generation route
        result["report_id"] = file_id
        
        # Proactively generate the report
        report_path = os.path.join(REPORTS_DIR, f"{file_id}.pdf")
        generate_pdf_report(result, report_path)
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Prevent disk clutter by removing the temp .wav file immediately
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

@app.get("/report/{report_id}")
async def get_report(report_id: str):
    """Retrieves PDF report generated during prediction."""
    report_path = os.path.join(REPORTS_DIR, f"{report_id}.pdf")
    if not os.path.exists(report_path):
        raise HTTPException(status_code=404, detail="PDF Report not found")
    
    return FileResponse(
        report_path, 
        media_type='application/pdf', 
        filename=f"Parkinsons_Analysis_Report_{report_id}.pdf"
    )

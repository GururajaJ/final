# Full-Stack AI-Based Voice Detection System for Parkinson’s Disease

A professional health-tech full-stack application developed as a Final Year Academic Project. This system utilizes Acoustic Analysis and Machine Learning (XGBoost) to detect vocal biomarkers for Parkinson's Disease with a modern React dashboard and FastAPI backend.

## Project Architecture

1. **Frontend**: React (Vite) + Tailwind CSS + Recharts
2. **Backend**: FastAPI + Uvicorn + FPDF
3. **Machine Learning**: XGBoost + Scikit-Learn + Librosa (Acoustic Feature Extraction)

## Folder Structure
```text
parkinsons_detection/
├── backend/                  # FastAPI Application
│   ├── main.py               # API Endpoints & CORS
│   ├── model_loader.py       # loads ML pipeline
│   ├── feature_extractor.py  # Librosa MFFC, ZCR, SC, RMS
│   ├── report_generator.py   # PDF rendering engine
│   └── requirements.txt      # Python dependencies
├── frontend/                 # React UI
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI (Navbar)
│   │   └── pages/            # Dashboard, Prediction, Analysis, About
│   ├── package.json          # Node dependencies
│   ├── tailwind.config.js    # UI Theming
│   └── vite.config.js        # Bundler configuration
└── model/                    # Machine Learning Logic
    ├── train_model.py        # ML Training and 5-Fold CV Evaluation script
    ├── model.pkl             # Trained XGBoost Classifier (Generated after run)
    └── scaler.pkl            # Standard Scaler (Generated after run)
```

## Step-by-Step Run Instructions

### 1. Model Training (Optional, but required first time to generate .pkl files)
If `model.pkl` and `scaler.pkl` are not present in the `model/` folder:

First, download the **UCI Parkinson's Speech Dataset**. Extract the `.wav` files and organize them inside the `model` folder exactly like this:
```text
model/
└── dataset/
    ├── healthy/
    │   ├── sample_healthy_1.wav
    │   └── ...
    └── parkinson/
        ├── sample_pd_1.wav
        └── ...
```

Then, run the training script:
```bash
cd model
pip install -r ../backend/requirements.txt
python train_model.py
```

### 2. Running the FastAPI Backend
Open a new terminal:
```bash
cd backend
# Create a virtual environment (Recommended)
python -m venv venv
# Activate virtual environment
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```
Backend will be live at `http://localhost:8000`. FastApi Docs at `http://localhost:8000/docs`.

### 3. Running the React Frontend
Open a new terminal:
```bash
cd frontend

# Install Node Dependencies
npm install

# Start the Vite development server
npm run dev
```
Frontend will be live at `http://localhost:5173`.

## Features
- **Drag & Drop Audio Upload**: Process `.wav` recordings instantly.
- **Explainable ML Metrics**: Visualizations of Risk Levels, Probability distributions, and ROC curves.
- **Clinical PDF Reports**: Automatically generate and download professional Medical AI assessment reports.
- **Modern UI/UX**: Premium Tailwind styling suitable for hospital administration portals.

## Viva / Portfolio Focus Points
- **Algorithm Justification**: Explain why 16 specific features (MFCC, Zero Crossing Rate, Spectral Centroid, RMS energy) were chosen (high correlation with dysarthria).
- **Asynchronous Architecture**: Emphasize how FastAPI handles non-blocking audio I/O streaming.
- **Clinical Constraints**: Discuss the included Medical Disclaimers and how this is a *screening* utility tool, not a diagnostic certainty.

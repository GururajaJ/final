import joblib
import xgboost as xgb
import os
import numpy as np

# Resolve models path relative to this script or current working directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'model', 'model.pkl')
SCALER_PATH = os.path.join(BASE_DIR, 'model', 'scaler.pkl')

model = None
scaler = None

def load_models():
    """Loads the compiled ML model and scalar into memory."""
    global model, scaler
    try:
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        print(f"Model and scaler loaded successfully from {MODEL_PATH}")
    except Exception as e:
        print(f"Warning: Model or scaler not found at {MODEL_PATH}.")
        print(f"Prediction won't work until trained. Error: {e}")

def predict(features: np.ndarray) -> dict:
    """Uses the loaded model to predict the probability and risk level."""
    if model is None or scaler is None:
        raise Exception("Model or scaler not loaded. Train the model first.")
    
    # Ensure features are correctly formatted as 2D array
    if len(features.shape) == 1:
        features = features.reshape(1, -1)
        
    # Scale features
    scaled_features = scaler.transform(features)
    
    # Predict probabilities (assuming binary classification: 0=Healthy, 1=Parkinson's)
    probabilities = model.predict_proba(scaled_features)[0]
    parkinson_prob = float(probabilities[1])
    
    # Determine risk level based on probability
    if parkinson_prob < 0.3:
        risk_level = "Low"
    elif parkinson_prob < 0.6:
        risk_level = "Moderate"
    elif parkinson_prob < 0.8:
        risk_level = "High"
    else:
        risk_level = "Critical"
        
    prediction_text = "Parkinson Detected" if parkinson_prob >= 0.5 else "No Parkinson Detected"
    
    return {
        "prediction": prediction_text,
        "probability": parkinson_prob,
        "risk_level": risk_level,
        "confidence": f"{parkinson_prob * 100:.1f}%"
    }

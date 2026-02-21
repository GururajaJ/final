import joblib
import numpy as np

model_path = 'model.pkl'
scaler_path = 'scaler.pkl'

try:
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    
    # Generate completely random noise data to see if it moves the needle
    dummy_feats = np.random.rand(1, 16) * 100
    
    scaled = scaler.transform(dummy_feats)
    prob_class1 = model.predict_proba(scaled)[0][1]
    
    print(f"Dummy Feats: {dummy_feats}")
    print(f"Scaled Feats: {scaled}")
    print(f"Prediction Probability for class 1: {prob_class1}")
    print(f"Confidence value: {prob_class1 * 100:.1f}%")
except Exception as e:
    print(f"Error testing model: {e}")

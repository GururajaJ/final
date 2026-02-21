import pandas as pd
import numpy as np
import librosa
import os
import joblib
from sklearn.model_selection import train_test_split, cross_val_score, KFold
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
import warnings

warnings.filterwarnings('ignore')

# Feature extraction matching exactly how the backend extracts features
def extract_features(file_path: str) -> np.ndarray:
    try:
        y, sr = librosa.load(file_path, sr=None)
        
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        mfcc_mean = np.mean(mfcc, axis=1) # 13 features
        
        zcr = librosa.feature.zero_crossing_rate(y)
        zcr_mean = np.mean(zcr) # 1 feature
        
        sc = librosa.feature.spectral_centroid(y=y, sr=sr)
        sc_mean = np.mean(sc) # 1 feature
        
        rms = librosa.feature.rms(y=y)
        rms_mean = np.mean(rms) # 1 feature
        
        features = np.hstack([mfcc_mean, zcr_mean, sc_mean, rms_mean])
        return features
    except Exception as e:
        print(f"Error extracting features from {file_path}: {e}")
        return None

def evaluate_model(model, X_test, y_test, model_name):
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]
    
    print(f"\n--- Evaluation for {model_name} ---")
    print(f"Accuracy:  {accuracy_score(y_test, y_pred):.4f}")
    print(f"Precision: {precision_score(y_test, y_pred):.4f}")
    print(f"Recall:    {recall_score(y_test, y_pred):.4f}")
    print(f"F1-Score:  {f1_score(y_test, y_pred):.4f}")
    print(f"ROC-AUC:   {roc_auc_score(y_test, y_prob):.4f}\n")

def main():
    print("==================================================")
    print(" Parkinson's Disease Voice Detection - ML Trainer ")
    print("==================================================")
    
    # --- 1. Data Loading & Feature Extraction ---
    print("\n[INFO] Loading audio data from SJTU Parkinson's Speech Dataset...")
    
    # Base dataset path
    dataset_dir = os.path.join(os.path.dirname(__file__), 'dataset_extracted', 'Parkinson-Patient-Speech-Dataset-master', 'original-speech-dataset')
    
    if not os.path.exists(dataset_dir):
        print(f"\n[ERROR] Dataset directory not found: {dataset_dir}")
        print("Please ensure you have run the download commands.")
        return
        
    features_list = []
    labels_list = []
    
    import glob
    
    # According to the dataset structure:
    # DL, Faces, LW are Parkinson's Patients (1)
    # Tessi, emma are Healthy/Control subjects (0)
    
    # Define folder mapping
    dataset_mapping = {
        'Tessi': 0,
        'emma': 0,
        'DL': 1,
        'Faces': 1,
        'LW': 1
    }
    
    for folder_name, label in dataset_mapping.items():
        folder_path = os.path.join(dataset_dir, folder_name)
        if not os.path.exists(folder_path):
            print(f"[WARNING] Skipping missing folder: {folder_path}")
            continue
            
        wav_files = glob.glob(os.path.join(folder_path, "*.wav"))
        status_label = "Healthy" if label == 0 else "Parkinson's"
        print(f"Loading '{folder_name}' ({status_label}): Found {len(wav_files)} samples.")
        
        for file in wav_files:
            feats = extract_features(file)
            if feats is not None:
                features_list.append(feats)
                labels_list.append(label)
                
    if len(features_list) == 0:
        print("[ERROR] No valid features extracted.")
        return
        
    X = np.vstack(features_list)
    y = np.array(labels_list)
    
    # --- 2. Train/Test Split ---
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    # --- 3. Feature Scaling ---
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # --- 4. Models Initialization ---
    kf = KFold(n_splits=5, shuffle=True, random_state=42)
    models = {
        'Logistic Regression': LogisticRegression(max_iter=1000),
        'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
        'XGBoost': XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)
    }
    
    # --- 5. Training, 5-Fold CV & Evaluation ---
    best_model = None
    best_auc = 0
    best_model_name = ""
    
    for name, model in models.items():
        # 5-fold cross validation
        cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=kf, scoring='roc_auc')
        print(f"[{name}] 5-Fold CV Mean ROC-AUC: {cv_scores.mean():.4f}")
        
        # Fit on entire training data
        model.fit(X_train_scaled, y_train)
        
        # Evaluate on hidden test data
        evaluate_model(model, X_test_scaled, y_test, name)
        
        # Track the best model based on ROC-AUC metric
        test_auc = roc_auc_score(y_test, model.predict_proba(X_test_scaled)[:, 1])
        if test_auc > best_auc:
            best_auc = test_auc
            best_model = model
            best_model_name = name
            
    print("==================================================")
    print(f" Best Model Selected: {best_model_name} (ROC-AUC {best_auc:.4f})")
    print("==================================================")
    
    # --- 6. Save the winning model & scaler ---
    os.makedirs(os.path.dirname(__file__), exist_ok=True)
    model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
    scaler_path = os.path.join(os.path.dirname(__file__), 'scaler.pkl')
    
    joblib.dump(best_model, model_path)
    joblib.dump(scaler, scaler_path)
    
    print(f"\n[SUCCESS] Saved best model to: {model_path}")
    print(f"[SUCCESS] Saved scaler to: {scaler_path}")

if __name__ == "__main__":
    main()

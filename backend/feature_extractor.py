import librosa
import numpy as np

def extract_features(file_path: str) -> np.ndarray:
    """
    Extracts features from an audio file.
    Features: 13 MFCCs, Zero Crossing Rate, Spectral Centroid, RMS Energy
    """
    try:
        # Load audio file (sr=None preserves the original sample rate)
        y, sr = librosa.load(file_path, sr=None)
        
        # Extract features
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        mfcc_mean = np.mean(mfcc, axis=1) # 13 features
        
        zcr = librosa.feature.zero_crossing_rate(y)
        zcr_mean = np.mean(zcr) # 1 feature
        
        sc = librosa.feature.spectral_centroid(y=y, sr=sr)
        sc_mean = np.mean(sc) # 1 feature
        
        rms = librosa.feature.rms(y=y)
        rms_mean = np.mean(rms) # 1 feature
        
        # Combine all features into a single array (shape: 1, 16)
        features = np.hstack([mfcc_mean, zcr_mean, sc_mean, rms_mean])
        return features.reshape(1, -1)
    except Exception as e:
        raise Exception(f"Error extracting features from {file_path}: {str(e)}")

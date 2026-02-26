import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini with API key from .env
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Use Gemini 1.5 Flash for fast, cost-effective responses
model = genai.GenerativeModel("gemini-1.5-flash")


def get_consultation(prediction_data: dict) -> str:
    """
    Sends prediction results to Gemini and returns a doctor-level
    consultation response.
    """
    prediction = prediction_data.get("prediction", "Unknown")
    probability = prediction_data.get("probability", 0)
    risk_level = prediction_data.get("risk_level", "Unknown")
    confidence = prediction_data.get("confidence", "0%")

    prompt = f"""You are a highly experienced neurologist and movement disorder specialist.
A patient has undergone an AI-based acoustic voice analysis for Parkinson's Disease screening.
Here are the results:

- **AI Prediction**: {prediction}
- **Parkinson's Probability**: {probability * 100:.1f}%
- **Risk Level**: {risk_level}
- **Model Confidence**: {confidence}

Based on these results, provide a comprehensive, empathetic, and professional medical consultation.
Structure your response EXACTLY with these markdown sections:

## 🩺 Clinical Summary
Provide a clear, patient-friendly interpretation of the screening results. Explain what the risk level means in clinical terms. Be reassuring but honest.

## 📋 Recommended Next Steps
Provide 4-6 specific, actionable medical recommendations. Include relevant diagnostic tests (DaTscan, MRI, UPDRS assessment, etc.) based on the risk level. Format as a numbered list.

## 🌿 Lifestyle & Wellness Guidance
Provide 4-6 evidence-based lifestyle recommendations that support neurological health, such as exercise, diet, sleep hygiene, speech therapy, and stress management. Format as a numbered list.

## ⚠️ When to Seek Immediate Medical Attention
List 3-5 specific warning signs or symptoms that should prompt the patient to consult a neurologist immediately. Format as a numbered list.

IMPORTANT GUIDELINES:
- Use warm, professional, and empathetic language throughout
- This is a screening tool, NOT a definitive diagnosis — make this very clear
- Tailor the urgency and specificity of recommendations to the risk level
- Include relevant medical terminology but explain it in simple terms
- Do not use overly alarming language for low-risk results
- For high/critical risk, strongly recommend prompt specialist evaluation
"""

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        raise Exception(f"Gemini API error: {str(e)}")

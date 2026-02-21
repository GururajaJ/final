from fpdf import FPDF
import os
from datetime import datetime

class PDFReport(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        # Title spanning the width
        self.cell(0, 10, 'HealthTech AI - Voice Analysis Report', border=0, ln=1, align='C')
        self.ln(10)
        
    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

def generate_pdf_report(prediction_data: dict, filepath: str):
    """Generates a professional medical PDF report from prediction context."""
    pdf = PDFReport()
    pdf.add_page()
    
    # General Info
    pdf.set_font("Arial", size=12)
    pdf.cell(0, 10, txt=f"Date of Analysis: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", ln=True)
    pdf.ln(5)
    
    # Header for results
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(0, 10, txt="Analysis Results", ln=True)
    pdf.set_font("Arial", size=12)
    pdf.ln(5)
    
    # Adding data points in a small table-like structure
    line_height = 10
    col_width = 60
    
    def add_row(key, value):
        pdf.set_font("Arial", 'B', 12)
        pdf.cell(col_width, line_height, txt=key, border=1)
        pdf.set_font("Arial", '', 12)
        pdf.cell(0, line_height, txt=str(value), border=1, ln=True)

    add_row("Prediction Status:", prediction_data.get('prediction', 'N/A'))
    add_row("Assessed Risk Level:", prediction_data.get('risk_level', 'N/A'))
    add_row("AI Probability Index:", f"{prediction_data.get('probability', 0):.4f}")
    add_row("Model Confidence:", prediction_data.get('confidence', 'N/A'))
    
    pdf.ln(10)
    
    # Disclaimer section (Medical)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(0, 10, txt="Medical Disclaimer", ln=True)
    pdf.set_font("Arial", 'I', 10)
    disclaimer = (
        "This AI-generated report is based on Machine Learning analysis of acoustic voice features "
        "(such as MFCC, Zero Crossing Rate, Spectral Centroid, and RMS Energy) strongly correlated "
        "with changes observed in Parkinson's Disease."
        "\n\nIMPORTANT: This document is intended for informational and screening purposes only. "
        "It does NOT replace professional medical advice, clinical diagnosis, or treatment. "
        "High risk levels suggest further clinical evaluation by a neurologist may be warranted."
    )
    pdf.multi_cell(0, 8, txt=disclaimer)
    
    # Save the output
    pdf.output(filepath)
    return filepath

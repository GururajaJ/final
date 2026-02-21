import { FaGraduationCap, FaCode, FaRobot, FaStethoscope } from 'react-icons/fa';

export default function About() {
    return (
        <div className="max-w-5xl mx-auto space-y-12 animate-fade-in pb-12">
            <div className="text-center mt-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">HealthTech <span className="text-brand-600">AI</span></h1>
                <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                    A Full-Stack AI-Based Voice Detection System for Parkinson’s Disease
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="p-8 sm:p-12">
                    <div className="flex items-center mb-6">
                        <div className="h-14 w-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mr-5 border border-brand-100 shadow-sm">
                            <FaStethoscope className="text-2xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">The Clinical Problem</h2>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg font-medium">
                        Parkinson's Disease (PD) is a progressive nervous system disorder that affects movement.
                        One of the earliest and most common symptoms of PD is vocal impairment (<span className="text-slate-900 font-semibold italic">dysarthria</span>),
                        characterized by reduced loudness, monotonic pitch, and vocal tremors.
                        Early detection through acoustic analysis enables highly non-invasive, accessible screening that allows for better symptom management and dramatically improved patient outcomes.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-8">
                        <div className="h-14 w-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mr-5 border border-emerald-100 shadow-sm">
                            <FaRobot className="text-2xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Algorithmic Methodology</h2>
                    </div>
                    <ul className="space-y-6 text-slate-600 text-lg">
                        <li className="flex items-start">
                            <span className="h-8 w-8 shrink-0 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold mr-4 border border-slate-200 shadow-sm">1</span>
                            <span><strong className="text-slate-900 block mb-1">Acoustic Feature Extraction</strong> Utilizing <code>librosa</code> to extract 16 highly representative speech features including MFCCs, Spectral Centroid, and Zero Crossing Rate from raw `.wav` files.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="h-8 w-8 shrink-0 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold mr-4 border border-slate-200 shadow-sm">2</span>
                            <span><strong className="text-slate-900 block mb-1">Predictive Engine</strong> An optimized XGBoost Classifier trained on verified clinical voice datasets determining pathological probability through non-linear decision boundaries.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="h-8 w-8 shrink-0 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold mr-4 border border-slate-200 shadow-sm">3</span>
                            <span><strong className="text-slate-900 block mb-1">Diagnostic Architecture</strong> FastAPI orchestrates the ML pipeline asynchronously, feeding real-time probabilities to the React dashboard while generating clinical PDF reports.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-8">
                        <div className="h-14 w-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mr-5 border border-purple-100 shadow-sm">
                            <FaCode className="text-2xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Full-Stack Tech Stack</h2>
                    </div>
                    <div className="space-y-8">
                        <div className="group">
                            <h4 className="font-bold text-slate-900 mb-2 border-b-2 border-slate-100 pb-2 flex justify-between items-center group-hover:border-purple-200 transition-colors">
                                Frontend Application
                                <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded text-slate-500">UI</span>
                            </h4>
                            <p className="text-slate-600 font-medium">React 18, Vite build tool, Tailwind CSS for utility styling, Recharts for dynamic performance visualizations, and React Router for fluid SPA navigation.</p>
                        </div>
                        <div className="group">
                            <h4 className="font-bold text-slate-900 mb-2 border-b-2 border-slate-100 pb-2 flex justify-between items-center group-hover:border-purple-200 transition-colors">
                                Backend API Services
                                <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded text-slate-500">API</span>
                            </h4>
                            <p className="text-slate-600 font-medium">FastAPI framework, Uvicorn ASGI server, FPDF for automated medical report generation, Python Multipart for audio handling via REST.</p>
                        </div>
                        <div className="group">
                            <h4 className="font-bold text-slate-900 mb-2 border-b-2 border-slate-100 pb-2 flex justify-between items-center group-hover:border-purple-200 transition-colors">
                                Machine Learning Pipeline
                                <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded text-slate-500">AI/ML</span>
                            </h4>
                            <p className="text-slate-600 font-medium">XGBoost, Scikit-learn (Logistic Regression, Random Forest fallback), Librosa, NumPy. Explanatory models backed by rigorous 5-fold cross-validation.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center bg-brand-50 border border-brand-200 py-10 rounded-3xl shadow-sm transform hover:-translate-y-1 transition-transform duration-300">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-white shadow-sm border border-brand-100 text-brand-600 mb-6">
                    <FaGraduationCap className="text-4xl" />
                </div>
                <h2 className="text-3xl font-extrabold text-brand-900 tracking-tight">Final Year Project Showcase</h2>
                <p className="text-brand-700 mt-4 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                    Developed as a comprehensive Academic Capstone. Ready for university Viva assessment and professional portfolio deployment.
                </p>
            </div>
        </div>
    );
}

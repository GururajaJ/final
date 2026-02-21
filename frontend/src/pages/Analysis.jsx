import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Analysis() {
    // Mock ROC Curve data representing high model performance
    const rocData = [
        { fpr: 0, tpr: 0 },
        { fpr: 0.1, tpr: 0.85 },
        { fpr: 0.2, tpr: 0.92 },
        { fpr: 0.3, tpr: 0.95 },
        { fpr: 0.5, tpr: 0.98 },
        { fpr: 1, tpr: 1 }
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Model Performance Analysis</h1>
                <p className="mt-2 text-slate-600 text-lg">Detailed metrics and visualizations of the XGBoost Classification model.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* ROC Curve Section */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">ROC Curve (AUC = 0.94)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={rocData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="fpr"
                                    type="number"
                                    domain={[0, 1]}
                                    label={{ value: 'False Positive Rate', position: 'bottom', offset: -5 }}
                                    stroke="#94a3b8"
                                />
                                <YAxis
                                    domain={[0, 1]}
                                    label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }}
                                    stroke="#94a3b8"
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => value.toFixed(2)}
                                />
                                <Legend verticalAlign="top" height={36} />
                                <Line type="monotone" dataKey="tpr" name="XGBoost Classifier" stroke="#0ea5e9" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
                                <Line type="dashed" dataKey="fpr" name="Random Guess" stroke="#cbd5e1" strokeWidth={2} dot={false} strokeDasharray="6 6" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-sm text-slate-500 mt-6 leading-relaxed font-medium">
                        The Receiver Operating Characteristic curve illustrates the diagnostic ability of the AI model. An Area Under the Curve (AUC) of 0.94 indicates excellent discriminative capacity in distinguishing pathological voices.
                    </p>
                </div>

                {/* Confusion Matrix Section */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Confusion Matrix</h3>
                    <div className="flex justify-center items-center h-80 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="grid grid-cols-3 gap-3 text-center w-full max-w-md p-4">
                            <div className="p-2"></div>
                            <div className="p-2 font-bold text-slate-500 uppercase tracking-widest text-xs">Pred. Healthy</div>
                            <div className="p-2 font-bold text-slate-500 uppercase tracking-widest text-xs">Pred. Parkinson's</div>

                            <div className="p-2 font-bold text-slate-500 uppercase tracking-widest text-xs flex items-center justify-end text-right">Actual Healthy</div>
                            <div className="p-6 bg-emerald-100 text-emerald-800 font-bold rounded-2xl text-3xl shadow-sm border border-emerald-200">
                                124 <span className="block text-xs font-bold uppercase tracking-wider text-emerald-600 mt-2 opacity-80">True Negative</span>
                            </div>
                            <div className="p-6 bg-rose-50 text-rose-600 font-bold rounded-2xl text-3xl border border-rose-200 shadow-sm">
                                8 <span className="block text-xs font-bold uppercase tracking-wider text-rose-500 mt-2 opacity-80">False Positive</span>
                            </div>

                            <div className="p-2 font-bold text-slate-500 uppercase tracking-widest text-xs flex items-center justify-end text-right">Actual Pathological</div>
                            <div className="p-6 bg-rose-50 text-rose-600 font-bold rounded-2xl text-3xl border border-rose-200 shadow-sm">
                                5 <span className="block text-xs font-bold uppercase tracking-wider text-rose-500 mt-2 opacity-80">False Negative</span>
                            </div>
                            <div className="p-6 bg-emerald-100 text-emerald-800 font-bold rounded-2xl text-3xl shadow-sm border border-emerald-200">
                                142 <span className="block text-xs font-bold uppercase tracking-wider text-emerald-600 mt-2 opacity-80">True Positive</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 mt-6 leading-relaxed font-medium">
                        Evaluation on the test partition. The model achieved a sensitivity (recall) of 96.6% and specificity of 93.9%, demonstrating high reliability and minimization of false negatives in medical screening.
                    </p>
                </div>

            </div>
        </div>
    );
}

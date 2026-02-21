import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaFileAudio, FaSpinner, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const API_URL = 'http://localhost:8000';

export default function Prediction() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        const audioFile = acceptedFiles[0];
        if (audioFile && audioFile.name.endsWith('.wav')) {
            setFile(audioFile);
            setError(null);
            setResult(null);
        } else {
            setError('Invalid file format. Please upload a .wav audio file.');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'audio/wav': ['.wav'] },
        maxFiles: 1
    });

    const analyzeVoice = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${API_URL}/predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || 'An error occurred connecting to the AI backend. Please ensure the FastAPI server is running.');
        } finally {
            setLoading(false);
        }
    };

    const downloadReport = async () => {
        if (!result?.report_id) return;

        try {
            const response = await axios.get(`${API_URL}/report/${result.report_id}`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Parkinsons_Report_${result.report_id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Error downloading report", err);
        }
    };

    const getRiskColor = (level) => {
        switch (level) {
            case 'Low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Critical': return 'bg-rose-100 text-rose-800 border-rose-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    const COLORS = ['#ef4444', '#10b981'];

    const chartData = result ? [
        { name: 'Parkinson Risk', value: result.probability * 100 },
        { name: 'Healthy Profile', value: 100 - (result.probability * 100) }
    ] : [];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Acoustic Analysis</h1>
                <p className="mt-2 text-slate-600 text-lg">Upload a patient's voice recording (.wav) to analyze acoustic biomarkers for Parkinson's Disease.</p>
            </div>

            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-3xl p-14 text-center cursor-pointer transition-all duration-300
          ${isDragActive ? 'border-brand-500 bg-brand-50 shadow-inner' : 'border-slate-300 hover:border-brand-400 hover:bg-slate-50/80'}
          ${file ? 'bg-white border-solid border-slate-200 shadow-sm hover:border-slate-300' : ''}
        `}
            >
                <input {...getInputProps()} />
                {file ? (
                    <div className="flex flex-col items-center">
                        <div className="h-20 w-20 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mb-5 shadow-sm border border-brand-100">
                            <FaFileAudio className="text-4xl" />
                        </div>
                        <p className="text-xl font-semibold text-slate-900">{file.name}</p>
                        <p className="text-sm text-slate-500 mt-2 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button
                            onClick={(e) => { e.stopPropagation(); setFile(null); setResult(null); }}
                            className="mt-6 text-sm text-rose-600 hover:text-rose-700 font-semibold px-4 py-2 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
                        >
                            Remove Recording
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <FaCloudUploadAlt className="text-6xl text-slate-400" />
                        </div>
                        <p className="text-2xl font-semibold text-slate-800">Drag & drop clinical voice file here</p>
                        <p className="text-base text-slate-500 mt-2">or click to browse from your computer</p>
                        <div className="mt-8 px-6 py-3 bg-white border border-slate-200 rounded-xl shadow-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
                            Select Audio (.wav)
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm font-medium flex items-center">
                    <FaExclamationTriangle className="mr-3 text-lg" />
                    {error}
                </div>
            )}

            {file && !result && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={analyzeVoice}
                        disabled={loading}
                        className={`px-10 py-4 rounded-xl text-white font-semibold shadow-md flex items-center transition-all text-lg
              ${loading ? 'bg-brand-400 cursor-not-allowed shadow-none' : 'bg-brand-600 hover:bg-brand-700 hover:shadow-lg hover:-translate-y-0.5'}`}
                    >
                        {loading ? (
                            <><FaSpinner className="animate-spin mr-3 text-xl" /> Processing Audio Features...</>
                        ) : (
                            'Run AI Diagnostics'
                        )}
                    </button>
                </div>
            )}

            {result && (
                <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden mt-8 animate-fade-in">
                    <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h2 className="text-xl font-bold text-slate-900">Diagnostic Results</h2>
                        <button
                            onClick={downloadReport}
                            className="flex items-center text-sm font-semibold text-brand-700 hover:text-brand-800 bg-white border border-brand-200 shadow-sm hover:shadow hover:bg-brand-50 px-5 py-2.5 rounded-xl transition-all"
                        >
                            <FaDownload className="mr-2" /> Download Clinical Report
                        </button>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-8">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Automated Consensus</p>
                                <p className="text-3xl font-bold text-slate-900">{result.prediction}</p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Stratification Level</p>
                                <span className={`px-5 py-2 rounded-full text-sm font-bold border ${getRiskColor(result.risk_level)} shadow-sm`}>
                                    {result.risk_level.toUpperCase()} RISK
                                </span>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-3">
                                    <span className="font-semibold text-slate-700">Algorithmic Confidence</span>
                                    <span className="font-bold text-slate-900 text-base">{result.confidence}</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-4 shadow-inner">
                                    <div
                                        className={`h-4 rounded-full transition-all duration-1000 ease-out ${result.probability > 0.5 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                        style={{ width: `${result.probability * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="h-64 flex flex-col items-center justify-center border-l-0 md:border-l border-slate-100 pl-0 md:pl-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => `${value.toFixed(1)}%`}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="text-center text-sm font-semibold text-slate-500 mt-4 uppercase tracking-wider">Probability Distribution</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

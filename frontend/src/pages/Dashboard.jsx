import { FaUsers, FaCheckCircle, FaExclamationTriangle, FaServer } from 'react-icons/fa';

export default function Dashboard() {
    const stats = [
        { name: 'Total Analyses', value: '1,284', icon: FaUsers, color: 'text-blue-500', bg: 'bg-blue-100' },
        { name: 'High Risk Detected', value: '342', icon: FaExclamationTriangle, color: 'text-rose-500', bg: 'bg-rose-100' },
        { name: 'Model Accuracy', value: '94.8%', icon: FaCheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-100' },
        { name: 'System Status', value: 'Online', icon: FaServer, color: 'text-brand-500', bg: 'bg-brand-100' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Overview</h1>
                <p className="mt-2 text-slate-500 text-lg">
                    Real-time metrics for the Parkinson's Voice Detection AI.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-2xl border border-slate-200 transition-all hover:shadow-md hover:-translate-y-1">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className={`p-4 rounded-xl ${item.bg}`}>
                                        <item.icon className={`h-7 w-7 ${item.color}`} aria-hidden="true" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-slate-500 truncate">{item.name}</dt>
                                        <dd>
                                            <div className="text-3xl font-bold text-slate-900 mt-1">{item.value}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-lg leading-6 font-semibold text-slate-900">Recent Automated Screenings</h3>
                </div>
                <div className="divide-y divide-slate-100">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors">
                                    PT
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-semibold text-slate-900">Patient #{1000 + i * 17}</p>
                                    <p className="text-sm text-slate-500">Voice acoustic analysis completed</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full mr-4 ${i % 3 === 0 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                    {i % 3 === 0 ? 'High Risk' : 'Low Risk'}
                                </span>
                                <div className="text-sm text-slate-400 font-medium">
                                    {i * 2} hours ago
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

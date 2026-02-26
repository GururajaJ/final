import { Link, useLocation } from 'react-router-dom';
import { FaStethoscope, FaChartBar, FaMicrophone, FaInfoCircle, FaUserMd } from 'react-icons/fa';
import clsx from 'clsx';

export default function Navbar() {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: FaStethoscope },
        { name: 'Voice Analysis', path: '/predict', icon: FaMicrophone },
        { name: 'Model Stats', path: '/analysis', icon: FaChartBar },
        { name: 'AI Consultation', path: '/consult', icon: FaUserMd },
        { name: 'About', path: '/about', icon: FaInfoCircle },
    ];

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                                <FaStethoscope className="text-white text-lg" />
                            </div>
                            <span className="font-bold text-xl text-slate-800 tracking-tight">
                                Neuro<span className="text-brand-600">Voice</span> AI
                            </span>
                        </div>
                        <div className="ml-10 flex space-x-8">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={clsx(
                                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors',
                                            isActive
                                                ? 'border-brand-500 text-brand-600'
                                                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                                        )}
                                    >
                                        <item.icon className={clsx('mr-2', isActive ? 'text-brand-500' : 'text-slate-400')} />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center space-x-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">System Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

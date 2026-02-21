import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import Analysis from './pages/Analysis';
import About from './pages/About';

function App() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/predict" element={<Prediction />} />
                    <Route path="/analysis" element={<Analysis />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;

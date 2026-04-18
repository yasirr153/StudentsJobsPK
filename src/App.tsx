import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import AdminPanel from './pages/AdminPanel';
import CareerTools from './pages/CareerTools';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/internships" element={<JobsPage />} />
            <Route path="/scholarships" element={<JobsPage />} />
            <Route path="/remote-jobs" element={<JobsPage />} />
            <Route path="/fresh-graduate-jobs" element={<JobsPage />} />
            <Route path="/job/:id" element={<JobDetailPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/tools" element={<CareerTools />} />
            <Route path="/login" element={<div className="pt-32 p-10 text-center">Login Page coming soon!</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

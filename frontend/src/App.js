import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TripPlanner from './pages/TripPlanner';
import ExpenseTracker from './pages/ExpenseTracker';
import TravelPackages from './pages/TravelPackages';
import AdminDashboard from './pages/AdminDashboard';
import GuideDashboard from './pages/GuideDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="app">
        {user && <Navbar />}
        <div className="layout-body">
          {user && <Sidebar />}
          <main className={user ? 'main-content' : 'full-content'}>
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
              
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/trips" element={<ProtectedRoute roles={['ROLE_TRAVELER']}><TripPlanner /></ProtectedRoute>} />
              <Route path="/expenses" element={<ProtectedRoute roles={['ROLE_TRAVELER']}><ExpenseTracker /></ProtectedRoute>} />
              <Route path="/packages" element={<ProtectedRoute><TravelPackages /></ProtectedRoute>} />
              <Route path="/guide" element={<ProtectedRoute roles={['ROLE_GUIDE']}><GuideDashboard /></ProtectedRoute>} />
              
              <Route path="/admin" element={<ProtectedRoute roles={['ROLE_ADMIN']}><AdminDashboard /></ProtectedRoute>} />
              
              <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

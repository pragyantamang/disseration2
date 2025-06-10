import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Stethoscope, MessageCircle, User as UserIcon, Building2, LogOut, Home, Calendar, Shield } from 'lucide-react';
import { Chatbot } from './components/Chatbot';
import { AuthModal } from './components/AuthModal';
import { DiseaseCategories } from './components/DiseaseCategories';
import { DoctorsList } from './components/DoctorsList';
import { AdminDashboard } from './components/AdminDashboard';
import { User, LoginFormData, RegisterFormData } from './types';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    // TODO: Implement actual login logic
    console.log('Login:', data);
    
    // Simulate different user roles based on email
    let role: 'patient' | 'doctor' | 'admin' = 'patient';
    let name = 'John Doe';
    
    if (data.email.includes('admin')) {
      role = 'admin';
      name = 'Admin User';
    } else if (data.email.includes('doctor') || data.email.includes('dr.')) {
      role = 'doctor';
      name = 'Dr. Sarah Johnson';
    }
    
    setCurrentUser({
      id: '1',
      name: name,
      email: data.email,
      role: role,
      status: 'active',
      createdAt: new Date(),
      lastLogin: new Date()
    });
    setIsAuthModalOpen(false);
    
    // Only show chatbot for patients and doctors, not admin
    if (role !== 'admin') {
      setShowChatbot(true);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    // TODO: Implement actual registration logic
    console.log('Register:', data);
    
    setCurrentUser({
      id: '1',
      name: data.name,
      email: data.email,
      role: data.role,
      status: 'active',
      createdAt: new Date(),
      lastLogin: new Date()
    });
    setIsAuthModalOpen(false);
    
    // Only show chatbot for patients and doctors, not admin
    if (data.role !== 'admin') {
      setShowChatbot(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowChatbot(false);
  };

  const NavLink = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isActive 
            ? 'bg-blue-100 text-blue-700' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span>{children}</span>
      </Link>
    );
  };

  const UserDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Horizontal Navigation */}
      <div className="bg-white shadow-sm border-b fixed top-16 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 h-12">
            <NavLink to="/" icon={Home}>Home</NavLink>
            <NavLink to="/profile" icon={UserIcon}>Profile</NavLink>
            <NavLink to="/appointments" icon={Calendar}>Appointments</NavLink>
            <NavLink to="/chat" icon={MessageCircle}>Chat</NavLink>
            <NavLink to="/doctors" icon={Stethoscope}>Doctors</NavLink>
            <NavLink to="/hospitals" icon={Building2}>Hospitals</NavLink>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<DiseaseCategories />} />
            <Route path="/doctors/:diseaseId" element={<DoctorsList />} />
            <Route path="/profile" element={
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-lg">{currentUser?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-lg">{currentUser?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <p className="mt-1 text-lg capitalize">{currentUser?.role}</p>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>

      {/* Chatbot */}
      {showChatbot && <Chatbot />}
    </div>
  );

  // Admin Dashboard Route
  if (currentUser?.role === 'admin') {
    return (
      <Router>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-red-600" />
                <span className="text-xl font-semibold text-gray-900">Admin Panel</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-gray-700">{currentUser.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </nav>
          </header>
          
          <div className="pt-16">
            <AdminDashboard currentUser={currentUser} />
          </div>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">HealthCare Portal</span>
            </div>
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentUser.role === 'admin' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {currentUser.role === 'admin' ? (
                      <Shield className="w-4 h-4 text-red-600" />
                    ) : (
                      <UserIcon className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <span className="text-gray-700">{currentUser.name}</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    currentUser.role === 'admin' ? 'bg-red-100 text-red-800' :
                    currentUser.role === 'doctor' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </button>
            )}
          </nav>
        </header>

        <div className="min-h-screen">
          <Routes>
            <Route
              path="/*"
              element={
                currentUser ? (
                  <UserDashboard />
                ) : (
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Your Health, Our Priority
                      </h1>
                      <p className="text-xl text-gray-600 mb-8">
                        Connect with expert doctors and manage your chronic conditions effectively
                      </p>
                      <button
                        onClick={() => setIsAuthModalOpen(true)}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
                      >
                        <Stethoscope className="w-5 h-5 mr-2" />
                        Get Started
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                          <h2 className="text-xl font-semibold text-gray-900 mb-4">24/7 Support</h2>
                          <p className="text-gray-600">Get immediate assistance from our healthcare professionals</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                          <h2 className="text-xl font-semibold text-gray-900 mb-4">Expert Doctors</h2>
                          <p className="text-gray-600">Connect with specialized doctors for your specific condition</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                          <h2 className="text-xl font-semibold text-gray-900 mb-4">Easy Appointments</h2>
                          <p className="text-gray-600">Book and manage your appointments hassle-free</p>
                        </div>
                      </div>
                    </div>
                  </main>
                )
              }
            />
          </Routes>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      </div>
    </Router>
  );
}

export default App;
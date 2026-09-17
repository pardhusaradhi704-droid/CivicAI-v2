import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './LanguageContext';
import { Header } from './components/common/Header';
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { CitizenDashboard } from './components/citizen/CitizenDashboard';
import { OfficialDashboard } from './components/official/OfficialDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { CivicBotChat } from './components/ai/CivicBotChat';
import { User, UserRole, Complaint } from './types';
import { users } from './server/db';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(users[0]); // Default Rajesh (Citizen)
  const [viewState, setViewState] = useState<'app' | 'login' | 'signup'>('app');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isCivicBotOpen, setIsCivicBotOpen] = useState<boolean>(false);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(2);

  const fetchComplaints = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/complaints?role=${currentUser.role}&userId=${currentUser.id}`);
      const data = await res.json();
      setComplaints(data.complaints || []);
    } catch (err) {
      console.error('Error fetching complaints:', err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchComplaints();
    }
  }, [currentUser]);

  const handleSwitchRole = (role: UserRole) => {
    const targetUser = users.find((u) => u.role === role) || users[0];
    setCurrentUser(targetUser);
    setViewState('app');

    if (role === 'citizen') setActiveTab('dashboard');
    else if (role === 'official') setActiveTab('assigned');
    else if (role === 'admin') setActiveTab('overview');
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setViewState('app');
    if (user.role === 'citizen') setActiveTab('dashboard');
    else if (user.role === 'official') setActiveTab('assigned');
    else if (user.role === 'admin') setActiveTab('overview');
  };

  const handleSignupSuccess = (user: User) => {
    setCurrentUser(user);
    setViewState('app');
    if (user.role === 'citizen') setActiveTab('dashboard');
    else if (user.role === 'official') setActiveTab('assigned');
    else if (user.role === 'admin') setActiveTab('overview');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setViewState('login');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased selection:bg-emerald-500 selection:text-slate-950">
        {/* Quick Demo Role Switcher Top Alert Bar */}
        <RoleSwitcherBar currentRole={currentUser?.role || 'citizen'} onSelectRole={handleSwitchRole} />

        {/* Main Sticky Header */}
        <Header
          currentUser={currentUser}
          onSelectRole={handleSwitchRole}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unreadNotifications={unreadNotifications}
          onOpenLogin={() => setViewState('login')}
          onOpenSignup={() => setViewState('signup')}
          onLogout={handleLogout}
        />

        {/* Main Body View */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {viewState === 'login' && (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onNavigateToSignup={() => setViewState('signup')}
            />
          )}

          {viewState === 'signup' && (
            <SignupPage
              onSignupSuccess={handleSignupSuccess}
              onNavigateToLogin={() => setViewState('login')}
            />
          )}

          {viewState === 'app' && currentUser && (
            <>
              {currentUser.role === 'citizen' && (
                <CitizenDashboard
                  currentUser={currentUser}
                  complaints={complaints}
                  onRefreshComplaints={fetchComplaints}
                  onOpenCivicBot={() => setIsCivicBotOpen(true)}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              )}

              {currentUser.role === 'official' && (
                <OfficialDashboard
                  currentUser={currentUser}
                  complaints={complaints}
                  onRefreshComplaints={fetchComplaints}
                />
              )}

              {currentUser.role === 'admin' && <AdminDashboard currentUser={currentUser} />}
            </>
          )}

          {viewState === 'app' && !currentUser && (
            <div className="text-center py-20 space-y-4">
              <h2 className="text-2xl font-bold text-slate-200">Please Sign In to Access CivicAI</h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Sign in as a Citizen to report grievances, or as a Government Official to respond and resolve issues.
              </p>
              <div className="flex items-center justify-center space-x-3 pt-2">
                <button
                  onClick={() => setViewState('login')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition"
                >
                  Sign In Now
                </button>
                <button
                  onClick={() => setViewState('signup')}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm transition"
                >
                  Register Account
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Floating CivicBot Assistant Launcher Button */}
        {!isCivicBotOpen && currentUser && (
          <button
            onClick={() => setIsCivicBotOpen(true)}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white shadow-2xl transition transform hover:scale-105 active:scale-95 flex items-center space-x-2 border border-emerald-400/30"
          >
            <Sparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-tight hidden sm:inline">
              CivicBot AI
            </span>
          </button>
        )}

        {/* Floating AI Chat Drawer */}
        <CivicBotChat
          isOpen={isCivicBotOpen}
          onClose={() => setIsCivicBotOpen(false)}
          complaints={complaints}
        />

        {/* Minimal Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
            <p>© 2026 CivicAI National Citizen Grievance Redressal Platform. Powered by Gemini AI.</p>
            <div className="flex items-center space-x-4">
              <span className="text-emerald-400 font-bold">100% Verified SLA System</span>
              <span>•</span>
              <span>ISO 27001 Certified</span>
            </div>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
}

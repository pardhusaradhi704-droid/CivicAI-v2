import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { CitizenDashboard } from './components/citizen/CitizenDashboard';
import { OfficialDashboard } from './components/official/OfficialDashboard';
import { AdminDashboard } from './AdminDashboard';
import { CivicBotChat } from './CivicBotChat';
import { User, UserRole, Complaint } from './types';
import { users } from './db';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(users[0] || null);
  const [viewState, setViewState] = useState<'app' | 'login' | 'signup'>('app');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isCivicBotOpen, setIsCivicBotOpen] = useState<boolean>(false);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(4);

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
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      {/* Top Role Switcher Bar */}
      <RoleSwitcherBar currentRole={currentUser?.role || 'citizen'} onSelectRole={handleSwitchRole} />

      {/* Main CivicConnect Navigation Header */}
      <Header
        currentUser={currentUser}
        onSelectRole={handleSwitchRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadNotifications={unreadNotifications}
        onOpenLogin={() => setViewState('login')}
        onOpenSignup={() => setViewState('signup')}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Main Body View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentUser?.role === 'citizen' && (
          <CitizenDashboard
            currentUser={currentUser}
            complaints={complaints}
            onRefreshComplaints={fetchComplaints}
            onOpenCivicBot={() => setIsCivicBotOpen(true)}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        )}

        {currentUser?.role === 'official' && (
          <OfficialDashboard
            currentUser={currentUser}
            complaints={complaints}
            onRefreshComplaints={fetchComplaints}
          />
        )}

        {currentUser?.role === 'admin' && <AdminDashboard currentUser={currentUser} />}
      </main>

      {/* Floating CivicBot Assistant Button */}
      {!isCivicBotOpen && (
        <button
          onClick={() => setIsCivicBotOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl transition flex items-center space-x-2 border border-blue-400/30"
        >
          <Sparkles className="w-5 h-5 text-blue-300 animate-pulse" />
          <span className="text-xs font-bold font-mono">CivicAssist Bot</span>
        </button>
      )}

      {/* AI Chat Drawer */}
      <CivicBotChat
        isOpen={isCivicBotOpen}
        onClose={() => setIsCivicBotOpen(false)}
        complaints={complaints}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { CitizenDashboard } from './components/citizen/CitizenDashboard';
import { CivicBotChat } from './CivicBotChat';
import { User, UserRole, Complaint } from './types';
import { users } from './db';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(users[0] || null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isCivicBotOpen, setIsCivicBotOpen] = useState<boolean>(false);

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
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      <header className="border-b border-slate-800 bg-slate-900/50 p-4 flex justify-between items-center max-w-7xl w-full mx-auto px-4">
        <h1 className="text-xl font-bold text-emerald-400">CivicAI Platform</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => handleSwitchRole('citizen')}
            className={`px-3 py-1 text-xs rounded-lg ${currentUser?.role === 'citizen' ? 'bg-emerald-600' : 'bg-slate-800'}`}
          >
            Citizen
          </button>
          <button 
            onClick={() => handleSwitchRole('admin')}
            className={`px-3 py-1 text-xs rounded-lg ${currentUser?.role === 'admin' ? 'bg-emerald-600' : 'bg-slate-800'}`}
          >
            Admin
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {currentUser?.role === 'admin' ? (
          <AdminDashboard currentUser={currentUser} />
        ) : (
          <CitizenDashboard 
            currentUser={currentUser} 
            complaints={complaints} 
            onRefreshComplaints={fetchComplaints} 
          />
        )}
      </main>

      {!isCivicBotOpen && (
        <button
          onClick={() => setIsCivicBotOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition flex items-center space-x-2"
        >
          <Sparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
          <span className="text-xs font-bold">CivicBot AI</span>
        </button>
      )}

      <CivicBotChat
        isOpen={isCivicBotOpen}
        onClose={() => setIsCivicBotOpen(false)}
        complaints={complaints}
      />
    </div>
  );
}

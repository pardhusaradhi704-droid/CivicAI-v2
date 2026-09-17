import React, { useState, useEffect } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { CivicBotChat } from './CivicBotChat';
import { User, UserRole, Complaint } from './types';
import { users } from './db';
import { 
  Building2, 
  Bot, 
  PlusCircle, 
  Bell, 
  User as UserIcon, 
  LogOut, 
  Search, 
  Sparkles, 
  Layers, 
  Clock, 
  CheckCircle2, 
  ShieldAlert,
  Send
} from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(users[0] || null);
  const [activeTab, setActiveTab] = useState<'my' | 'community' | 'police'>('my');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isCivicBotOpen, setIsCivicBotOpen] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Complaint form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Water & Sanitation');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    
    // Add temporary local complaint
    const newComplaint: Complaint = {
      id: `CIV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      category,
      description,
      location: location || 'North District - Zone 4',
      status: 'In Progress',
      urgency: 'Medium',
      createdAt: new Date().toISOString(),
      userId: currentUser?.id || '1',
    };

    setComplaints([newComplaint, ...complaints]);
    setTitle('');
    setDescription('');
    setLocation('');
    setShowReportModal(false);
  };

  return (
    <div className="min-h-screen bg-[#070c14] text-slate-100 font-sans flex flex-col antialiased">
      {/* Top Header Bar */}
      <header className="border-b border-slate-800/80 bg-[#0b1322] px-6 py-3.5 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-white">CivicConnect</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-950 text-blue-400 border border-blue-800/50">GovPortal</span>
            </div>
            <p className="text-xs text-slate-400">Citizen & Officer Problem Resolution Platform</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsCivicBotOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-medium text-slate-300 transition"
          >
            <Bot className="w-4 h-4 text-blue-400" />
            <span>CivicAssist Bot</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </button>

          <button 
            onClick={() => setShowReportModal(true)}
            className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Problem</span>
          </button>

          <div className="h-6 w-px bg-slate-800"></div>

          <div className="relative">
            <button className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/50 transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center">4</span>
            </button>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/50 border border-slate-800 px-3 py-1.5 rounded-xl">
            <UserIcon className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-200">{currentUser?.name || 'Sarah Jenkins'}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">{currentUser?.role || 'Citizen'} Mode</div>
            </div>
            <button 
              onClick={() => handleSwitchRole(currentUser?.role === 'admin' ? 'citizen' : 'admin')} 
              title="Switch Mode" 
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 space-y-6">
        {currentUser?.role === 'admin' ? (
          <AdminDashboard currentUser={currentUser} />
        ) : (
          <>
            {/* Citizen Portal Banner */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden flex justify-between items-center">
              <div className="space-y-2 max-w-xl z-10">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">CITIZEN PORTAL</span>
                  <span className="text-xs text-slate-400 font-mono">North District - Zone 4</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white">Welcome, {currentUser?.name || 'Sarah Jenkins'}</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Post civic or police issues, receive real-time SMS/email alerts, and track officer progress live.
                </p>
              </div>

              <button 
                onClick={() => setShowReportModal(true)}
                className="z-10 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-500/20 transition flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Report a Civic / Police Issue</span>
              </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                  <span>MY FILED COMPLAINTS</span>
                </div>
                <div className="text-2xl font-black text-white">{complaints.length || 2}</div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 flex items-center space-x-2">
                  <span>IN ACTIVE REVIEW / REPAIR</span>
                </div>
                <div className="text-2xl font-black text-blue-400">1</div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
                  <span>RESOLVED ISSUES</span>
                </div>
                <div className="text-2xl font-black text-emerald-400">0</div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-red-400 flex items-center space-x-2">
                  <span>DIRECT POLICE COMPLAINTS</span>
                </div>
                <div className="text-2xl font-black text-red-400">0</div>
              </div>
            </div>

            {/* Main Tabs and Search Filter */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60 pb-3">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setActiveTab('my')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${activeTab === 'my' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800/50 text-slate-400 hover:text-white'}`}
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>My Reported Problems ({complaints.length || 2})</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('community')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${activeTab === 'community' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800/50 text-slate-400 hover:text-white'}`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>All Community Issues (4)</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('police')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${activeTab === 'police' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800/50 text-slate-400 hover:text-white'}`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    <span>Direct Police Complaints</span>
                  </button>
                </div>

                <select className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-medium focus:outline-none">
                  <option>All Status Pipeline Stages</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search problems by ticket number, keyword, location..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Complaints List Cards */}
              <div className="space-y-4 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-700/80 transition">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 font-mono text-xs">
                      <span className="px-2.5 py-1 bg-blue-950 text-blue-400 rounded-lg border border-blue-800/40 font-bold">#CIV-2026-8941</span>
                      <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg">Water & Sanitation</span>
                      <span className="px-2.5 py-1 bg-red-950/60 text-red-400 rounded-lg border border-red-800/40 font-semibold">Critical Urgency</span>
                    </div>

                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
                      IN PROGRESS
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">Major Water Pipe Rupture & Flooding on Maple Street</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      A 12-inch main water pipe ruptured near house #42. Potable water is flooding the roadway, affecting water supply for over 60 households in Sector 4 and causing road erosion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Submit Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Report a Civic / Police Issue</h3>
              <button onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Issue Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="e.g. Broken Street Light on Main Road" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>Water & Sanitation</option>
                    <option>Roads & Traffic</option>
                    <option>Street Lighting</option>
                    <option>Public Safety / Police</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Location</label>
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    placeholder="Sector / Zone" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
                <textarea 
                  rows={3} 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Provide full issue details..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  required 
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowReportModal(false)} 
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating CivicBot Assistant Button */}
      {!isCivicBotOpen && (
        <button
          onClick={() => setIsCivicBotOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl transition flex items-center space-x-2 border border-blue-400/30"
        >
          <Sparkles className="w-5 h-5 text-blue-300 animate-pulse" />
          <span className="text-xs font-bold font-mono">CivicBot AI</span>
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

import React, { useState, useEffect } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { CivicBotChat } from './CivicBotChat';
import { User, UserRole, Complaint } from './types';
import { users } from './db';
import { Sparkles, Send } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(users[0] || null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isCivicBotOpen, setIsCivicBotOpen] = useState<boolean>(false);
  
  // Complaint form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sanitation');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    setSubmitted(true);
    setTimeout(() => {
      setTitle('');
      setDescription('');
      setLocation('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {currentUser?.role === 'admin' ? (
          <AdminDashboard currentUser={currentUser} />
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Submit a Grievance</h2>
              <p className="text-slate-400 text-sm">Report civic issues directly to municipal authorities.</p>
            </div>

            {submitted && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm">
                ✓ Grievance submitted successfully!
              </div>
            )}

            <form onSubmit={handleSubmitComplaint} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Issue Title</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Pothole on Main Street"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option>Sanitation</option>
                    <option>Roads & Traffic</option>
                    <option>Water Leakage</option>
                    <option>Street Lighting</option>
                    <option>Electricity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Location</label>
                  <input 
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter locality / landmark"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
                <textarea 
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide complete details about the issue..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center space-x-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Submit Grievance</span>
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Floating CivicBot Button */}
      {!isCivicBotOpen && (
        <button
          onClick={() => setIsCivicBotOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition flex items-center space-x-2"
        >
          <Sparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
          <span className="text-xs font-bold">CivicBot AI</span>
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

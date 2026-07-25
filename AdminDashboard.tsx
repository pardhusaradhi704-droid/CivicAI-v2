import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  Building2,
  Activity,
  UserCheck,
  Ban,
  FileText,
  BarChart2,
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  Clock,
  Layers,
  Search,
} from 'lucide-react';
import { AnalyticsSummary, User, AuditLog } from '../../types';

interface AdminDashboardProps {
  currentUser: User;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'officials' | 'audit'>('analytics');
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [userList, setUserList] = useState<User[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [anRes, usrRes, logRes] = await Promise.all([
        fetch('/api/analytics'),
        fetch('/api/admin/users'),
        fetch('/api/admin/audit-logs'),
      ]);

      const anData = await anRes.json();
      const usrData = await usrRes.json();
      const logData = await logRes.json();

      setAnalytics(anData.analytics);
      setUserList(usrData.users);
      setAuditLogs(logData.logs);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleVerifyOfficial = async (userId: string) => {
    try {
      await fetch(`/api/admin/users/${userId}/verify`, { method: 'PATCH' });
      fetchAdminData();
    } catch (err) {
      console.error('Error verifying official:', err);
    }
  };

  const handleToggleBlock = async (userId: string) => {
    try {
      await fetch(`/api/admin/users/${userId}/block`, { method: 'PATCH' });
      fetchAdminData();
    } catch (err) {
      console.error('Error toggling block:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
              Administrator Master Console
            </span>
            <span className="text-xs text-slate-400">Chief Officer {currentUser.name}</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">City-Wide Grievance Governance</h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time analytics, official verification, duplicate cluster tracking, and immutable audit logs.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'analytics' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            City Analytics
          </button>
          <button
            onClick={() => setActiveTab('officials')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'officials' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            User & Official Control
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'audit' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Audit Trail
          </button>
        </div>
      </div>

      {/* Analytics Tab */}
      {activeTab === 'analytics' && analytics && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Grievances</span>
              <p className="text-2xl font-black text-white mt-1">{analytics.totalComplaints}</p>
              <p className="text-[10px] text-emerald-400 mt-0.5">+14% vs last week</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-emerald-400 font-bold uppercase">Resolution Rate</span>
              <p className="text-2xl font-black text-emerald-400 mt-1">
                {Math.round((analytics.resolvedCount / (analytics.totalComplaints || 1)) * 100)}%
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">{analytics.resolvedCount} Resolved</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-amber-400 font-bold uppercase">Citizen Satisfaction</span>
              <p className="text-2xl font-black text-amber-300 mt-1">{analytics.citizenSatisfactionRate}%</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Based on verified ratings</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-blue-400 font-bold uppercase">Avg Resolution SLA</span>
              <p className="text-2xl font-black text-blue-300 mt-1">{analytics.avgResolutionTimeHours}h</p>
              <p className="text-[10px] text-emerald-400 mt-0.5">Target &lt;36h</p>
            </div>
          </div>

          {/* Category Breakdown Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
                <BarChart2 className="w-4 h-4 mr-2 text-purple-400" />
                Category Distribution
              </h3>

              <div className="space-y-3">
                {Object.entries(analytics.categoryBreakdown).map(([cat, count]) => {
                  const numCount = Number(count);
                  const pct = Math.round((numCount / (analytics.totalComplaints || 1)) * 100) || 20;
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300 font-medium">
                        <span>{cat}</span>
                        <span>
                          {numCount} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
                <Activity className="w-4 h-4 mr-2 text-emerald-400" />
                Municipal Ward Resolution Ranking
              </h3>

              <div className="space-y-3">
                {Object.entries(analytics.wardBreakdown).map(([ward, count]) => (
                  <div
                    key={ward}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <span className="font-bold text-white">{ward}</span>
                    <span className="text-emerald-400 font-bold">{count} Active Tickets</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User & Official Verification Tab */}
      {activeTab === 'officials' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
            <Users className="w-4 h-4 mr-2 text-purple-400" />
            User & Official Governance Center
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono">
                <tr>
                  <th className="p-3">User / Official</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Department / Role</th>
                  <th className="p-3">Verification</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {userList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-950/50">
                    <td className="p-3 font-bold text-white">{u.name}</td>
                    <td className="p-3 uppercase font-semibold text-slate-300">{u.role}</td>
                    <td className="p-3 text-slate-400">{u.departmentName || u.designation || 'N/A'}</td>
                    <td className="p-3">
                      {u.verified ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          Verified
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                          Pending Admin Verification
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      {!u.verified && u.role === 'official' && (
                        <button
                          onClick={() => handleVerifyOfficial(u.id)}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]"
                        >
                          Verify Official
                        </button>
                      )}
                      <button
                        onClick={() => handleToggleBlock(u.id)}
                        className={`px-2.5 py-1 rounded font-bold text-[10px] ${
                          u.blocked
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600/20 text-rose-300 border border-rose-500/30 hover:bg-rose-600 hover:text-white'
                        }`}
                      >
                        {u.blocked ? 'Unblock' : 'Block User'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Audit Trail Tab */}
      {activeTab === 'audit' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
            <FileText className="w-4 h-4 mr-2 text-emerald-400" />
            System Audit Log Stream
          </h3>

          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-emerald-400 text-[11px]">{log.action}</span>
                    <span className="text-[10px] text-slate-500">Target: {log.target}</span>
                  </div>
                  <p className="text-slate-300 mt-0.5">{log.details}</p>
                </div>
                <div className="text-right text-[10px] text-slate-400">
                  <p className="font-bold text-slate-200">{log.performedBy}</p>
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

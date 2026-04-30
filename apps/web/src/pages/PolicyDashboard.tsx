import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  ShieldCheck, 
  AlertTriangle, 
  FileCode, 
  Activity, 
  Layers,
  Database,
  Globe,
  Zap,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const complianceData = [
  { month: 'Jan', score: 82, violations: 45 },
  { month: 'Feb', score: 85, violations: 38 },
  { month: 'Mar', score: 88, violations: 32 },
  { month: 'Apr', score: 84, violations: 41 },
  { month: 'May', score: 92, violations: 15 },
  { month: 'Jun', score: 95, violations: 8 },
  { month: 'Jul', score: 98, violations: 4 },
];

const KPI_CARDS = [
  { title: 'Total Policies', value: '4,284', trend: '+12% Quarter', color: 'emerald', icon: FileCode },
  { title: 'Compliance Score', value: '98.2%', trend: 'Goal: 100%', color: 'emerald', icon: ShieldCheck },
  { title: 'Active Violations', value: '12', trend: '-85% vs Last Month', color: 'rose', icon: AlertTriangle },
  { title: 'Evaluation Rate', value: '14k/m', trend: 'Avg 45ms latency', color: 'teal', icon: Zap },
];

const PolicyDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Policy Governance Intelligence</h1>
          <p className="text-slate-400">Modular policy-as-code library for infrastructure, security, and compliance.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Export Audit Report
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Author New Policy
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium text-slate-400`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Trend */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Library Compliance Trajectory</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={complianceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="score" stroke="#10b981" fill="url(#colorScore)" name="Compliance Score (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Framework Mapping */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Framework Coverage</h3>
          <div className="flex-1 space-y-6">
            {[
              { name: 'NIST 800-53', coverage: 94, policies: 1240, color: 'bg-emerald-500' },
              { name: 'CIS Benchmarks', coverage: 98, policies: 850, color: 'bg-teal-500' },
              { name: 'PCI-DSS v4.0', coverage: 82, policies: 450, color: 'bg-blue-500' },
              { name: 'ISO 27001', coverage: 75, policies: 320, color: 'bg-indigo-500' },
              { name: 'SOC2 Type II', coverage: 91, policies: 612, color: 'bg-slate-500' },
            ].map((fw) => (
              <div key={fw.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{fw.name}</span>
                  <span className="text-slate-400">{fw.policies} Policies</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${fw.color}`} style={{ width: `${fw.coverage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Violations Feed */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Critical Policy Violations</h3>
          <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">View All Issues</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Policy Name</th>
                <th className="px-6 py-4 font-semibold">Domain</th>
                <th className="px-6 py-4 font-semibold">Framework</th>
                <th className="px-6 py-4 font-semibold">Enforcement</th>
                <th className="px-6 py-4 font-semibold">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { name: 'S3-Bucket-Public-Access-Blocked', domain: 'CLOUD', framework: 'CIS-1.2', mode: 'PREVENTIVE', severity: 'CRITICAL' },
                { name: 'K8s-No-Privileged-Containers', domain: 'KUBERNETES', framework: 'NIST-AC-2', mode: 'PREVENTIVE', severity: 'HIGH' },
                { name: 'EC2-Security-Group-SSH-Open', domain: 'CLOUD', framework: 'ISO-A.12', mode: 'DETECTIVE', severity: 'CRITICAL' },
                { name: 'IAM-MFA-Enforced-For-Admins', domain: 'SECURITY', framework: 'PCI-8.2', mode: 'PREVENTIVE', severity: 'HIGH' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`w-4 h-4 ${row.severity === 'CRITICAL' ? 'text-rose-500' : 'text-amber-500'}`} />
                      <span className="text-sm font-medium text-slate-300">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{row.domain}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase bg-slate-800 px-2 py-1 rounded border border-slate-700">{row.framework}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${row.mode === 'PREVENTIVE' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                      <span className="text-xs text-slate-300">{row.mode}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      row.severity === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>{row.severity}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PolicyDashboard;

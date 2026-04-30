import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import PolicyDashboard from './pages/PolicyDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The policy governance engine is currently validating framework mappings. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<PolicyDashboard />} />
          <Route path="/library" element={<Placeholder name="Modular Policy Library Catalog" />} />
          <Route path="/compliance" element={<Placeholder name="Framework Compliance Matrix" />} />
          <Route path="/evaluation" element={<Placeholder name="Real-time Evaluation Engine" />} />
          <Route path="/governance" element={<Placeholder name="Approval & Governance Workflows" />} />
          <Route path="/security" element={<Placeholder name="Enterprise Security Baselines" />} />
          <Route path="/cloud" element={<Placeholder name="Multi-Cloud Governance (AWS/Azure/GCP)" />} />
          <Route path="/kubernetes" element={<Placeholder name="Kubernetes Admission Guardrails" />} />
          <Route path="/cicd" element={<Placeholder name="Pipeline Supply Chain Guardrails" />} />
          <Route path="/settings" element={<Placeholder name="Global Governance Settings" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;

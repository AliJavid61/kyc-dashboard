import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import KYCQueue from './pages/KYCQueue';
import KYCApplications from './pages/KYCApplications';
import DocumentReview from './pages/DocumentReview';
import Withdrawals from './pages/Withdrawals';
import RejectedFollowup from './pages/RejectedFollowup';
import TeamPerformance from './pages/TeamPerformance';
import RiskCompliance from './pages/RiskCompliance';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function AppRoutes() {
  const [user, setUser] = useState(null); // { name, role }

  if (!user) {
    return <Login onLogin={(userData) => setUser(userData)} />;
  }

  return (
    <Layout user={user} onLogout={() => setUser(null)}>
      <Routes>
        <Route path="/"                  element={<Dashboard />} />
        <Route path="/kyc-queue"         element={<KYCQueue />} />
        <Route path="/kyc-applications"  element={<KYCApplications />} />
        <Route path="/documents"         element={<DocumentReview />} />
        <Route path="/withdrawals"       element={<Withdrawals />} />
        <Route path="/rejected"          element={<RejectedFollowup />} />
        <Route path="/team"              element={<TeamPerformance />} />
        <Route path="/risk"              element={<RiskCompliance />} />
        <Route path="/reports"           element={<Reports />} />
        <Route path="/settings"          element={<Settings />} />
        <Route path="*"                  element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

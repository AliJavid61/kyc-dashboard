import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('ali.javid@opofinance.com');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-icon">
            <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div className="login-brand-name">Opofinance</div>
        </div>
        <p className="login-subtitle">KYC Compliance Management Platform</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <div className="form-row">
            <label className="remember-label">
              <input type="checkbox" defaultChecked /> Remember me
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>
          <button type="submit" className="btn-primary">Sign In to Dashboard</button>
        </form>

        <div className="login-hint">
          Demo: <span>ali.javid@opofinance.com</span> &nbsp;/&nbsp; any password
        </div>
      </div>
    </div>
  );
}

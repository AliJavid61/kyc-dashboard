import { useState } from 'react';

const API = 'http://localhost:3001';

function initials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Login({ onLogin }) {
  const [tab, setTab] = useState('signin'); // 'signin' | 'signup'

  // sign-in fields
  const [siEmail, setSiEmail]       = useState('');
  const [siPassword, setSiPassword] = useState('');
  const [siError, setSiError]       = useState('');
  const [siLoading, setSiLoading]   = useState(false);

  // sign-up fields
  const [suName, setSuName]         = useState('');
  const [suEmail, setSuEmail]       = useState('');
  const [suPassword, setSuPassword] = useState('');
  const [suRole, setSuRole]         = useState('analyst');
  const [suMsg, setSuMsg]           = useState('');   // success or error
  const [suSuccess, setSuSuccess]   = useState(false);
  const [suLoading, setSuLoading]   = useState(false);

  async function handleSignIn(e) {
    e.preventDefault();
    setSiError('');
    setSiLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: siEmail, password: siPassword }),
      });
      const json = await res.json();
      if (!json.success) {
        setSiError(json.message);
      } else {
        onLogin(json.data); // { name, role }
      }
    } catch {
      setSiError('Could not reach the server. Please try again.');
    } finally {
      setSiLoading(false);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setSuMsg('');
    setSuSuccess(false);
    setSuLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: suName, email: suEmail, password: suPassword, role: suRole }),
      });
      const json = await res.json();
      if (!json.success) {
        setSuMsg(json.message);
        setSuSuccess(false);
      } else {
        setSuMsg(`Account created for ${json.data.name}. You can now sign in.`);
        setSuSuccess(true);
        setSuName(''); setSuEmail(''); setSuPassword(''); setSuRole('analyst');
      }
    } catch {
      setSuMsg('Could not reach the server. Please try again.');
      setSuSuccess(false);
    } finally {
      setSuLoading(false);
    }
  }

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

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
          {['signin', 'signup'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTab(t); setSiError(''); setSuMsg(''); }}
              style={{
                flex: 1,
                padding: '9px 0',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                transition: 'background 0.2s, color 0.2s',
                background: tab === t ? 'var(--blue)' : 'transparent',
                color: tab === t ? '#fff' : 'var(--muted)',
              }}
            >
              {t === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {tab === 'signin' ? (
          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={siEmail}
                onChange={(e) => setSiEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={siPassword}
                onChange={(e) => setSiPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
            {siError && (
              <div style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 12, padding: '8px 12px', background: 'var(--danger-bg)', borderRadius: 6 }}>
                {siError}
              </div>
            )}
            <div className="form-row">
              <label className="remember-label">
                <input type="checkbox" defaultChecked /> Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>
            <button type="submit" className="btn-primary" disabled={siLoading}>
              {siLoading ? 'Signing in…' : 'Sign In to Dashboard'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={suName}
                onChange={(e) => setSuName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={suEmail}
                onChange={(e) => setSuEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={suPassword}
                onChange={(e) => setSuPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                value={suRole}
                onChange={(e) => setSuRole(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)', fontSize: 14 }}
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="analyst">Analyst</option>
              </select>
            </div>
            {suMsg && (
              <div style={{
                fontSize: 13,
                marginBottom: 12,
                padding: '8px 12px',
                borderRadius: 6,
                background: suSuccess ? 'var(--success-bg)' : 'var(--danger-bg)',
                color: suSuccess ? 'var(--success)' : 'var(--danger)',
              }}>
                {suMsg}
              </div>
            )}
            <button type="submit" className="btn-primary" disabled={suLoading}>
              {suLoading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

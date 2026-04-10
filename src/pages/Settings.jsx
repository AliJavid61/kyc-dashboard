import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

function Toggle({ on, onChange }) {
  return (
    <div className={`toggle-switch${on ? ' on' : ''}`} onClick={onChange}>
      <div className="toggle-knob"></div>
    </div>
  );
}

export default function Settings() {
  const { isLight, toggleTheme } = useTheme();
  const [notifs, setNotifs] = useState({ newKyc: true, riskFlags: true, dailySummary: true, withdrawals: false });
  const [compact, setCompact] = useState(false);

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Settings</h2>
          <p>Platform preferences, account settings, and team configuration</p>
        </div>
      </div>

      {/* Account */}
      <div className="settings-section">
        <div className="settings-head"><h3>Account Information</h3><p>Your personal and role details</p></div>
        <div className="settings-body">
          <div className="setting-row">
            <div><div className="setting-label">Full Name</div><div className="setting-desc">Displayed in reports and team views</div></div>
            <input className="setting-input" type="text" defaultValue="Ali Javid" />
          </div>
          <div className="setting-row">
            <div><div className="setting-label">Email Address</div><div className="setting-desc">Used for login and report delivery</div></div>
            <input className="setting-input" type="email" defaultValue="ali.javid@opofinance.com" />
          </div>
          <div className="setting-row">
            <div><div className="setting-label">Role</div><div className="setting-desc">Your access level in the system</div></div>
            <span className="badge badge-blue">KYC Team Manager</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-section">
        <div className="settings-head"><h3>Notifications</h3><p>Configure when and how you receive alerts</p></div>
        <div className="settings-body">
          <div className="setting-row">
            <div><div className="setting-label">New KYC Submission</div><div className="setting-desc">Notify when a new KYC application arrives</div></div>
            <Toggle on={notifs.newKyc} onChange={() => setNotifs(n => ({...n, newKyc: !n.newKyc}))} />
          </div>
          <div className="setting-row">
            <div><div className="setting-label">Risk Flag Alerts</div><div className="setting-desc">Immediate alerts for critical risk flags</div></div>
            <Toggle on={notifs.riskFlags} onChange={() => setNotifs(n => ({...n, riskFlags: !n.riskFlags}))} />
          </div>
          <div className="setting-row">
            <div><div className="setting-label">Daily Summary Email</div><div className="setting-desc">End-of-day team performance digest</div></div>
            <Toggle on={notifs.dailySummary} onChange={() => setNotifs(n => ({...n, dailySummary: !n.dailySummary}))} />
          </div>
          <div className="setting-row">
            <div><div className="setting-label">Withdrawal Approvals</div><div className="setting-desc">Notify when a withdrawal needs your sign-off</div></div>
            <Toggle on={notifs.withdrawals} onChange={() => setNotifs(n => ({...n, withdrawals: !n.withdrawals}))} />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="settings-section">
        <div className="settings-head"><h3>Appearance</h3><p>Theme and display preferences</p></div>
        <div className="settings-body">
          <div className="setting-row">
            <div><div className="setting-label">Dark Mode</div><div className="setting-desc">Toggle between dark and light themes</div></div>
            <Toggle on={!isLight} onChange={toggleTheme} />
          </div>
          <div className="setting-row">
            <div><div className="setting-label">Compact Tables</div><div className="setting-desc">Reduce row padding for more data per screen</div></div>
            <Toggle on={compact} onChange={() => setCompact(c => !c)} />
          </div>
        </div>
      </div>
    </>
  );
}

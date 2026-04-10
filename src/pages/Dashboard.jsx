export default function Dashboard() {
  return (
    <>
      {/* Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Pending<br/>KYC</div>
            <div className="metric-icon-wrap mi-blue">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">24</div>
          <div className="metric-trend t-red">
            <svg fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="18,15 12,9 6,15"/></svg>
            +6 <span className="trend-vs">vs yesterday</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Approved<br/>Today</div>
            <div className="metric-icon-wrap mi-green">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">31</div>
          <div className="metric-trend t-green">
            <svg fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="18,15 12,9 6,15"/></svg>
            +4 <span className="trend-vs">vs yesterday</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Withdrawals<br/>to Review</div>
            <div className="metric-icon-wrap mi-orange">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">8</div>
          <div className="metric-trend t-green">
            <svg fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="6,9 12,15 18,9"/></svg>
            −4 <span className="trend-vs">vs yesterday</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Rejected<br/>Today</div>
            <div className="metric-icon-wrap mi-red">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">3</div>
          <div className="metric-trend t-muted">
            <svg fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            No change <span className="trend-vs">vs yesterday</span>
          </div>
        </div>
      </div>

      {/* KYC Queue + Team Workload */}
      <div className="grid-2-col">
        <div className="card">
          <div className="card-head">
            <div><div className="card-title">KYC Queue</div><div className="card-subtitle">Active verification requests</div></div>
            <span className="chip chip-blue">24 pending</span>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr><th>Client</th><th>Submitted</th><th>Document</th><th>Assigned To</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><div className="client-cell"><div className="client-ava" style={{background:'linear-gradient(135deg,#4f7cff,#8b5cf6)'}}>EM</div><div><div className="client-name">Elena Marchetti</div><div className="client-id">#KYC-4821</div></div></div></td>
                  <td className="time-cell">2h ago</td><td><span className="doc-chip">Passport</span></td>
                  <td><div className="assigned-wrap"><div className="assigned-dot" style={{background:'#10b981'}}>M</div>Mahoo</div></td>
                  <td><span className="badge badge-orange">Pending</span></td>
                </tr>
                <tr>
                  <td><div className="client-cell"><div className="client-ava" style={{background:'linear-gradient(135deg,#10b981,#3b82f6)'}}>AR</div><div><div className="client-name">Arash Rezaei</div><div className="client-id">#KYC-4820</div></div></div></td>
                  <td className="time-cell">3h ago</td><td><span className="doc-chip">National ID</span></td>
                  <td><div className="assigned-wrap"><div className="assigned-dot" style={{background:'#8b5cf6'}}>S</div>Sevil</div></td>
                  <td><span className="badge badge-blue">In Review</span></td>
                </tr>
                <tr>
                  <td><div className="client-cell"><div className="client-ava" style={{background:'linear-gradient(135deg,#f59e0b,#10b981)'}}>NK</div><div><div className="client-name">Nadia Kovacs</div><div className="client-id">#KYC-4819</div></div></div></td>
                  <td className="time-cell">5h ago</td><td><span className="doc-chip">Driver's License</span></td>
                  <td><div className="assigned-wrap"><div className="assigned-dot" style={{background:'#4f7cff'}}>P</div>Pouya</div></td>
                  <td><span className="badge badge-green">Approved</span></td>
                </tr>
                <tr>
                  <td><div className="client-cell"><div className="client-ava" style={{background:'linear-gradient(135deg,#ef4444,#f59e0b)'}}>JB</div><div><div className="client-name">James Becker</div><div className="client-id">#KYC-4818</div></div></div></td>
                  <td className="time-cell">6h ago</td><td><span className="doc-chip">Passport</span></td>
                  <td><div className="assigned-wrap"><div className="assigned-dot" style={{background:'linear-gradient(135deg,#4f7cff,#8b5cf6)'}}>A</div>Ali Javid</div></td>
                  <td><span className="badge badge-red">Flagged</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div><div className="card-title">Team Workload</div><div className="card-subtitle">Open cases per analyst</div></div>
          </div>
          <div className="team-list">
            {[
              { initials:'AJ', name:'Ali Javid',  role:'Team Manager',  count:28, pct:'88%',  bg:'linear-gradient(135deg,#4f7cff,#8b5cf6)' },
              { initials:'M',  name:'Mahoo',       role:'KYC Analyst',   count:31, pct:'97%',  bg:'#10b981' },
              { initials:'S',  name:'Sevil',       role:'KYC Analyst',   count:29, pct:'91%',  bg:'#8b5cf6' },
              { initials:'P',  name:'Pouya',       role:'KYC Analyst',   count:32, pct:'100%', bg:'#f59e0b' },
            ].map(m => (
              <div className="team-row" key={m.name}>
                <div className="team-row-top">
                  <div className="member-wrap">
                    <div className="avatar avatar-32" style={{background:m.bg}}>{m.initials}</div>
                    <div><div className="member-name">{m.name}</div><div className="member-role">{m.role}</div></div>
                  </div>
                  <div><div className="member-count">{m.count}</div><div className="member-count-label">cases</div></div>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{width:m.pct, background:m.bg}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Withdrawal Review + Risk Flags */}
      <div className="grid-2-col">
        <div className="card">
          <div className="card-head">
            <div><div className="card-title">Withdrawal Review</div><div className="card-subtitle">Awaiting KYC team approval</div></div>
            <span className="chip chip-orange">8 pending</span>
          </div>
          <div className="table-scroll">
            <table>
              <thead><tr><th>Client</th><th>Amount</th><th>Method</th><th>KYC Status</th><th>Action</th></tr></thead>
              <tbody>
                <tr>
                  <td><div className="client-cell"><div className="client-ava" style={{background:'linear-gradient(135deg,#3b82f6,#8b5cf6)'}}>DM</div><div><div className="client-name">David Müller</div><div className="client-id">#WD-2241</div></div></div></td>
                  <td><span className="amount-val">$12,500</span></td><td><span className="method-chip">Bank Wire</span></td>
                  <td><span className="badge badge-green">Verified</span></td>
                  <td><div className="btn-group"><button className="btn-act btn-approve">Approve</button><button className="btn-act btn-reject">Reject</button></div></td>
                </tr>
                <tr>
                  <td><div className="client-cell"><div className="client-ava" style={{background:'linear-gradient(135deg,#f59e0b,#10b981)'}}>SP</div><div><div className="client-name">Sara Petrov</div><div className="client-id">#WD-2240</div></div></div></td>
                  <td><span className="amount-val">$4,800</span></td><td><span className="method-chip">Crypto</span></td>
                  <td><span className="badge badge-orange">Pending</span></td>
                  <td><div className="btn-group"><button className="btn-act btn-review">Review KYC</button></div></td>
                </tr>
                <tr>
                  <td><div className="client-cell"><div className="client-ava" style={{background:'linear-gradient(135deg,#ef4444,#f59e0b)'}}>HK</div><div><div className="client-name">Hiroshi Kato</div><div className="client-id">#WD-2239</div></div></div></td>
                  <td><span className="amount-val" style={{color:'var(--danger)'}}>$31,000</span></td><td><span className="method-chip">Bank Wire</span></td>
                  <td><span className="badge badge-red">Flagged</span></td>
                  <td><div className="btn-group"><button className="btn-act btn-hold">Flag &amp; Hold</button></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div><div className="card-title">Risk Flags</div><div className="card-subtitle">Active compliance alerts</div></div>
            <span className="chip chip-red">3 active</span>
          </div>
          <div className="risk-list">
            <div className="risk-item">
              <div className="risk-dot rd-red"></div>
              <div>
                <div className="risk-title">High-Value Withdrawal</div>
                <div className="risk-desc">Hiroshi Kato — $31,000 wire transfer exceeds daily AML threshold. Manual review required before processing.</div>
                <div className="risk-meta"><span className="risk-tag rt-red">CRITICAL</span>Flagged 45 min ago · Assigned to Ali</div>
              </div>
            </div>
            <div className="risk-item">
              <div className="risk-dot rd-red"></div>
              <div>
                <div className="risk-title">Document Mismatch</div>
                <div className="risk-desc">James Becker (#KYC-4818) — Passport name does not match registration data. Manual identity verification required.</div>
                <div className="risk-meta"><span className="risk-tag rt-red">HIGH</span>Flagged 6h ago · Assigned to Ali</div>
              </div>
            </div>
            <div className="risk-item">
              <div className="risk-dot rd-orange"></div>
              <div>
                <div className="risk-title">PEP Screening Alert</div>
                <div className="risk-desc">New registration matches a politically exposed person entry. Enhanced due diligence protocol must be initiated.</div>
                <div className="risk-meta"><span className="risk-tag rt-orange">MEDIUM</span>Flagged 2h ago · Unassigned</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

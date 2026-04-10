const ANALYSTS = [
  { initials:'AJ', name:'Ali Javid',  role:'Team Manager', roleCls:'badge-blue',   casesToday:12, approved:10, rejected:2, avgTime:'3.8h', approvalPct:83, activeCases:28, pct:'88%',  color:'var(--blue)',   bg:'linear-gradient(135deg,#4f7cff,#8b5cf6)' },
  { initials:'M',  name:'Mahoo',      role:'KYC Analyst',  roleCls:'badge-green',  casesToday:14, approved:13, rejected:1, avgTime:'3.5h', approvalPct:93, activeCases:31, pct:'97%',  color:'#10b981',       bg:'#10b981' },
  { initials:'S',  name:'Sevil',      role:'KYC Analyst',  roleCls:'badge-green',  casesToday:11, approved:9,  rejected:2, avgTime:'4.8h', approvalPct:82, activeCases:29, pct:'91%',  color:'#8b5cf6',       bg:'#8b5cf6' },
  { initials:'P',  name:'Pouya',      role:'KYC Analyst',  roleCls:'badge-green',  casesToday:11, approved:10, rejected:1, avgTime:'4.1h', approvalPct:91, activeCases:32, pct:'100%', color:'#f59e0b',       bg:'#f59e0b' },
];

export default function TeamPerformance() {
  return (
    <>
      <div className="page-header">
        <div>
          <h2>Team Performance</h2>
          <p>Analyst productivity and workload metrics — April 2026</p>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Team<br/>Capacity</div>
            <div className="metric-icon-wrap mi-blue">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">93%</div>
          <div className="metric-trend t-red">+5% <span className="trend-vs">vs last week</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Avg Processing<br/>Time</div>
            <div className="metric-icon-wrap mi-orange">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">4.2h</div>
          <div className="metric-trend t-green">−0.8h <span className="trend-vs">vs last week</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Team Approval<br/>Rate</div>
            <div className="metric-icon-wrap mi-green">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">87%</div>
          <div className="metric-trend t-green">+2% <span className="trend-vs">vs last week</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Cases<br/>Today</div>
            <div className="metric-icon-wrap mi-purple">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">48</div>
          <div className="metric-trend t-green">+6 <span className="trend-vs">vs yesterday</span></div>
        </div>
      </div>

      {/* Analyst Performance Table */}
      <div className="card" style={{marginBottom:12}}>
        <div className="card-head">
          <div><div className="card-title">Analyst Performance</div><div className="card-subtitle">Today's stats per team member</div></div>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Analyst</th><th>Role</th><th>Cases Today</th><th>Approved</th>
                <th>Rejected</th><th>Avg Time</th><th>Approval Rate</th><th>Active</th>
              </tr>
            </thead>
            <tbody>
              {ANALYSTS.map(a => (
                <tr key={a.name}>
                  <td>
                    <div className="client-cell">
                      <div className="avatar avatar-32" style={{background:a.bg}}>{a.initials}</div>
                      <div><div className="client-name">{a.name}</div><div className="client-id">{a.role}</div></div>
                    </div>
                  </td>
                  <td><span className={`badge ${a.roleCls}`}>{a.role === 'Team Manager' ? 'Manager' : 'Analyst'}</span></td>
                  <td style={{fontWeight:700}}>{a.casesToday}</td>
                  <td style={{color:'var(--success)',fontWeight:700}}>{a.approved}</td>
                  <td style={{color:'var(--danger)',fontWeight:700}}>{a.rejected}</td>
                  <td className="time-cell">{a.avgTime}</td>
                  <td>
                    <div className="score-bar-wrap">
                      <div className="score-bar-track">
                        <div className="score-bar-fill" style={{width:`${a.approvalPct}%`, background:a.color}}></div>
                      </div>
                      <span className="score-text">{a.approvalPct}%</span>
                    </div>
                  </td>
                  <td style={{fontWeight:700}}>{a.activeCases}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Case Load + Weekly Summary */}
      <div className="grid-2-col">
        <div className="card">
          <div className="card-head">
            <div><div className="card-title">Active Case Load</div><div className="card-subtitle">Current open cases per analyst</div></div>
          </div>
          <div className="team-list">
            {ANALYSTS.map(a => (
              <div className="team-row" key={a.name}>
                <div className="team-row-top">
                  <div className="member-wrap">
                    <div className="avatar avatar-32" style={{background:a.bg}}>{a.initials}</div>
                    <div><div className="member-name">{a.name}</div><div className="member-role">{a.role}</div></div>
                  </div>
                  <div><div className="member-count">{a.activeCases}</div><div className="member-count-label">cases</div></div>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{width:a.pct, background:a.bg}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div><div className="card-title">Weekly Summary</div><div className="card-subtitle">Apr 1–8, 2026</div></div>
          </div>
          <div className="risk-list">
            <div className="risk-item" style={{borderTop:'none'}}>
              <div className="metric-icon-wrap mi-green" style={{width:30,height:30,borderRadius:8,flexShrink:0}}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              </div>
              <div>
                <div className="risk-title">218 Cases Processed</div>
                <div className="risk-desc">Team processed 218 KYC applications this week, up 14% from last week.</div>
              </div>
            </div>
            <div className="risk-item">
              <div className="metric-icon-wrap mi-blue" style={{width:30,height:30,borderRadius:8,flexShrink:0}}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <div>
                <div className="risk-title">Avg 4.2h per Case</div>
                <div className="risk-desc">Processing time improved. Target is under 6h — team is well within SLA.</div>
              </div>
            </div>
            <div className="risk-item">
              <div className="metric-icon-wrap mi-orange" style={{width:30,height:30,borderRadius:8,flexShrink:0}}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                </svg>
              </div>
              <div>
                <div className="risk-title">Mahoo at 97% Capacity</div>
                <div className="risk-desc">Consider redistributing 3–4 cases from Mahoo to balance the team load.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

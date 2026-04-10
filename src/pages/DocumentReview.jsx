import { useState } from 'react';

const DOCS = [
  { initials:'EM', name:'Elena Marchetti', id:'#KYC-4821', ava:'linear-gradient(135deg,#4f7cff,#8b5cf6)', type:'Passport',          time:'2h ago',  score:92, scoreColor:'var(--success)', issues:'None',           issueColor:'var(--success)', status:'Pending',   statusCls:'badge-orange', action:'approve-reject' },
  { initials:'JB', name:'James Becker',    id:'#KYC-4818', ava:'linear-gradient(135deg,#ef4444,#f59e0b)', type:'Passport',          time:'6h ago',  score:58, scoreColor:'var(--danger)',  issues:'Name mismatch',  issueColor:'var(--danger)',  status:'Flagged',   statusCls:'badge-red',    action:'escalate' },
  { initials:'AR', name:'Arash Rezaei',    id:'#KYC-4820', ava:'linear-gradient(135deg,#10b981,#3b82f6)', type:'National ID',       time:'3h ago',  score:85, scoreColor:'var(--warning)', issues:'Low resolution', issueColor:'var(--warning)', status:'In Review', statusCls:'badge-blue',   action:'request-new' },
  { initials:'LT', name:'Lena Tovar',      id:'#KYC-4817', ava:'linear-gradient(135deg,#8b5cf6,#4f7cff)', type:'Utility Bill',      time:'8h ago',  score:96, scoreColor:'var(--success)', issues:'None',           issueColor:'var(--success)', status:'Pending',   statusCls:'badge-orange', action:'approve-reject' },
  { initials:'NK', name:'Nadia Kovacs',    id:'#KYC-4819', ava:'linear-gradient(135deg,#f59e0b,#10b981)', type:"Driver's License",  time:'5h ago',  score:99, scoreColor:'var(--success)', issues:'None',           issueColor:'var(--success)', status:'Approved',  statusCls:'badge-green',  action:'approved-done' },
];

const FILTERS = ['All Types', 'Passport', 'National ID', 'Utility Bill'];

export default function DocumentReview() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Types');

  const filtered = DOCS.filter(d => {
    const matchSearch = !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All Types' || d.type === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Document Review</h2>
          <p>Submitted documents awaiting verification and quality check</p>
        </div>
      </div>

      <div className="metrics-grid-3">
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Awaiting<br/>Review</div>
            <div className="metric-icon-wrap mi-blue">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">17</div>
          <div className="metric-trend t-red">+3 <span className="trend-vs">since yesterday</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Auto<br/>Passed</div>
            <div className="metric-icon-wrap mi-green">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">42</div>
          <div className="metric-trend t-green">+8 <span className="trend-vs">today</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Quality<br/>Issues</div>
            <div className="metric-icon-wrap mi-orange">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">5</div>
          <div className="metric-trend t-green">−2 <span className="trend-vs">vs yesterday</span></div>
        </div>
      </div>

      <div className="toolbar">
        <div className="search-wrap">
          <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search documents…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-btn${activeFilter === f ? ' active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >{f}</button>
        ))}
      </div>

      <div className="card">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Client</th><th>Document Type</th><th>Upload Date</th>
                <th>Quality Score</th><th>Issues</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id}>
                  <td>
                    <div className="client-cell">
                      <div className="client-ava" style={{background:d.ava}}>{d.initials}</div>
                      <div><div className="client-name">{d.name}</div><div className="client-id">{d.id}</div></div>
                    </div>
                  </td>
                  <td><span className="doc-chip">{d.type}</span></td>
                  <td className="time-cell">{d.time}</td>
                  <td>
                    <div className="score-bar-wrap">
                      <div className="score-bar-track">
                        <div className="score-bar-fill" style={{width:`${d.score}%`, background:d.scoreColor}}></div>
                      </div>
                      <span className="score-text" style={{color:d.scoreColor}}>{d.score}%</span>
                    </div>
                  </td>
                  <td style={{fontSize:12, color:d.issueColor}}>{d.issues}</td>
                  <td><span className={`badge ${d.statusCls}`}>{d.status}</span></td>
                  <td>
                    <div className="btn-group">
                      {d.action === 'approve-reject'  && <><button className="btn-act btn-approve">Approve</button><button className="btn-act btn-reject">Reject</button></>}
                      {d.action === 'escalate'        && <button className="btn-act btn-hold">Escalate</button>}
                      {d.action === 'request-new'     && <button className="btn-act btn-review">Request New</button>}
                      {d.action === 'approved-done'   && <span style={{fontSize:12,color:'var(--success)',fontWeight:600}}>✓ Approved</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

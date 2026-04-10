import { useState } from 'react';

const ALL_CASES = [
  { initials:'EM', name:'Elena Marchetti', id:'#KYC-4821', ava:'linear-gradient(135deg,#4f7cff,#8b5cf6)', acc:'ACC-8821', time:'2h ago',    doc:'Passport',         country:'Italy',   risk:'Low',    riskCls:'badge-green',  assignedBg:'#10b981',                               assignedInitial:'M', assignedName:'Mahoo',     status:'Pending',   statusCls:'badge-orange', action:'review' },
  { initials:'AR', name:'Arash Rezaei',    id:'#KYC-4820', ava:'linear-gradient(135deg,#10b981,#3b82f6)', acc:'ACC-8820', time:'3h ago',    doc:'National ID',      country:'Iran',    risk:'Medium', riskCls:'badge-orange', assignedBg:'#8b5cf6',                               assignedInitial:'S', assignedName:'Sevil',     status:'In Review', statusCls:'badge-blue',   action:'approve-reject' },
  { initials:'NK', name:'Nadia Kovacs',    id:'#KYC-4819', ava:'linear-gradient(135deg,#f59e0b,#10b981)', acc:'ACC-8819', time:'5h ago',    doc:"Driver's License", country:'Hungary', risk:'Low',    riskCls:'badge-green',  assignedBg:'#4f7cff',                               assignedInitial:'P', assignedName:'Pouya',     status:'Approved',  statusCls:'badge-green',  action:'done' },
  { initials:'JB', name:'James Becker',    id:'#KYC-4818', ava:'linear-gradient(135deg,#ef4444,#f59e0b)', acc:'ACC-8818', time:'6h ago',    doc:'Passport',         country:'USA',     risk:'High',   riskCls:'badge-red',    assignedBg:'linear-gradient(135deg,#4f7cff,#8b5cf6)', assignedInitial:'A', assignedName:'Ali Javid', status:'Flagged',   statusCls:'badge-red',    action:'escalate' },
  { initials:'LT', name:'Lena Tovar',      id:'#KYC-4817', ava:'linear-gradient(135deg,#8b5cf6,#4f7cff)', acc:'ACC-8817', time:'8h ago',    doc:'Passport',         country:'Spain',   risk:'Low',    riskCls:'badge-green',  assignedBg:'#10b981',                               assignedInitial:'M', assignedName:'Mahoo',     status:'Pending',   statusCls:'badge-orange', action:'review' },
  { initials:'MO', name:'Marco Oliveira',  id:'#KYC-4816', ava:'linear-gradient(135deg,#10b981,#8b5cf6)', acc:'ACC-8816', time:'Yesterday', doc:'National ID',      country:'Brazil',  risk:'Medium', riskCls:'badge-orange', assignedBg:'#8b5cf6',                               assignedInitial:'S', assignedName:'Sevil',     status:'In Review', statusCls:'badge-blue',   action:'approve-reject' },
];

const FILTERS = ['All', 'Pending', 'In Review', 'Flagged'];

export default function KYCQueue() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = ALL_CASES.filter(c => {
    const matchSearch = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || c.status === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <>
      <div className="page-header">
        <div>
          <h2>KYC Queue</h2>
          <p>All pending verification requests — 24 cases awaiting processing</p>
        </div>
        <span className="chip chip-blue">24 pending</span>
      </div>

      <div className="toolbar">
        <div className="search-wrap">
          <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search by name or ID…"
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
                <th>Client</th><th>Account</th><th>Submitted</th><th>Document</th>
                <th>Country</th><th>Risk</th><th>Assigned To</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="client-cell">
                      <div className="client-ava" style={{background:c.ava}}>{c.initials}</div>
                      <div><div className="client-name">{c.name}</div><div className="client-id">{c.id}</div></div>
                    </div>
                  </td>
                  <td className="time-cell">{c.acc}</td>
                  <td className="time-cell">{c.time}</td>
                  <td><span className="doc-chip">{c.doc}</span></td>
                  <td className="time-cell">{c.country}</td>
                  <td><span className={`badge ${c.riskCls}`}>{c.risk}</span></td>
                  <td>
                    <div className="assigned-wrap">
                      <div className="assigned-dot" style={{background:c.assignedBg}}>{c.assignedInitial}</div>
                      {c.assignedName}
                    </div>
                  </td>
                  <td><span className={`badge ${c.statusCls}`}>{c.status}</span></td>
                  <td>
                    <div className="btn-group">
                      {c.action === 'review'         && <button className="btn-act btn-review">Review</button>}
                      {c.action === 'approve-reject' && <><button className="btn-act btn-approve">Approve</button><button className="btn-act btn-reject">Reject</button></>}
                      {c.action === 'done'           && <span style={{fontSize:12,color:'var(--success)',fontWeight:600}}>✓ Done</span>}
                      {c.action === 'escalate'       && <button className="btn-act btn-hold">Escalate</button>}
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

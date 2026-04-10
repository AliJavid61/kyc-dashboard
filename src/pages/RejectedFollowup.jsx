import { useState } from 'react';

const CASES = [
  { initials:'JB', name:'James Becker',  id:'#KYC-4818', ava:'linear-gradient(135deg,#ef4444,#f59e0b)', reason:'Name mismatch in passport',      time:'6h ago',    attempts:2, attemptsDanger:false, contactStatus:'Email Sent',    contactCls:'badge-orange', nextStep:'Awaiting resubmission',   actions:['follow-up','escalate'] },
  { initials:'FN', name:'Fatima Nour',   id:'#KYC-4812', ava:'linear-gradient(135deg,#f59e0b,#8b5cf6)', reason:'Document expired',               time:'Yesterday', attempts:1, attemptsDanger:false, contactStatus:'Contacted',     contactCls:'badge-blue',   nextStep:'Awaiting new ID',         actions:['follow-up'] },
  { initials:'GS', name:'Georg Strauss', id:'#KYC-4808', ava:'linear-gradient(135deg,#3b82f6,#10b981)', reason:'Poor image quality',             time:'2 days ago', attempts:3, attemptsDanger:true,  contactStatus:'No Response',   contactCls:'badge-red',    nextStep:'Consider escalation',     actions:['escalate','close'] },
  { initials:'YP', name:'Yuki Pham',     id:'#KYC-4805', ava:'linear-gradient(135deg,#8b5cf6,#ef4444)', reason:'PEP match detected',             time:'3 days ago', attempts:1, attemptsDanger:false, contactStatus:'Under Review',  contactCls:'badge-orange', nextStep:'Enhanced due diligence',  actions:['edd'] },
  { initials:'KA', name:'Katrin Albrecht',id:'#KYC-4801',ava:'linear-gradient(135deg,#10b981,#4f7cff)', reason:'Incomplete address proof',       time:'4 days ago', attempts:2, attemptsDanger:false, contactStatus:'Contacted',     contactCls:'badge-blue',   nextStep:'Utility bill requested',  actions:['follow-up'] },
];

const FILTERS = ['All', 'Awaiting Resubmit', 'Escalated', 'Contacted'];

export default function RejectedFollowup() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = CASES.filter(c => {
    const matchSearch = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Rejected Follow-up</h2>
          <p>Cases that were rejected and require resubmission or escalation</p>
        </div>
        <span className="chip chip-red">7 open</span>
      </div>

      <div className="toolbar">
        <div className="search-wrap">
          <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search rejected cases…"
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
                <th>Client</th><th>Rejection Reason</th><th>Rejected On</th>
                <th>Attempts</th><th>Contact Status</th><th>Next Step</th><th>Action</th>
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
                  <td style={{fontSize:'12.5px',color:'var(--muted)'}}>{c.reason}</td>
                  <td className="time-cell">{c.time}</td>
                  <td style={{fontSize:13,fontWeight:700,color:c.attemptsDanger ? 'var(--danger)' : 'inherit'}}>{c.attempts}</td>
                  <td><span className={`badge ${c.contactCls}`}>{c.contactStatus}</span></td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{c.nextStep}</td>
                  <td>
                    <div className="btn-group">
                      {c.actions.includes('follow-up') && <button className="btn-act btn-review">Follow Up</button>}
                      {c.actions.includes('escalate')  && <button className="btn-act btn-hold">Escalate</button>}
                      {c.actions.includes('close')     && <button className="btn-act btn-reject">Close</button>}
                      {c.actions.includes('edd')       && <button className="btn-act btn-hold">EDD Required</button>}
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

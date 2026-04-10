import { useState } from 'react';

const WITHDRAWALS = [
  { initials:'DM', name:'David Müller',  id:'#WD-2241', ava:'linear-gradient(135deg,#3b82f6,#8b5cf6)', amount:'$12,500', amountDanger:false, method:'Bank Wire', dest:'DE – Deutsche Bank',   kycStatus:'Verified', kycCls:'badge-green',  risk:'Low',    riskCls:'badge-green',  wait:'1h 20m', action:'approve-reject' },
  { initials:'SP', name:'Sara Petrov',   id:'#WD-2240', ava:'linear-gradient(135deg,#f59e0b,#10b981)', amount:'$4,800',  amountDanger:false, method:'Crypto',    dest:'USDT · 0x8f3...2d9a', kycStatus:'Pending',  kycCls:'badge-orange', risk:'Medium', riskCls:'badge-orange', wait:'3h 05m', action:'review-kyc' },
  { initials:'HK', name:'Hiroshi Kato',  id:'#WD-2239', ava:'linear-gradient(135deg,#ef4444,#f59e0b)', amount:'$31,000', amountDanger:true,  method:'Bank Wire', dest:'JP – Sumitomo',        kycStatus:'Flagged',  kycCls:'badge-red',    risk:'High',   riskCls:'badge-red',    wait:'45m',    action:'flag-hold' },
  { initials:'CL', name:'Chen Li',       id:'#WD-2238', ava:'linear-gradient(135deg,#10b981,#3b82f6)', amount:'$2,200',  amountDanger:false, method:'Crypto',    dest:'BTC · bc1q...4ka2',   kycStatus:'Verified', kycCls:'badge-green',  risk:'Low',    riskCls:'badge-green',  wait:'5h 30m', action:'approve-reject' },
  { initials:'RK', name:'Reza Karimi',   id:'#WD-2237', ava:'linear-gradient(135deg,#8b5cf6,#ef4444)', amount:'$7,600',  amountDanger:false, method:'Bank Wire', dest:'TR – Akbank',          kycStatus:'Pending',  kycCls:'badge-orange', risk:'Medium', riskCls:'badge-orange', wait:'2h 15m', action:'review-kyc' },
];

const FILTERS = ['All', 'Verified', 'Pending', 'Flagged'];

export default function Withdrawals() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = WITHDRAWALS.filter(w => {
    const matchSearch = !search ||
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || w.kycStatus === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Withdrawals</h2>
          <p>All withdrawal requests requiring KYC team approval</p>
        </div>
        <span className="chip chip-orange">8 pending</span>
      </div>

      <div className="metrics-grid-3">
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Total<br/>Pending</div>
            <div className="metric-icon-wrap mi-orange">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">8</div>
          <div className="metric-trend t-green">−4 <span className="trend-vs">vs yesterday</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">High Value<br/>(&gt;$10k)</div>
            <div className="metric-icon-wrap mi-red">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">2</div>
          <div className="metric-trend t-muted">Same <span className="trend-vs">vs yesterday</span></div>
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
          <div className="metric-value">14</div>
          <div className="metric-trend t-green">+3 <span className="trend-vs">vs yesterday</span></div>
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
            placeholder="Search withdrawals…"
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
                <th>Client</th><th>Amount</th><th>Method</th><th>Destination</th>
                <th>KYC Status</th><th>Risk</th><th>Wait</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(w => (
                <tr key={w.id}>
                  <td>
                    <div className="client-cell">
                      <div className="client-ava" style={{background:w.ava}}>{w.initials}</div>
                      <div><div className="client-name">{w.name}</div><div className="client-id">{w.id}</div></div>
                    </div>
                  </td>
                  <td><span className="amount-val" style={w.amountDanger ? {color:'var(--danger)'} : {}}>{w.amount}</span></td>
                  <td><span className="method-chip">{w.method}</span></td>
                  <td className="time-cell">{w.dest}</td>
                  <td><span className={`badge ${w.kycCls}`}>{w.kycStatus}</span></td>
                  <td><span className={`badge ${w.riskCls}`}>{w.risk}</span></td>
                  <td className="time-cell">{w.wait}</td>
                  <td>
                    <div className="btn-group">
                      {w.action === 'approve-reject' && <><button className="btn-act btn-approve">Approve</button><button className="btn-act btn-reject">Reject</button></>}
                      {w.action === 'review-kyc'     && <button className="btn-act btn-review">Review KYC</button>}
                      {w.action === 'flag-hold'      && <button className="btn-act btn-hold">Flag &amp; Hold</button>}
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

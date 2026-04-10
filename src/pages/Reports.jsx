const REPORTS = [
  { iconCls:'mi-blue',   name:'KYC Approval Summary — April 2026',        meta:'Generated Apr 8 · 142 cases · PDF, 2.1 MB',          btnLabel:'Export PDF',       btnStyle:{} },
  { iconCls:'mi-green',  name:'Team Performance Report — Q1 2026',         meta:'Generated Apr 1 · 4 analysts · Excel, 1.4 MB',       btnLabel:'Export Excel',     btnStyle:{} },
  { iconCls:'mi-orange', name:'AML Risk Flags Report — April 2026',        meta:'Generated Apr 8 · 3 active flags · PDF, 0.8 MB',     btnLabel:'Export PDF',       btnStyle:{} },
  { iconCls:'mi-purple', name:'SAR Suspicious Activity Report — Q1 2026',  meta:'Due Apr 15 · Status: 62% complete · In progress',    btnLabel:'Continue Draft',   btnStyle:{color:'var(--warning)',borderColor:'var(--warning)'} },
  { iconCls:'mi-blue',   name:'Withdrawal Review Audit — March 2026',      meta:'Generated Apr 1 · 183 transactions · PDF, 3.2 MB',   btnLabel:'Export PDF',       btnStyle:{} },
];

const ReportIcon = ({ cls }) => {
  if (cls === 'mi-green') return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>
    </svg>
  );
  if (cls === 'mi-orange') return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
    </svg>
  );
  if (cls === 'mi-purple') return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  );
};

export default function Reports() {
  return (
    <>
      <div className="page-header">
        <div>
          <h2>Reports</h2>
          <p>KYC and compliance reports — export or schedule automated delivery</p>
        </div>
      </div>

      <div className="metrics-grid-3">
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Generated<br/>This Month</div>
            <div className="metric-icon-wrap mi-blue">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">12</div>
          <div className="metric-trend t-green">+3 <span className="trend-vs">vs last month</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Scheduled<br/>Reports</div>
            <div className="metric-icon-wrap mi-purple">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">5</div>
          <div className="metric-trend t-muted">No change</div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Pending<br/>Review</div>
            <div className="metric-icon-wrap mi-orange">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">2</div>
          <div className="metric-trend t-muted">No change</div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <div><div className="card-title">Available Reports</div><div className="card-subtitle">Download or schedule delivery</div></div>
        </div>
        <div>
          {REPORTS.map((r, i) => (
            <div className="report-row" key={i}>
              <div className={`report-icon ${r.iconCls}`}><ReportIcon cls={r.iconCls} /></div>
              <div className="report-info">
                <div className="report-name">{r.name}</div>
                <div className="report-meta">{r.meta}</div>
              </div>
              <button className="btn-export" style={r.btnStyle}>{r.btnLabel}</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

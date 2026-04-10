export default function RiskCompliance() {
  return (
    <>
      <div className="page-header">
        <div>
          <h2>Risk &amp; Compliance</h2>
          <p>Active flags, AML alerts, and compliance monitoring</p>
        </div>
        <span className="chip chip-red">3 active alerts</span>
      </div>

      <div className="metrics-grid-3">
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Active<br/>Risk Flags</div>
            <div className="metric-icon-wrap mi-red">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">3</div>
          <div className="metric-trend t-red">+1 <span className="trend-vs">since yesterday</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">AML<br/>Threshold Hits</div>
            <div className="metric-icon-wrap mi-orange">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">1</div>
          <div className="metric-trend t-muted">Same <span className="trend-vs">as yesterday</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-label">Compliance<br/>Score</div>
            <div className="metric-icon-wrap mi-green">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
          </div>
          <div className="metric-value">94%</div>
          <div className="metric-trend t-green">+1% <span className="trend-vs">vs last week</span></div>
        </div>
      </div>

      <div className="grid-2-col">
        {/* Active Risk Flags */}
        <div className="card">
          <div className="card-head">
            <div><div className="card-title">Active Risk Flags</div><div className="card-subtitle">Requires immediate attention</div></div>
            <span className="chip chip-red">3 active</span>
          </div>
          <div className="risk-list">
            <div className="risk-item">
              <div className="risk-dot rd-red"></div>
              <div>
                <div className="risk-title">High-Value Withdrawal</div>
                <div className="risk-desc">Hiroshi Kato — $31,000 wire transfer exceeds daily AML threshold. Manual review required.</div>
                <div className="risk-meta"><span className="risk-tag rt-red">CRITICAL</span>Flagged 45 min ago · Assigned to Ali</div>
              </div>
            </div>
            <div className="risk-item">
              <div className="risk-dot rd-red"></div>
              <div>
                <div className="risk-title">Document Mismatch</div>
                <div className="risk-desc">James Becker (#KYC-4818) — Passport name does not match registration data.</div>
                <div className="risk-meta"><span className="risk-tag rt-red">HIGH</span>Flagged 6h ago · Assigned to Ali</div>
              </div>
            </div>
            <div className="risk-item">
              <div className="risk-dot rd-orange"></div>
              <div>
                <div className="risk-title">PEP Screening Alert</div>
                <div className="risk-desc">New registration matches a politically exposed person entry. Enhanced due diligence required.</div>
                <div className="risk-meta"><span className="risk-tag rt-orange">MEDIUM</span>Flagged 2h ago · Unassigned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Checklist */}
        <div className="card">
          <div className="card-head">
            <div><div className="card-title">Compliance Checklist</div><div className="card-subtitle">April 2026 obligations</div></div>
          </div>
          <div className="risk-list">
            <div className="risk-item" style={{borderTop:'none'}}>
              <div className="metric-icon-wrap mi-green" style={{width:28,height:28,borderRadius:7,flexShrink:0}}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              </div>
              <div>
                <div className="risk-title" style={{color:'var(--success)'}}>AML Policy Reviewed</div>
                <div className="risk-desc">Annual review completed and signed off on Apr 1.</div>
              </div>
            </div>
            <div className="risk-item">
              <div className="metric-icon-wrap mi-green" style={{width:28,height:28,borderRadius:7,flexShrink:0}}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              </div>
              <div>
                <div className="risk-title" style={{color:'var(--success)'}}>Team Training Certified</div>
                <div className="risk-desc">All analysts completed Q1 compliance training. Certificates on file.</div>
              </div>
            </div>
            <div className="risk-item">
              <div className="metric-icon-wrap mi-orange" style={{width:28,height:28,borderRadius:7,flexShrink:0}}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <div>
                <div className="risk-title">Quarterly SAR Report</div>
                <div className="risk-desc">Suspicious activity report due Apr 15. Currently 62% complete.</div>
              </div>
            </div>
            <div className="risk-item">
              <div className="metric-icon-wrap mi-orange" style={{width:28,height:28,borderRadius:7,flexShrink:0}}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <div>
                <div className="risk-title">PEP List Update</div>
                <div className="risk-desc">Monthly PEP database sync scheduled Apr 10. Pending IT confirmation.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

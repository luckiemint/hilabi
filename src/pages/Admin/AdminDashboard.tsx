import { useState } from "react";

interface QRCode {
  id: string;
  code: string;
  timestamp: string;
}

const DashboardIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const QRIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <path d="M6 6h1M17 6h1M6 17h1M17 17h1" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const PrintIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [generateMode, setGenerateMode] = useState("single");
  const [qrCount, setQrCount] = useState("10");
  const [generatedQRs, setGeneratedQRs] = useState<QRCode[]>([]);

  const kpiData = [
    {
      id: 1,
      title: "Total Users",
      value: "2,547",
      change: "+12.5%",
      icon: UsersIcon,
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "QR Codes Generated",
      value: "15,823",
      change: "+8.3%",
      icon: QRIcon,
      color: "#8b5cf6",
    },
    {
      id: 3,
      title: "Active QR Codes",
      value: "12,456",
      change: "+5.7%",
      icon: QRIcon,
      color: "#10b981",
    },
    {
      id: 4,
      title: "Activation Rate",
      value: "78.7%",
      change: "+2.1%",
      icon: UsersIcon,
      color: "#f59e0b",
    },
  ];

  const handleGenerateQR = () => {
    const count = generateMode === "single" ? 1 : parseInt(qrCount);
    const newQRs = Array.from({ length: count }, (_, i) => ({
      id: `QR${Date.now()}${i}`,
      code: `HILABI-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      timestamp: new Date().toLocaleString(),
    }));
    setGeneratedQRs(newQRs);
  };

  return (
    <div className="admin-app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
            </svg>
            <div>
              <h1>HILABI</h1>
              <p>Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <DashboardIcon />
            <span>Dashboard</span>
          </button>
          <button
            className={`nav-item ${activeTab === "qrgenerate" ? "active" : ""}`}
            onClick={() => setActiveTab("qrgenerate")}
          >
            <QRIcon />
            <span>QR Management</span>
          </button>
        </nav>
      </aside>

      <main className="main-content">
        {activeTab === "dashboard" ? (
          <div className="dashboard-content">
            <div className="page-header">
              <h2>Dashboard Overview</h2>
              <p>Monitor your platform statistics in real-time</p>
            </div>
            <div className="kpi-grid">
              {kpiData.map((kpi, idx) => (
                <div
                  key={kpi.id}
                  className="kpi-card"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="kpi-header">
                    <div
                      className="kpi-icon"
                      style={{
                        backgroundColor: `${kpi.color}20`,
                        color: kpi.color,
                      }}
                    >
                      <kpi.icon />
                    </div>
                    <div className="kpi-change">{kpi.change}</div>
                  </div>
                  <h3>{kpi.value}</h3>
                  <p>{kpi.title}</p>
                </div>
              ))}
            </div>
            <div className="activity-section">
              <h3>Recent Activity</h3>
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div>
                  <p>
                    <strong>125 new users</strong> registered today
                  </p>
                  <span>2 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div>
                  <p>
                    <strong>450 QR codes</strong> generated in last 24h
                  </p>
                  <span>5 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="qr-content">
            <div className="page-header">
              <h2>QR Code Management</h2>
              <p>Generate and manage QR codes</p>
            </div>
            <div className="mode-selector">
              <button
                className={generateMode === "single" ? "active" : ""}
                onClick={() => setGenerateMode("single")}
              >
                Single QR
              </button>
              <button
                className={generateMode === "bulk" ? "active" : ""}
                onClick={() => setGenerateMode("bulk")}
              >
                Bulk Generate
              </button>
            </div>
            <div className="generate-card">
              {generateMode === "bulk" && (
                <div className="form-content">
                  <label>Number of QR Codes</label>
                  <select
                    value={qrCount}
                    onChange={(e) => setQrCount(e.target.value)}
                  >
                    {[10, 25, 50, 100, 250, 500].map((n) => (
                      <option key={n} value={n}>
                        {n} QR Codes
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button className="generate-btn" onClick={handleGenerateQR}>
                <QRIcon /> Generate{" "}
                {generateMode === "bulk" ? `${qrCount} ` : ""}QR Code
                {generateMode === "bulk" ? "s" : ""}
              </button>
            </div>
            {generatedQRs.length > 0 && (
              <div className="results-section">
                <div className="results-header">
                  <h3>Generated QR Codes ({generatedQRs.length})</h3>
                  <div className="action-buttons">
                    <button className="icon-btn" onClick={() => window.print()}>
                      <PrintIcon /> Print
                    </button>
                    <button
                      className="icon-btn"
                      onClick={() => alert("Downloading...")}
                    >
                      <DownloadIcon /> Download
                    </button>
                  </div>
                </div>
                <div className="qr-grid">
                  {generatedQRs.map((qr) => (
                    <div key={qr.id} className="qr-item">
                      <div className="qr-placeholder">
                        <QRIcon />
                      </div>
                      <p className="qr-code">{qr.code}</p>
                      <span>{qr.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .admin-app { display: flex; min-height: 100vh; background: #e9eef3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .sidebar { width: 280px; background: #fff; border-right: 1px solid #e2e8f0; position: fixed; height: 100vh; }
        .sidebar-header { padding: 24px 20px; border-bottom: 1px solid #f1f5f9; }
        .logo { display: flex; align-items: center; gap: 12px; }
        .logo h1 { font-size: 1.25rem; font-weight: 700; color: #0f172a; }
        .logo p { font-size: 0.75rem; color: #64748b; }
        .sidebar-nav { padding: 16px; }
        .nav-item { width: 100%; display: flex; align-items: center; gap: 12px; padding: 14px 16px; border: none; background: transparent; color: #64748b; font-size: 0.9375rem; font-weight: 500; border-radius: 12px; cursor: pointer; transition: all 0.2s; margin-bottom: 6px; }
        .nav-item:hover { background: #f8fafc; color: #0f172a; }
        .nav-item.active { background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(29, 78, 216, 0.05)); color: #2563eb; font-weight: 600; }
        .main-content { flex: 1; margin-left: 280px; padding: 32px; overflow-y: auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h2 { font-size: 1.875rem; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
        .page-header p { font-size: 1rem; color: #64748b; }
        .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .kpi-card { background: #fff; border-radius: 16px; padding: 24px; border: 1px solid #f1f5f9; box-shadow: 0 1px 3px rgba(0,0,0,0.05); animation: slideUp 0.5s ease backwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .kpi-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        .kpi-header { display: flex; justify-content: space-between; margin-bottom: 16px; }
        .kpi-icon { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .kpi-change { padding: 6px 10px; border-radius: 8px; font-size: 0.8125rem; font-weight: 600; background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .kpi-card h3 { font-size: 2rem; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
        .kpi-card p { font-size: 0.9375rem; color: #64748b; }
        .activity-section { background: #fff; border-radius: 16px; padding: 24px; border: 1px solid #f1f5f9; }
        .activity-section h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 20px; }
        .activity-item { display: flex; gap: 16px; margin-bottom: 20px; }
        .activity-dot { width: 12px; height: 12px; border-radius: 50%; background: #2563eb; margin-top: 6px; }
        .activity-item p { font-size: 0.9375rem; color: #0f172a; margin-bottom: 4px; }
        .activity-item span { font-size: 0.8125rem; color: #94a3b8; }
        .mode-selector { display: flex; gap: 12px; margin-bottom: 24px; background: #fff; padding: 8px; border-radius: 14px; }
        .mode-selector button { flex: 1; padding: 14px; border: none; background: transparent; color: #64748b; font-weight: 600; border-radius: 10px; cursor: pointer; }
        .mode-selector button.active { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); }
        .generate-card { background: #fff; border-radius: 16px; padding: 32px; margin-bottom: 32px; }
        .form-content { margin-bottom: 24px; }
        .form-content label { display: block; font-weight: 600; margin-bottom: 10px; }
        .form-content select { width: 100%; padding: 14px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 1rem; }
        .generate-btn { width: 100%; padding: 18px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: #fff; border: none; border-radius: 14px; font-size: 1.0625rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3); }
        .generate-btn:hover { transform: translateY(-2px); }
        .results-section { background: #fff; border-radius: 16px; padding: 24px; }
        .results-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; }
        .results-header h3 { font-size: 1.125rem; font-weight: 700; }
        .action-buttons { display: flex; gap: 10px; }
        .icon-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; border: 2px solid #e2e8f0; background: #fff; border-radius: 10px; font-weight: 600; cursor: pointer; color: #2563eb; }
        .icon-btn:hover { background: rgba(37, 99, 235, 0.05); }
        .qr-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
        .qr-item { border: 2px solid #f1f5f9; border-radius: 12px; padding: 16px; text-align: center; }
        .qr-placeholder { width: 100%; aspect-ratio: 1; background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.05)); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #8b5cf6; margin-bottom: 12px; }
        .qr-code { font-weight: 700; color: #0f172a; margin-bottom: 4px; }
        .qr-item span { font-size: 0.75rem; color: #94a3b8; }
        @media (max-width: 1024px) { .sidebar { width: 240px; } .main-content { margin-left: 240px; } }
        @media (max-width: 768px) { .sidebar { transform: translateX(-100%); } .main-content { margin-left: 0; } }
      `}</style>
    </div>
  );
};

export default AdminDashboard;

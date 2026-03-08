import { UsersIcon, QRIcon } from "../components/AdminIcons";

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

const DashboardOverview = () => {
  return (
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
  );
};

export default DashboardOverview;

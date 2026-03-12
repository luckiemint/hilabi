import { useState } from "react";
import {
  ActivateIcon,
  DeactivateIcon,
  CancelIcon,
  SearchIcon,
} from "../components/AdminIcons";

const renderUserStatusToggle = (
  user: LinkedUser,
  onActionClick: (u: LinkedUser) => void
) => (
  <div className="qr-status-toggle user-status-toggle">
    <button
      type="button"
      className={`qr-status-toggle-btn ${user.status === "active" ? "active" : ""}`}
      onClick={() => user.status === "inactive" && onActionClick(user)}
    >
      {user.status === "active" ? "Activated" : "Activate"}
    </button>
    <button
      type="button"
      className={`qr-status-toggle-btn ${user.status === "inactive" ? "active deactivated" : ""}`}
      onClick={() => user.status === "active" && onActionClick(user)}
    >
      {user.status === "active" ? "Deactivate" : "Deactivated"}
    </button>
  </div>
);

export interface LinkedUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  qrCode: string;
  status: "active" | "inactive";
  subscriptionEndDate: string;
}

const getDaysLeft = (endDate: string): number => {
  const end = new Date(endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

const initialUsers: LinkedUser[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    qrCode: "HILABI-X7K2M9P3Q",
    status: "active",
    subscriptionEndDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 87654 32109",
    qrCode: "HILABI-A1B2C3D4E",
    status: "inactive",
    subscriptionEndDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    phone: "+91 76543 21098",
    qrCode: "HILABI-F5G6H7I8J",
    status: "active",
    subscriptionEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "+91 65432 10987",
    qrCode: "HILABI-K9L0M1N2O",
    status: "active",
    subscriptionEndDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
];

const UsersPage = () => {
  const [linkedUsers, setLinkedUsers] = useState<LinkedUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    userId: string | null;
    action: "activate" | "deactivate" | null;
    userName: string;
  }>({ open: false, userId: null, action: null, userName: "" });

  const handleToggleUserStatus = (userId: string) => {
    setLinkedUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  };

  const openConfirmModal = (user: LinkedUser) => {
    setConfirmModal({
      open: true,
      userId: user.id,
      action: user.status === "active" ? "deactivate" : "activate",
      userName: user.name,
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ open: false, userId: null, action: null, userName: "" });
  };

  const confirmUserAction = () => {
    if (confirmModal.userId) {
      handleToggleUserStatus(confirmModal.userId);
      closeConfirmModal();
    }
  };

  const filteredUsers = linkedUsers.filter((user) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      user.name.toLowerCase().includes(q) ||
      user.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")) ||
      user.qrCode.toLowerCase().includes(q);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.status === "active") ||
      (statusFilter === "inactive" && user.status === "inactive");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="users-content">
      <div className="page-header">
        <h2>Users</h2>
        <p>View and manage users linked to QR codes</p>
      </div>
      <div className="qr-filters">
        <div className="qr-filter-search">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search by name, phone, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="qr-search-input"
          />
        </div>
        <div className="qr-filter-group">
          <span className="qr-filter-label">Status:</span>
          <div className="qr-filter-toggle">
            <button
              type="button"
              className={`qr-filter-btn ${statusFilter === "all" ? "active" : ""}`}
              onClick={() => setStatusFilter("all")}
            >
              All
            </button>
            <button
              type="button"
              className={`qr-filter-btn ${statusFilter === "active" ? "active" : ""}`}
              onClick={() => setStatusFilter("active")}
            >
              Active
            </button>
            <button
              type="button"
              className={`qr-filter-btn ${statusFilter === "inactive" ? "active deactivated" : ""}`}
              onClick={() => setStatusFilter("inactive")}
            >
              Inactive
            </button>
          </div>
        </div>
        <span
          className="qr-filter-total"
          style={{ marginLeft: "auto", fontWeight: 600, color: "#64748b" }}
        >
          Total: {filteredUsers.length}
        </span>
      </div>
      <div className="users-table-card">
        <div className="users-table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Phone</th>
                <th>QR Code</th>
                <th>Status</th>
                <th>Subscription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => {
                const daysLeft = getDaysLeft(user.subscriptionEndDate);
                const isExpired = daysLeft === 0;
                return (
                  <tr key={user.id}>
                    <td className="serial-no">{index + 1}</td>
                    <td>
                      <div className="user-name">{user.name}</div>
                    </td>
                    <td>
                      <span className="user-phone">{user.phone}</span>
                    </td>
                    <td>
                      <span className="qr-code-text">{user.qrCode}</span>
                    </td>
                    <td>
                      <span className={`status-text status-${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`subscription-days ${
                          isExpired ? "expired" : daysLeft <= 7 ? "warning" : ""
                        }`}
                      >
                        {isExpired
                          ? "Expired"
                          : daysLeft === 1
                          ? "1 day left"
                          : `${daysLeft} days left`}
                      </span>
                    </td>
                    <td>
                      {renderUserStatusToggle(user, openConfirmModal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {confirmModal.open && (
        <div className="confirm-modal-overlay" onClick={closeConfirmModal}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="confirm-modal-title">
              {confirmModal.action === "deactivate" ? "Deactivate User" : "Activate User"}
            </h3>
            <p className="confirm-modal-message">
              Are you sure you want to {confirmModal.action} <strong>{confirmModal.userName}</strong>?
              {confirmModal.action === "deactivate" &&
                " The user will no longer have access to their QR-linked services."}
            </p>
            <div className="confirm-modal-actions">
              <button className="confirm-modal-btn cancel" onClick={closeConfirmModal}>
                <CancelIcon /> Cancel
              </button>
              <button
                className={`confirm-modal-btn confirm ${confirmModal.action}`}
                onClick={confirmUserAction}
              >
                {confirmModal.action === "deactivate" ? (
                  <><DeactivateIcon /> Deactivate</>
                ) : (
                  <><ActivateIcon /> Activate</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import html2canvas from "html2canvas";
import {
  QRIcon,
  PrintIcon,
  DownloadIcon,
  CancelIcon,
  GridIcon,
  ListIcon,
  SearchIcon,
} from "../components/AdminIcons";
import { QRCodeSVG } from "qrcode.react";
import ParkingTag from "../../../components/ParkingTag/ParkingTag";
import "../../../components/ParkingTag/ParkingTag.css";

interface QRCode {
  id: string;
  code: string;
  timestamp: string;
  linked: boolean;
  linkedTo?: string;
  status: "active" | "inactive";
}

const initialQRCodes: QRCode[] = [
  {
    id: "qr-1",
    code: "HILABI-X7K2M9P3Q",
    timestamp: "Mar 5, 2025 10:30 AM",
    linked: true,
    linkedTo: "John Doe (+91 98765 43210)",
    status: "active",
  },
  {
    id: "qr-2",
    code: "HILABI-A1B2C3D4E",
    timestamp: "Mar 5, 2025 11:15 AM",
    linked: true,
    linkedTo: "Jane Smith (+91 87654 32109)",
    status: "inactive",
  },
  {
    id: "qr-3",
    code: "HILABI-F5G6H7I8J",
    timestamp: "Mar 4, 2025 2:45 PM",
    linked: false,
    status: "active",
  },
  {
    id: "qr-4",
    code: "HILABI-K9L0M1N2O",
    timestamp: "Mar 4, 2025 4:20 PM",
    linked: true,
    linkedTo: "Mike Johnson (+91 76543 21098)",
    status: "active",
  },
  {
    id: "qr-5",
    code: "HILABI-P2Q3R4S5T",
    timestamp: "Mar 3, 2025 9:00 AM",
    linked: false,
    status: "inactive",
  },
  {
    id: "qr-6",
    code: "HILABI-U6V7W8X9Y",
    timestamp: "Mar 3, 2025 3:30 PM",
    linked: false,
    status: "active",
  },
];

const QRManagementPage = () => {
  const [qrCount, setQrCount] = useState("1");
  const [allQRCodes, setAllQRCodes] = useState<QRCode[]>(initialQRCodes);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [linkFilter, setLinkFilter] = useState<"all" | "linked" | "unlinked">(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [singleDownloadId, setSingleDownloadId] = useState<string | null>(null);
  const [downloadQr, setDownloadQr] = useState<QRCode | null>(null);
  const downloadRef = useRef<HTMLDivElement>(null);

  const filteredQRCodes = allQRCodes.filter((qr) => {
    const matchesLink =
      linkFilter === "all" ||
      (linkFilter === "linked" && qr.linked) ||
      (linkFilter === "unlinked" && !qr.linked);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && qr.status === "active") ||
      (statusFilter === "inactive" && qr.status === "inactive");
    const matchesSearch =
      !searchQuery.trim() ||
      qr.code.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesLink && matchesStatus && matchesSearch;
  });

  const handleGenerateClick = () => {
    setConfirmModalOpen(true);
  };

  const handleSetStatus = (qrId: string, status: "active" | "inactive") => {
    setAllQRCodes((prev) =>
      prev.map((qr) => (qr.id === qrId ? { ...qr, status } : qr)),
    );
  };

  const handleConfirmGenerate = () => {
    const count = Math.max(1, Math.min(500, parseInt(qrCount, 10) || 1));
    const newQRs: QRCode[] = Array.from({ length: count }, (_, i) => ({
      id: `QR${Date.now()}${i}`,
      code: `HILABI-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      timestamp: new Date().toLocaleString(),
      linked: false,
      status: "active" as const,
    }));
    setAllQRCodes((prev) => [...newQRs, ...prev]);
    setConfirmModalOpen(false);
  };

  const handleCloseModal = () => {
    setConfirmModalOpen(false);
  };

  const handlePrintOrDownload = () => {
    setSingleDownloadId(null);
    window.print();
  };

  const handleDownloadSingle = (qr: QRCode) => {
    setDownloadQr(qr);
  };

  useEffect(() => {
    if (!downloadQr || !downloadRef.current) return;
    const el = downloadRef.current.querySelector(".parking-tag");
    if (!el) return;
    const timer = setTimeout(() => {
      html2canvas(el as HTMLElement, {
        scale: 2,
        backgroundColor: "#262626",
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (_doc, clonedEl) => {
          const html = clonedEl as HTMLElement;

          // 1. Reduce space above HILABI heading
          const upper = html.querySelector(".parking-tag-upper") as HTMLElement;
          if (upper) upper.style.paddingTop = "0";

          const brand = html.querySelector(".parking-tag-brand") as HTMLElement;
          if (brand) brand.style.marginBottom = "10px";

          // 2. Reduce space above .parking-tag-scan (between QR frame and scan text)
          const qrFrame = html.querySelector(".parking-tag-qr-frame") as HTMLElement;
          if (qrFrame) qrFrame.style.marginBottom = "0";

          // SCAN row: yellow color, align icon with text
          const scanRow = html.querySelector(".parking-tag-scan") as HTMLElement;
          if (scanRow) {
            scanRow.style.setProperty("color", "#FFD400", "important");
            scanRow.style.display = "flex";
            scanRow.style.alignItems = "center";
            scanRow.style.justifyContent = "center";
            const svg = scanRow.querySelector("svg") as SVGSVGElement;
            if (svg) {
              svg.style.transform = "translateY(2px)";
              svg.style.flexShrink = "0";
              const g = svg.querySelector("g");
              if (g) (g as SVGElement).setAttribute("fill", "#FFD400");
            }
          }

          const labels = html.querySelectorAll(".parking-tag-bottom-item span, .parking-tag-bullet");
          labels.forEach((n) => (n as HTMLElement).style.setProperty("color", "#262626", "important"));
        },
      })
        .then((canvas) => {
          const link = document.createElement("a");
          link.download = `parking-tag-${downloadQr.code}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
          setDownloadQr(null);
        })
        .catch(() => setDownloadQr(null));
    }, 500);
    return () => clearTimeout(timer);
  }, [downloadQr]);

  const displayCount = Math.max(1, Math.min(500, parseInt(qrCount, 10) || 1));

  const getQrValue = (qr: QRCode) => {
    // const base = typeof window !== "undefined" ? window.location.origin : "https://hilabi.app";
    const base = "https://hilabi.vercel.app";
    return qr.linked
      ? `${base}/visitor/dashboard`
      : `${base}/registration/activate`;
  };

  const printSheet = (
    <>
      <style>{`
        .qr-print-sheet-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          padding: 16px;
        }
        .qr-print-sheet-grid.qr-print-single {
          justify-content: center;
        }
        @media print {
          body * { visibility: hidden; }
          .qr-print-sheet, .qr-print-sheet * { visibility: visible; }
          .qr-print-sheet { position: absolute; left: 0; top: 0; width: 100%; display: block !important; }
          .qr-print-sheet .parking-tag,
          .qr-print-sheet .parking-tag-upper,
          .qr-print-sheet .parking-tag-lower,
          .qr-print-sheet .parking-tag-qr,
          .qr-print-sheet .parking-tag-qr-frame {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        @media screen {
          .qr-print-sheet { display: none !important; }
        }
        .qr-download-staging {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 99999;
          pointer-events: none;
        }
      `}</style>
      <div className="qr-print-sheet">
        <div
          className={`qr-print-sheet-grid ${singleDownloadId ? "qr-print-single" : ""}`}
        >
          {(singleDownloadId
            ? allQRCodes.filter((q) => q.id === singleDownloadId)
            : allQRCodes
          ).map((qr) => (
            <ParkingTag key={qr.id} code={qr.code} qrValue={getQrValue(qr)} />
          ))}
        </div>
      </div>
    </>
  );

  const renderStatusToggle = (qr: QRCode) => (
    <div className="qr-status-toggle">
      <button
        type="button"
        className={`qr-status-toggle-btn ${qr.status === "active" ? "active" : ""}`}
        onClick={() => handleSetStatus(qr.id, "active")}
      >
        {qr.status === "active" ? "Activated" : "Activate"}
      </button>
      <button
        type="button"
        className={`qr-status-toggle-btn ${qr.status === "inactive" ? "active deactivated" : ""}`}
        onClick={() => handleSetStatus(qr.id, "inactive")}
      >
        {qr.status === "active" ? "Deactivate" : "Deactivated"}
      </button>
    </div>
  );

  return (
    <>
      {createPortal(printSheet, document.body)}
      {downloadQr &&
        createPortal(
          <div ref={downloadRef} className="qr-download-staging" aria-hidden>
            <ParkingTag
              code={downloadQr.code}
              qrValue={getQrValue(downloadQr)}
            />
          </div>,
          document.body,
        )}
      <div className="qr-content">
        <div className="page-header">
          <h2>QR Code Management</h2>
          <p>Generate and manage QR codes</p>
        </div>

        {confirmModalOpen && (
          <div className="confirm-modal-overlay" onClick={handleCloseModal}>
            <div
              className="confirm-modal confirm-modal-qr"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="confirm-modal-title">Generate QR Codes</h3>
              <div className="qr-modal-input-wrap">
                <label htmlFor="qr-count-modal">Number of QR Codes</label>
                <input
                  id="qr-count-modal"
                  type="number"
                  min={1}
                  max={500}
                  value={qrCount}
                  onChange={(e) => setQrCount(e.target.value)}
                  className="qr-count-input"
                />
              </div>
              <p className="confirm-modal-message">
                Are you sure you want to generate{" "}
                <strong className="qr-confirm-number">{displayCount}</strong> QR
                code
                {displayCount === 1 ? "" : "s"}?
              </p>
              <div className="confirm-modal-actions">
                <button
                  className="confirm-modal-btn cancel"
                  onClick={handleCloseModal}
                >
                  <CancelIcon /> Cancel
                </button>
                <button
                  className="confirm-modal-btn confirm qr-confirm-btn"
                  onClick={handleConfirmGenerate}
                >
                  <QRIcon /> Generate {displayCount} QR Code
                  {displayCount === 1 ? "" : "s"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="results-section">
          <div className="results-header">
            <h3>
              QR Codes ({filteredQRCodes.length}
              {filteredQRCodes.length !== allQRCodes.length
                ? ` of ${allQRCodes.length}`
                : ""}
              )
            </h3>
            <div className="results-header-actions">
              <button
                className="icon-btn icon-btn-generate"
                onClick={handleGenerateClick}
              >
                <QRIcon /> <span>Generate QR</span>
              </button>
              <button className="icon-btn" onClick={handlePrintOrDownload}>
                <PrintIcon /> <span>Print</span>
              </button>
              <button className="icon-btn" onClick={handlePrintOrDownload}>
                <DownloadIcon /> <span>Download</span>
              </button>
              <div className="qr-view-toggle">
                <button
                  type="button"
                  className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid view"
                >
                  <GridIcon />
                </button>
                <button
                  type="button"
                  className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                  title="List view"
                >
                  <ListIcon />
                </button>
              </div>
            </div>
          </div>

          <div className="qr-filters">
            <div className="qr-filter-search">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search by QR code..."
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
                  className={`qr-filter-btn ${linkFilter === "all" ? "active" : ""}`}
                  onClick={() => setLinkFilter("all")}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`qr-filter-btn ${linkFilter === "linked" ? "active" : ""}`}
                  onClick={() => setLinkFilter("linked")}
                >
                  Linked
                </button>
                <button
                  type="button"
                  className={`qr-filter-btn ${linkFilter === "unlinked" ? "active" : ""}`}
                  onClick={() => setLinkFilter("unlinked")}
                >
                  Unlinked
                </button>
              </div>
            </div>
          </div>

          {viewMode === "list" ? (
            <div className="qr-table-wrap">
              <table className="qr-table">
                <thead>
                  <tr>
                    <th>QR</th>
                    <th>Code</th>
                    <th>Generated At</th>
                    <th>Status</th>
                    <th>Linked To</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQRCodes.map((qr) => (
                    <tr key={qr.id}>
                      <td>
                        <div className="qr-placeholder-cell">
                          <QRCodeSVG
                            value={getQrValue(qr)}
                            size={48}
                            level="M"
                          />
                        </div>
                      </td>
                      <td className="qr-code-cell">{qr.code}</td>
                      <td>{qr.timestamp}</td>
                      <td>
                        <span
                          className={`qr-status-badge ${qr.linked ? "linked" : "unlinked"}`}
                        >
                          {qr.linked ? "Linked" : "Unlinked"}
                        </span>
                      </td>
                      <td>{qr.linked && qr.linkedTo ? qr.linkedTo : "—"}</td>

                      <td>
                        <button
                          type="button"
                          className="qr-download-single-btn"
                          onClick={() => handleDownloadSingle(qr)}
                          title="Download"
                        >
                          <DownloadIcon /> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="qr-display qr-grid qr-grid-tags">
              {filteredQRCodes.map((qr) => (
                <div key={qr.id} className="qr-item qr-item-tag">
                  <ParkingTag code={qr.code} qrValue={getQrValue(qr)} />
                  <div className="qr-item-content qr-tag-meta">
                    <p className="qr-code">{qr.code}</p>
                    <div className="qr-card-badge-row">
                      <span
                        className={`qr-status-badge ${qr.linked ? "linked" : "unlinked"}`}
                      >
                        {qr.linked ? "Linked" : "Unlinked"}
                      </span>
                      <button
                        type="button"
                        className="qr-download-single-btn"
                        onClick={() => handleDownloadSingle(qr)}
                        title="Download"
                      >
                        <DownloadIcon /> Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QRManagementPage;

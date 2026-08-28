import * as React from "react";

export const styles: { [key: string]: React.CSSProperties } = {
  page: {
    fontFamily: '"Segoe UI", Arial, sans-serif',
    backgroundColor: "#f4f8fb",
    minHeight: "100%",
    padding: "24px",
    boxSizing: "border-box"
  },
  header: {
    background: "linear-gradient(135deg, #007f86, #12343b)",
    color: "#ffffff",
    padding: "28px 32px",
    borderRadius: "12px",
    marginBottom: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    position: "relative"
  },
  headerTitle: {
    margin: "0 0 8px 0",
    fontSize: "28px",
    fontWeight: 600
  },
  headerSubtitle: {
    margin: 0,
    fontSize: "15px",
    opacity: 0.9
  },
  userBadge: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "12px",
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 5
  },
  avatarButton: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.85)",
    backgroundColor: "#ffffff",
    color: "#007f86",
    fontSize: "17px",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.18)"
  },
  profilePanel: {
    position: "absolute",
    top: "64px",
    right: "0",
    width: "210px",
    padding: "14px",
    backgroundColor: "#ffffff",
    color: "#12343b",
    borderRadius: "8px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    zIndex: 10,
    textAlign: "left"
  },
  rightArea: {
    position: "relative",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    zIndex: 5
  },
  rightRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "12px"
  },
  profileName: {
    margin: 0,
    fontSize: "15px",
    fontWeight: 600,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  profileLabel: {
    margin: "5px 0 0",
    color: "#52666d",
    fontSize: "12px"
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "28px"
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    border: "1px solid #e5e5e5"
  },
  statNumber: {
    fontSize: "30px",
    fontWeight: 700,
    color: "#007f86",
    marginBottom: "5px"
  },
  statLabel: {
    color: "#52666d",
    fontSize: "14px"
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
  },
  sectionTitle: {
    margin: "0 0 20px 0",
    fontSize: "21px",
    color: "#12343b",
    fontWeight: 600
  },
  filterContainer: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    marginBottom: "24px"
  },
  trainingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },
  trainingCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #d9e2e7",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
  },
  trainingHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "12px"
  },
  trainingTitle: {
    margin: 0,
    color: "#12343b",
    fontSize: "19px",
    fontWeight: 600
  },
  activeBadge: {
    backgroundColor: "#dff6dd",
    color: "#107c10",
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "12px",
    fontWeight: 600,
    whiteSpace: "nowrap"
  },
  inactiveBadge: {
    backgroundColor: "#fde7e9",
    color: "#a4262c",
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "12px",
    fontWeight: 600,
    whiteSpace: "nowrap"
  },
  description: {
    color: "#52666d",
    fontSize: "14px",
    lineHeight: "1.5",
    minHeight: "63px",
    marginBottom: "16px"
  },
  details: {
    borderTop: "1px solid #d9e2e7",
    paddingTop: "14px",
    marginBottom: "18px"
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    padding: "6px 0",
    fontSize: "13px"
  },
  detailLabel: {
    color: "#52666d",
    fontWeight: 600
  },
  detailValue: {
    color: "#12343b",
    textAlign: "right"
  },
  noResults: {
    textAlign: "center",
    padding: "50px 20px",
    color: "#52666d"
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modal: {
    backgroundColor: "#ffffff",
    width: "90%",
    maxWidth: "500px",
    borderRadius: "12px",
    padding: "28px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
  },
  modalTitle: {
    margin: "0 0 20px 0",
    fontSize: "23px",
    color: "#323130"
  },
  modalTraining: {
    backgroundColor: "#edf7f7",
    borderLeft: "4px solid #007f86",
    padding: "15px",
    marginBottom: "20px"
  },
  modalDetail: {
    margin: "8px 0",
    fontSize: "14px",
    color: "#12343b"
  },
  modalButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "25px"
  },
  footer: {
    textAlign: "center",
    color: "#8a8886",
    fontSize: "12px",
    marginTop: "30px"
  }
};

export default styles;

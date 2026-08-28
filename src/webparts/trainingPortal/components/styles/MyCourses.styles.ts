// eslint-disable-next-line @typescript-eslint/no-explicit-any
const styles: { [key: string]: any } = {
  root: {},
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px",
    marginBottom: "24px"
  },
  statCard: {
    padding: "14px 16px",
    borderRadius: 6
  },
  enrolledCard: {
    backgroundColor: "#edf7f7",
    borderLeft: "4px solid #007f86"
  },
  avgCard: {
    backgroundColor: "#f3f8fd",
    borderLeft: "4px solid #0078d4"
  },
  completedCard: {
    backgroundColor: "#f1faf0",
    borderLeft: "4px solid #107c10"
  },
  overviewBox: {
    border: "1px solid #d9e2e7",
    padding: "18px",
    marginBottom: "24px",
    backgroundColor: "#fbfdfd"
  },
  overviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: "12px",
    marginBottom: "16px"
  },
  progressList: {
    display: "flex",
    alignItems: "flex-end",
    gap: "12px",
    height: "150px",
    overflowX: "auto",
    padding: "8px 4px 0"
  },
  progressButton: (isSelected: boolean = false) => ({
    border: isSelected ? "2px solid #007f86" : "1px solid #d9e2e7",
    backgroundColor: isSelected ? "#edf7f7" : "#ffffff",
    minWidth: "74px",
    height: "134px",
    padding: "8px 6px 6px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center"
  }),
  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },
  courseCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e1dfdd",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
  },
  courseHeader: {
    margin: "0 0 12px 0",
    color: "#323130",
    fontSize: "19px",
    fontWeight: 600
  },
  progressContainer: { marginBottom: "18px" },
  progressBarOuter: {
    height: "10px",
    backgroundColor: "#edebe9",
    borderRadius: "5px",
    overflow: "hidden"
  },
  progressBarInner: (pct: number = 0) => ({
    width: `${pct}%`,
    height: "100%",
    backgroundColor: pct === 100 ? "#107c10" : "#0078d4",
    transition: "width 300ms ease"
  }),
  modulesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "7px"
  },
  moduleLabel: (isComplete: boolean = false) => ({
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "7px 8px",
    backgroundColor: isComplete ? "#f1faf0" : "#f8fafb",
    color: isComplete ? "#107c10" : "#52666d",
    fontSize: "12px",
    cursor: "pointer"
  }),
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    padding: "6px 0",
    fontSize: "13px"
  },
  cancelButton: {
    width: "100%",
    borderRadius: "6px"
  }
};

export default styles;

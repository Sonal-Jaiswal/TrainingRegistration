// eslint-disable-next-line @typescript-eslint/no-explicit-any
const styles: { [key: string]: any } = {
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #d9e2e7",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12
  },
  title: {
    margin: 0,
    color: "#12343b",
    fontSize: 19,
    fontWeight: 600
  },
  badgeActive: {
    backgroundColor: "#dff6dd",
    color: "#107c10",
    padding: "5px 10px",
    borderRadius: 15,
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "nowrap"
  },
  badgeInactive: {
    backgroundColor: "#fde7e9",
    color: "#a4262c",
    padding: "5px 10px",
    borderRadius: 15,
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "nowrap"
  },
  description: {
    color: "#52666d",
    fontSize: 14,
    lineHeight: 1.5,
    minHeight: 63,
    marginBottom: 16
  },
  details: {
    borderTop: "1px solid #d9e2e7",
    paddingTop: 14,
    marginBottom: 18
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    padding: "6px 0",
    fontSize: 13
  },
  detailLabel: {
    color: "#52666d",
    fontWeight: 600
  },
  detailValue: {
    color: "#12343b",
    textAlign: "right"
  },
  enrollButton: {
    width: "100%",
    borderRadius: "6px"
  }
};

export default styles;

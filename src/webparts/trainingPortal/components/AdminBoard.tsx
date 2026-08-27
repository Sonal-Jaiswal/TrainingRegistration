import * as React from "react";
import { DefaultButton } from "@fluentui/react";
import { IEnrollment, ITraining } from "./TrainingModels";

interface IProps {
  trainings: ITraining[];
  enrollments: IEnrollment[];
  userRole: string;
  submitting: boolean;
  onDeleteTraining: (t: ITraining) => void;
}

const AdminBoard: React.FC<IProps> = ({ trainings, enrollments, userRole, submitting, onDeleteTraining }) => {
  return (
    <div style={{ backgroundColor: "#ffffff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", marginBottom: 24 }}>
      <h2 style={{ margin: 0, fontSize: 21, color: "#12343b", fontWeight: 600 }}>Admin Board</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 20, marginBottom: 20 }}>
        <div style={{ backgroundColor: "#ffffff", borderRadius: 10, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid #e5e5e5" }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#007f86", marginBottom: 5 }}>{enrollments.length}</div>
          <div style={{ color: "#52666d", fontSize: 14 }}>Total Registrations</div>
        </div>
        <div style={{ backgroundColor: "#ffffff", borderRadius: 10, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid #e5e5e5" }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#007f86", marginBottom: 5 }}>{enrollments.filter(e => e.Status.toLowerCase() !== "cancelled").length}</div>
          <div style={{ color: "#52666d", fontSize: 14 }}>Active Registrations</div>
        </div>
        <div style={{ backgroundColor: "#ffffff", borderRadius: 10, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid #e5e5e5" }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#007f86", marginBottom: 5 }}>{enrollments.filter(e => e.CompletionStatus.toLowerCase() === "completed").length}</div>
          <div style={{ color: "#52666d", fontSize: 14 }}>Completed Courses</div>
        </div>
      </div>

      <h3 style={{ fontSize: 18, color: "#12343b", marginBottom: 12 }}>Training Management</h3>
      <div style={{ overflowX: "auto", marginBottom: 28 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "2px solid #d9e2e7" }}>
              <th style={{ padding: 10 }}>Training</th>
              <th style={{ padding: 10 }}>Status</th>
              <th style={{ padding: 10 }}>Seats</th>
              <th style={{ padding: 10 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map(t => (
              <tr key={t.Id} style={{ borderBottom: "1px solid #edebe9" }}>
                <td style={{ padding: 10 }}>{t.TrainingName}</td>
                <td style={{ padding: 10 }}>{t.Status}</td>
                <td style={{ padding: 10 }}>{t.AvailableSeats}</td>
                <td style={{ padding: 10 }}>{userRole === "Admin" && <DefaultButton text="Delete" disabled={submitting} onClick={() => onDeleteTraining(t)} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: 18, color: "#12343b", marginBottom: 12 }}>All Registrations</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "2px solid #d9e2e7" }}>
              <th style={{ padding: 10 }}>Employee</th>
              <th style={{ padding: 10 }}>Training</th>
              <th style={{ padding: 10 }}>Status</th>
              <th style={{ padding: 10 }}>Completion</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map(e => (
              <tr key={e.Id} style={{ borderBottom: "1px solid #edebe9" }}>
                <td style={{ padding: 10 }}>{e.Employee}</td>
                <td style={{ padding: 10 }}>{e.Training}</td>
                <td style={{ padding: 10 }}>{e.Status}</td>
                <td style={{ padding: 10 }}>{e.CompletionStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBoard;

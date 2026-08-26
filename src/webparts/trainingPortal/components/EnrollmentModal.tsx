import * as React from "react";
import { PrimaryButton, DefaultButton } from "@fluentui/react";
import { ITraining } from "./TrainingModels";

interface IProps {
  selectedTraining: ITraining | null; // eslint-disable-line @rushstack/no-new-null
  employeeName: string;
  submitting: boolean;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
}

const EnrollmentModal: React.FC<IProps> = ({ selectedTraining, employeeName, submitting, onConfirm, onCancel }) => {
  // eslint-disable-next-line @rushstack/no-new-null
  if (!selectedTraining) return null;
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.45)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
      <div style={{ backgroundColor: "#ffffff", width: "90%", maxWidth: 500, borderRadius: 12, padding: 28, boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}>
        <h2 style={{ margin: "0 0 20px 0", fontSize: 23, color: "#323130" }}>Confirm Enrollment</h2>
        <div style={{ backgroundColor: "#edf7f7", borderLeft: "4px solid #007f86", padding: 15, marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 12px 0", color: "#007f86" }}>{selectedTraining.TrainingName}</h3>
          <p style={{ margin: 8, fontSize: 14, color: "#12343b" }}><strong>Category:</strong> {selectedTraining.Category}</p>
          <p style={{ margin: 8, fontSize: 14, color: "#12343b" }}><strong>Trainer:</strong> {selectedTraining.Trainer}</p>
          <p style={{ margin: 8, fontSize: 14, color: "#12343b" }}><strong>Date:</strong> {selectedTraining.TrainingDate ? new Date(selectedTraining.TrainingDate).toLocaleDateString() : "Not specified"}</p>
          <p style={{ margin: 8, fontSize: 14, color: "#12343b" }}><strong>Available Seats:</strong> {selectedTraining.AvailableSeats}</p>
        </div>
        <p style={{ margin: 0 }}><strong>Employee:</strong> {employeeName}</p>
        <p style={{ fontSize: 13, color: "#52666d" }}>Your enrollment will be saved directly to the SharePoint Enrollments-SAR list.</p>
        <div style={{ display: "flex", gap: 12, marginTop: 25 }}>
          <PrimaryButton text={submitting ? "Submitting..." : "Confirm Enrollment"} disabled={submitting} onClick={() => onConfirm()} />
          <DefaultButton text="Cancel" disabled={submitting} onClick={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;

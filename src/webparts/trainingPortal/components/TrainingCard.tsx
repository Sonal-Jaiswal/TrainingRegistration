import * as React from "react";
import { PrimaryButton } from "@fluentui/react";
import { ITraining } from "./TrainingModels";
import styles from "./styles/TrainingCard.styles";

interface IProps {
  training: ITraining;
  userRole: string;
  onEnroll: (t: ITraining) => void;
  isEnrolled?: boolean;
}

const TrainingCard: React.FC<IProps> = ({ training, userRole, onEnroll, isEnrolled }) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{training.TrainingName}</h3>
        <span style={training.Status.toLowerCase() === "active" ? styles.badgeActive : styles.badgeInactive}>{training.Status}</span>
      </div>
      <p style={styles.description}>{training.Description}</p>
      <div style={styles.details}>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Category</span>
          <span style={styles.detailValue}>{training.Category}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Trainer</span>
          <span style={styles.detailValue}>{training.Trainer}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Training Date</span>
          <span style={styles.detailValue}>{training.TrainingDate ? new Date(training.TrainingDate).toLocaleDateString() : "Not specified"}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Available Seats</span>
          <span style={{ ...styles.detailValue, fontWeight: 600 }}>{training.AvailableSeats}</span>
        </div>
      </div>

      {userRole === "Employee" && (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <PrimaryButton
          text={isEnrolled ? "Already Enrolled" : (training.AvailableSeats > 0 ? "Enroll Now" : "Fully Booked")}
          disabled={isEnrolled || training.AvailableSeats <= 0}
          onClick={() => onEnroll(training)}
          styles={{ root: styles.enrollButton as any }}
        />
      )}
    </div>
  );
};

export default TrainingCard;

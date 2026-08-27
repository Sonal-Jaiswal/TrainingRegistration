import * as React from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react";
import styles from "./styles/TrainingDashboard.styles";

interface IHeaderProps {
  userRole: string;
  employeeName: string;
  employeeInitials: string;
  showProfile: boolean;
  setShowProfile: (v: boolean) => void;
  showMyCourses: boolean;
  toggleMyCourses: () => void;
  showAdminBoard: boolean;
  toggleAdminBoard: () => void;
  onOpenTrainingForm: () => void;
  setError: (msg: string) => void;
}

const Header: React.FC<IHeaderProps> = ({
  userRole,
  employeeName,
  employeeInitials,
  showProfile,
  setShowProfile,
  showMyCourses,
  toggleMyCourses,
  showAdminBoard,
  toggleAdminBoard,
  onOpenTrainingForm,
  setError
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
      <div>
        <h1 style={styles.headerTitle}>{userRole} Training Dashboard</h1>
        <p style={styles.headerSubtitle}>Discover and enroll in internal training programs as a {userRole.toLowerCase()}</p>
      </div>

      <div style={styles.rightArea}>
        <div style={styles.rightRow}>
          <button
            type="button"
            aria-label="Open profile"
            title={employeeName || "Open profile"}
            onClick={() => setShowProfile(!showProfile)}
            style={styles.avatarButton}
          >
            {employeeInitials}
          </button>

          {userRole !== "Admin" && (
            <div style={{ marginLeft: 12 }}>
              <DefaultButton text={showMyCourses ? "All Trainings" : "My Courses"} onClick={toggleMyCourses} styles={{ root: { borderRadius: "6px" } }} />
            </div>
          )}

          {userRole === "Admin" && (
            <div style={{ marginLeft: 12, display: "flex", gap: 8 }}>
              <DefaultButton text={showAdminBoard ? "Training Catalog" : "Admin Board"} onClick={() => { toggleAdminBoard(); }} styles={{ root: { borderRadius: "6px" } }} />
              <PrimaryButton text="Create Training" onClick={onOpenTrainingForm} />
            </div>
          )}
        </div>

        {showProfile && (
          <div style={styles.profilePanel}>
            <p style={styles.profileName}>{employeeName || "User"}</p>
            <p style={styles.profileLabel}>Role: {userRole}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

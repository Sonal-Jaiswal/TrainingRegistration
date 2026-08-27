import * as React from "react";
import { DefaultButton } from "@fluentui/react";
import { UserRole } from "../TrainingModels";

export interface IDashboardHeaderProps {
 userRole: UserRole;
 employeeName: string;
 employeeInitials: string;
 showProfile: boolean;
 showMyCourses: boolean;
 showAdminBoard: boolean;
 onToggleProfile: () => void;
 onToggleMyCourses: () => void;
 onToggleAdminBoard: () => void;
}

const styles: { [key: string]: React.CSSProperties } = {
 header: { background: "linear-gradient(135deg, #007f86, #12343b)", color: "#ffffff", padding: "28px 32px", borderRadius: "12px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", boxShadow: "0 4px 12px rgba(0,0,0,0.12)" },
 title: { margin: "0 0 8px 0", fontSize: "28px", fontWeight: 600 },
 subtitle: { margin: 0, fontSize: "15px", opacity: 0.9 },
 badge: { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", position: "relative" },
 avatar: { width: "52px", height: "52px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.85)", backgroundColor: "#ffffff", color: "#007f86", fontSize: "17px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" },
 profile: { position: "absolute", top: "64px", right: 0, width: "210px", padding: "14px", backgroundColor: "#ffffff", color: "#12343b", borderRadius: "8px", boxShadow: "0 8px 20px rgba(0,0,0,0.2)", zIndex: 10, textAlign: "left" },
 name: { margin: 0, fontSize: "15px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
 role: { margin: "5px 0 0", color: "#52666d", fontSize: "12px" }
};

const DashboardHeader: React.FC<IDashboardHeaderProps> = (props) => (
 <div style={styles.header}>
   <div>
     <h1 style={styles.title}>{props.userRole} Training Dashboard</h1>
     <p style={styles.subtitle}>Discover and enroll in internal training programs as a {props.userRole.toLowerCase()}</p>
   </div>
   <div style={styles.badge}>
     <button type="button" aria-label="Open profile" title={props.employeeName || "Open profile"} onClick={props.onToggleProfile} style={styles.avatar}>{props.employeeInitials}</button>
     {props.showProfile && <div style={styles.profile}><p style={styles.name}>{props.employeeName || "User"}</p><p style={styles.role}>Role: {props.userRole}</p></div>}
     {props.userRole !== "Admin" && <DefaultButton text={props.showMyCourses ? "All Trainings" : "My Courses"} onClick={props.onToggleMyCourses} />}
     {props.userRole === "Admin" && <DefaultButton text={props.showAdminBoard ? "Training Catalog" : "Admin Board"} onClick={props.onToggleAdminBoard} />}
   </div>
 </div>
);

export default DashboardHeader;

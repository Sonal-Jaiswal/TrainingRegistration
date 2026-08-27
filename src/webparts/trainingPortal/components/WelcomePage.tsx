import * as React from "react";
import { PrimaryButton } from "@fluentui/react";
import welcomeImage from "../assets/welcome-light.png";

// Defines the action supplied by the web part when the user opens the dashboard.
export interface IWelcomePageProps {
 onOpenDashboard: () => void;
}

// Displays the first screen users see before entering the training dashboard.
const WelcomePage: React.FC<IWelcomePageProps> = (props) => {
 return (
<div style={{
  width: "100%",
  minHeight: "100%",
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
  padding: "24px",
     boxSizing: "border-box",
  overflow: "hidden",
     background: "linear-gradient(135deg, #f4f8fb 0%, #ffffff 55%, #e7f3f5 100%)",
     fontFamily: '"Segoe UI", Arial, sans-serif'
   }}>
<div style={{
       width: "100%",
       maxWidth: "1050px",
       display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
       alignItems: "center",
       gap: "56px",
      padding: "clamp(24px, 5vw, 48px)",
       boxSizing: "border-box",
       backgroundColor: "#ffffff",
       border: "1px solid #d9e2e7",
       borderRadius: "16px",
       boxShadow: "0 14px 40px rgba(0, 66, 81, 0.12)"
     }}>
<div>
       {/* Capgemini wordmark and star-inspired brand accent. */}
<div style={{
         display: "flex",
         alignItems: "center",
         gap: "10px",
         marginBottom: "34px",
         color: "#007f86"
       }}>
<span style={{
           fontSize: "30px",
           lineHeight: 1,
           fontWeight: 700
         }}>
         ✦
</span>
<span style={{
           fontSize: "24px",
           fontWeight: 700,
           letterSpacing: "0.5px"
         }}>
         Capgemini
</span>
</div>

<h1 style={{
         margin: "0 0 16px 0",
         color: "#12343b",
         fontSize: "42px",
         lineHeight: 1.1,
         fontWeight: 700
       }}>
       Employee Learning Hub
</h1>
<p style={{
         margin: "0 0 30px 0",
         color: "#52666d",
         fontSize: "17px",
         lineHeight: 1.6
       }}>
       Explore internal training opportunities, manage your enrollments, and track your learning progress.
</p>

<PrimaryButton
       text="Open Training Dashboard"
       onClick={props.onOpenDashboard}
       styles={{
         root: {
           minHeight: "44px",
           padding: "0 22px",
           borderRadius: "6px",
           backgroundColor: "#007f86",
           borderColor: "#007f86"
         },
         rootHovered: {
           backgroundColor: "#00666c",
           borderColor: "#00666c"
         }
       }}
     />
</div>

<div style={{
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
      minHeight: "220px",
       backgroundColor: "#edf7f7",
       borderRadius: "12px",
       padding: "24px"
     }}>
<img
       src={welcomeImage}
       alt="Employees learning together"
       style={{
         width: "100%",
         maxWidth: "420px",
         height: "auto"
       }}
     />
</div>
</div>
</div>
 );
};

export default WelcomePage;

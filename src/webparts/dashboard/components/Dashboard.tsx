// import * as React from "react";

// import {
//   Pivot,
//   PivotItem
// } from "@fluentui/react";

// import WelcomeBanner from "./WelcomeBanner";
// import DashboardStats from "./DashboardStats";
// import AvailableTrainings from "./AvailableTrainings";
// import MyRegistrations from "./MyRegistrations";

// import styles from "./Dashboard.module.scss";

// import { IDashboardProps } from "./IDashboardProps";

// const Dashboard: React.FC<IDashboardProps> = ({
//   sp,
//   userName,
//   userEmail
// }) => {

//   return (
//     <div className={styles.dashboardContainer}>

//       <h1 className={styles.pageTitle}>
//         Employee Training Enrollment Portal
//       </h1>

//       <WelcomeBanner
//         userName={userName}
//       />

//       <DashboardStats
//         sp={sp}
//         userEmail={userEmail}
//       />

//       <div className={styles.sectionCard}>

//         <Pivot>

//           <PivotItem
//             headerText="Available Trainings"
//           >
//             <div style={{ marginTop: "10px" }}>
//               <AvailableTrainings
//                 sp={sp}
//                 userName={userName}
//                 userEmail={userEmail}
//               />
//             </div>
//           </PivotItem>

//           <PivotItem
//             headerText="My Registrations"
//           >
//             <div style={{ marginTop: "10px" }}>
//               <MyRegistrations
//                 sp={sp}
//                 userEmail={userEmail}
//               />
//             </div>
//           </PivotItem>

//         </Pivot>

//       </div>

//     </div>
//   );
// };

// export default Dashboard;

import * as React from "react";

import {
  Pivot,
  PivotItem
} from "@fluentui/react";

import WelcomeBanner from "./WelcomeBanner";
import DashboardStats from "./DashboardStats";
import AvailableTrainings from "./AvailableTrainings";
import MyRegistrations from "./MyRegistrations";

import styles from "./Dashboard.module.scss";

import { IDashboardProps } from "./IDashboardProps";

const Dashboard: React.FC<IDashboardProps> = ({
  sp,
  userName,
  userEmail
}) => {

  return (
    <div className={styles.dashboardContainer}>

      <div className={styles.headerCard}>

  <div>

    <h1 className={styles.pageTitle}>
      Employee Training Portal
    </h1>

    {/* <div className={styles.pageSubTitle}>
      Learn • Upskill • Grow
    </div>

  </div>

  <div className={styles.userBadge}>
    👤 {userName}
  </div> */}

</div>

      {/* <div className={styles.quoteCard}>
        <div className={styles.quoteText}>
          Learning today. Leading tomorrow.
        </div>

        <div className={styles.quoteAuthor}>
          Capgemini Learning & Development
        </div>
      </div> */}

      <WelcomeBanner
        userName={userName}
      />

      <DashboardStats
        sp={sp}
        userEmail={userEmail}
      />

      <div className={styles.sectionCard}>

<Pivot
  linkFormat="tabs"
  linkSize="large"
>

  <PivotItem
    headerText="📚 Available Trainings"
  >
    <AvailableTrainings
      sp={sp}
      userName={userName}
      userEmail={userEmail}
    />
  </PivotItem>

  <PivotItem
    headerText="🎓 My Registrations"
  >
    <MyRegistrations
      sp={sp}
      userEmail={userEmail}
    />
  </PivotItem>

</Pivot>

      </div>

    </div>
  );
};

export default Dashboard;
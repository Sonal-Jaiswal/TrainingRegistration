import * as React from "react";

import {
 TextField,
 Dropdown,
 IDropdownOption,
 MessageBar,
 MessageBarType,
 Spinner,
 SpinnerSize
} from "@fluentui/react";

import { ITrainingPortalProps } from "./ITrainingPortalProps";

import MyCourses from "./MyCourses";

import {
 IEnrollment,
 ITraining,
 UserRole
} from "./TrainingModels";

import {
 TrainingService
} from "./TrainingService";

import {
 getTrainings,
 getEnrollments
} from "../services/TrainingDataService";

import {
 enrollCurrentUser,
 cancelEnrollment
} from "../services/EnrollmentService";

// Creates a PnPjs client connected to the current SharePoint site.
import { spfi, SPFI, SPFx } from "@pnp/sp";

// Registers the SharePoint APIs used by this component.
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";


// Main component for browsing, enrolling in, and managing trainings.
import Header from "./Header";
import TrainingList from "./TrainingList";
import EnrollmentModal from "./EnrollmentModal";
import TrainingForm from "./TrainingForm";
import AdminBoard from "./AdminBoard";
import styles from "./styles/TrainingDashboard.styles";

const TrainingPortal: React.FC<ITrainingPortalProps> = (props) => {
 // Stores the configured PnPjs client for SharePoint requests.
 const [sp, setSp] = React.useState<SPFI | null>(null);

 const [trainings, setTrainings] =
   React.useState<ITraining[]>([]);

 const [enrollments, setEnrollments] =
   React.useState<IEnrollment[]>([]);

 const [loading, setLoading] =
   React.useState<boolean>(true);

 const [submitting, setSubmitting] =
   React.useState<boolean>(false);

   const [error, setError] =
   React.useState<string>("");

 const [success, setSuccess] =
   React.useState<string>("");

 const [searchText, setSearchText] =
   React.useState<string>("");

 const [selectedCategory, setSelectedCategory] =
   React.useState<string>("All");

 const [selectedTraining, setSelectedTraining] =
   React.useState<ITraining | null>(null);

 // (modal visibility is driven by `selectedTraining`)

 const [showMyCourses, setShowMyCourses] =
   React.useState<boolean>(false);

 const [showAdminBoard, setShowAdminBoard] =
   React.useState<boolean>(false);

 const [employeeName, setEmployeeName] =
   React.useState<string>("");

  const [currentUserId, setCurrentUserId] = React.useState<number | null>(null);

 const [userRole, setUserRole] =
   React.useState<UserRole>("Employee");

 const [showProfile, setShowProfile] =
   React.useState<boolean>(false);

 const [showTrainingForm, setShowTrainingForm] =
   React.useState<boolean>(false);

 const [trainingForm, setTrainingForm] =
   React.useState<Omit<ITraining, "Id">>({
     TrainingName: "",
     Description: "",
     Category: "",
     Trainer: "",
     TrainingDate: "",
     AvailableSeats: 0,
     Status: "Active"
   });

 const trainingCategoryOptions: IDropdownOption[] = [
   { key: "Cloud", text: "Cloud" },
   { key: "Analytics", text: "Analytics" },
   { key: "Database", text: "Database" },
   { key: "Security", text: "Security" },
   { key: "AI", text: "AI" },
   { key: "Others", text: "Others" }
 ];

const employeeInitials: string = employeeName
   .split(" ")
   .filter((namePart: string) => namePart.length > 0)
   .map((namePart: string) => namePart.charAt(0).toUpperCase())
   .slice(0, 2)
   .join("") || "U";

 // Creates a PnPjs client whenever the SharePoint context changes.
 React.useEffect(() => {
   const spInstance: SPFI =
     spfi().using(
       SPFx(props.context)
     );
   setSp(spInstance);
 }, [props.context]);

 const loadTrainings = async (spInstance: SPFI): Promise<void> => {
   setTrainings(await getTrainings(spInstance));
 };

 const loadEnrollments = async (spInstance: SPFI): Promise<void> => {
   setEnrollments(await getEnrollments(spInstance));
 };

 // Loads the current user, trainings, and enrollments when SharePoint is ready.
 React.useEffect(() => {
   if (!sp) {
     return;
   }
   const loadData = async (): Promise<void> => {
     try {
       setLoading(true);
       setError("");
  
       const currentUser =
         await sp.web.currentUser();
       setEmployeeName(
         currentUser.Title || ""
       );
      setCurrentUserId(currentUser.Id || null);
       const trainingService: TrainingService =
         new TrainingService(sp);
       const role: UserRole =
         await trainingService.getCurrentUserRole();
       setUserRole(role);
    
       if (role === "Admin") {
         setShowAdminBoard(true);
         setShowMyCourses(false);
       }
  
       await loadTrainings(sp);
       await loadEnrollments(sp);
     }
     catch (err) {
       console.error(
         "SharePoint loading error:",
         err
       );
       setError(
         "Unable to load data from SharePoint. Please check the list names and column internal names."
       );
     }
     finally {
       setLoading(false);
     }
   };
    loadData().catch((error) => {
      console.error("Error occurred while loading data:", error);
    });
 }, [sp]);

 // Builds the category dropdown from the categories present in the data.
 const categories: IDropdownOption[] = [
   {
     key: "All",
     text: "All Categories"
   }
 ];
 trainings.forEach(
   (training: ITraining) => {
     if (
       training.Category &&
       categories.filter(
         (category) =>
           category.key ===
           training.Category
       ).length === 0
     ) {
       categories.push({
         key: training.Category,
         text: training.Category
       });
     }
   }
 );

 // Filters trainings by the search text and selected category.
 const filteredTrainings =
   trainings.filter(
     (training: ITraining) => {
       const search: string =
         searchText
           .toLowerCase()
           .trim();
       const trainingName: string =
         training.TrainingName
           .toLowerCase();
       const description: string =
         training.Description
           .toLowerCase();
       const matchesSearch: boolean =
         search === "" ||
         trainingName.indexOf(search) !== -1 ||
         description.indexOf(search) !== -1;
       const matchesCategory: boolean =
         selectedCategory === "All" ||
         training.Category ===
         selectedCategory;
       return (
         matchesSearch &&
         matchesCategory
       );
     }
   );

 // Calculates the summary values shown above the catalog.
 const totalTrainings: number =
   trainings.length;
 const activeTrainings: number =
   trainings.filter(
     (training: ITraining) =>
       training.Status
         .toLowerCase() === "active"
   ).length;
 const totalSeats: number =
   trainings.reduce(
     (
       total: number,
       training: ITraining
     ) =>
       total +
       training.AvailableSeats,
     0
   );
 const myCourses: IEnrollment[] =
   enrollments.filter(
     (enrollment: IEnrollment) =>
       enrollment.Employee === employeeName &&
       enrollment.Status.toLowerCase() !==
       "cancelled"
   );

// Set of training IDs the current user is enrolled in (non-cancelled)
const enrolledTrainingIds: number[] = enrollments
  .filter((e: IEnrollment) => (currentUserId ? e.EmployeeId === currentUserId : e.Employee === employeeName) && e.Status.toLowerCase() !== "cancelled")
  .map((e: IEnrollment) => e.TrainingId);

 // Opens enrollment confirmation unless the training has no available seats.
 const openEnrollment =
   (training: ITraining): void => {
     if (
       training.AvailableSeats <= 0
     ) {
       setError(
         "There are no available seats for this training."
       );
       return;
     }
    setSelectedTraining(training);
     setError("");
     setSuccess("");
   };

 // Creates an enrollment and decreases the selected training's seat count.
 const submitEnrollment =
   async (): Promise<void> => {
     if (!sp) {
       return;
     }
     if (!selectedTraining) {
       setError(
         "Please select a training."
       );
       return;
     }
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");
      // remember the training name so we can show a success message after closing the modal
      const enrolledName = selectedTraining.TrainingName;
      // close the modal immediately so it disappears right after the user confirms
      setSelectedTraining(null);

      await enrollCurrentUser(
        sp,
        selectedTraining.Id,
        enrolledName
      );

      // reload data
      await loadTrainings(sp);
      await loadEnrollments(sp);

      // success
      setSuccess("Successfully enrolled in " + enrolledName + ".");
    }
     catch (err) {
       console.error(
         "Enrollment error:",
         err
       );
       const enrollmentError: string = err instanceof Error
         ? err.message
         : "Enrollment failed. Please verify the SharePoint lookup columns, internal names and permissions.";
       setError(enrollmentError);
     }
     finally {
       setSubmitting(false);
     }
   };

 // Cancels an enrollment and returns its seat to the training.
 const cancelCourse =
   async (enrollment: IEnrollment): Promise<void> => {
     if (!sp || enrollment.TrainingId <= 0) {
       return;
     }
     try {
       setSubmitting(true);
       setError("");
       setSuccess("");

       await cancelEnrollment(sp, enrollment.Id, enrollment.TrainingId);

       await loadTrainings(sp);
       await loadEnrollments(sp);
       setSuccess(
         "Your enrollment for " +
         enrollment.Training +
         " has been cancelled."
       );
     }
     catch (err) {
       console.error("Cancellation error:", err);
       setError(
         "Cancellation failed. Please verify your SharePoint permissions."
       );
     }
     finally {
       setSubmitting(false);
     }
   };

 const deleteTraining = async (training: ITraining): Promise<void> => {
   if (!sp || userRole !== "Admin" ||
     !window.confirm("Delete this training?")) {
     return;
   }

   try {
     setSubmitting(true);
     const trainingService: TrainingService = new TrainingService(sp);
     await trainingService.deleteTraining(training.Id, userRole);
     await loadTrainings(sp);
     setSuccess("Training deleted successfully.");
   }
   catch (err) {
     console.error("Training deletion error:", err);
     setError("Unable to delete this training.");
   }
   finally {
     setSubmitting(false);
   }
 };

 const openTrainingForm = (): void => {
   setTrainingForm({
     TrainingName: "",
     Description: "",
     Category: "",
     Trainer: "",
     TrainingDate: "",
     AvailableSeats: 0,
     Status: "Active"
   });
   setShowTrainingForm(true);
   setError("");
   setSuccess("");
 };

 const submitTraining = async (): Promise<void> => {
   if (!sp || userRole !== "Admin") {
     return;
   }
   if (!trainingForm.TrainingName.trim() || !trainingForm.Category.trim() ||
     !trainingForm.Trainer.trim() || !trainingForm.TrainingDate.trim() ||
     trainingForm.AvailableSeats < 0) {
     setError("Enter a training name, category, trainer, date, and valid seat count.");
     return;
   }

   try {
     setSubmitting(true);
     setError("");
     const trainingService: TrainingService = new TrainingService(sp);
     await trainingService.createTraining(trainingForm, userRole);
     await loadTrainings(sp);
     setShowTrainingForm(false);
     setSuccess("Training created successfully.");
   }
   catch (err) {
     console.error("Training creation error:", err);
     const sharePointError: string = err instanceof Error
       ? err.message
       : "Unknown SharePoint error";
     setError("Unable to create training: " + sharePointError);
   }
   finally {
     setSubmitting(false);
   }
 };

 const closeTrainingForm = (): void => {
   setShowTrainingForm(false);
   setError("");
 };

 // Closes the enrollment confirmation modal and clears its selection.
 const closeEnrollmentModal =
   (): void => {
     setSelectedTraining(null);
     setError("");
   };

 // Show a loading panel until the initial SharePoint request completes.
if (loading) {
  return (
    <div style={styles.page}>
      <div style={{ backgroundColor: "#ffffff", padding: 50, borderRadius: 12, textAlign: "center" }}>
        <Spinner size={SpinnerSize.large} label={"Loading training data from SharePoint..."} />
      </div>
    </div>
  );
}

// Render the dashboard using modular components.
return (
  <div style={styles.page}>
    <div style={styles.header}>
      <Header
        userRole={userRole}
        employeeName={employeeName}
        employeeInitials={employeeInitials}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        showMyCourses={showMyCourses}
        toggleMyCourses={() => setShowMyCourses(!showMyCourses)}
        showAdminBoard={showAdminBoard}
        toggleAdminBoard={() => { setShowAdminBoard(!showAdminBoard); setShowMyCourses(false); }}
        onOpenTrainingForm={openTrainingForm}
        setError={setError}
      />

      {showProfile && (
        <div style={styles.profilePanel}>
          <p style={styles.profileName}>{employeeName || "User"}</p>
          <p style={styles.profileLabel}>Role: {userRole}</p>
        </div>
      )}
    </div>

    {error && (
      <div style={{ marginBottom: 20 }}>
        <MessageBar messageBarType={MessageBarType.error} isMultiline={true} onDismiss={() => setError("")}>{error}</MessageBar>
      </div>
    )}

    {success && (
      <div style={{ marginBottom: 20 }}>
        <MessageBar messageBarType={MessageBarType.success} onDismiss={() => setSuccess("")}>{success}</MessageBar>
      </div>
    )}

    <div style={styles.statsContainer}>
      <div style={styles.statCard}><div style={styles.statNumber}>{totalTrainings}</div><div style={styles.statLabel}>Total Available Trainings</div></div>
      <div style={styles.statCard}><div style={styles.statNumber}>{activeTrainings}</div><div style={styles.statLabel}>Active Trainings</div></div>
      <div style={styles.statCard}><div style={styles.statNumber}>{totalSeats}</div><div style={styles.statLabel}>Available Seats</div></div>
    </div>

    {showAdminBoard && userRole === "Admin" && (
      <AdminBoard trainings={trainings} enrollments={enrollments} userRole={userRole} submitting={submitting} onDeleteTraining={deleteTraining} />
    )}

    {showMyCourses && (
      <div style={styles.section}>
        <MyCourses courses={myCourses} submitting={submitting} onCancel={cancelCourse} />
      </div>
    )}

    {!showMyCourses && !showAdminBoard && (
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Available Trainings</h2>

        <div style={styles.filterContainer}>
          <TextField label="Search Training" placeholder={"Search by training name or description"} value={searchText} onChange={(_ev, v) => setSearchText(v || "")} />
          <Dropdown label="Category" selectedKey={selectedCategory} options={categories} onChange={(_ev, option) => { if (option) setSelectedCategory(option.key as string); }} />
        </div>

        <TrainingList trainings={filteredTrainings} userRole={userRole} onEnroll={openEnrollment} enrolledTrainingIds={enrolledTrainingIds} />

        {filteredTrainings.length === 0 && (
          <div style={styles.noResults}><h3>No trainings found</h3><p>Try changing your search or category.</p></div>
        )}
      </div>
    )}

    <EnrollmentModal selectedTraining={selectedTraining} employeeName={employeeName} submitting={submitting} onConfirm={submitEnrollment} onCancel={closeEnrollmentModal} />

    {showTrainingForm && userRole === "Admin" && (
      <TrainingForm trainingForm={trainingForm} setTrainingForm={setTrainingForm} categoryOptions={trainingCategoryOptions} submitting={submitting} onSubmit={submitTraining} onCancel={closeTrainingForm} />
    )}

    <div style={styles.footer}>Training data powered by SharePoint & PnPjs</div>
  </div>
);
};

export default TrainingPortal;

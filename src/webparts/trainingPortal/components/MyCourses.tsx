import * as React from "react";
import { DefaultButton } from "@fluentui/react";
import { IEnrollment } from "./TrainingModels";
import styles from "./styles/MyCourses.styles";

// A course enrollment displayed in the user's course list.
export type IMyCourse = IEnrollment;

// Values supplied by the parent dashboard component.
export interface IMyCoursesProps {
 courses: IMyCourse[];
 submitting: boolean;
 onCancel: (course: IMyCourse) => Promise<void>;
}

// Converts the SharePoint completion status into a progress percentage.
const getProgressPercentage = (completionStatus: string): number => {
 const normalizedStatus: string = completionStatus.toLowerCase().trim();

 if (normalizedStatus === "completed" || normalizedStatus === "complete") {
   return 100;
 }

 if (
   normalizedStatus === "in progress" ||
   normalizedStatus === "in-progress" ||
   normalizedStatus === "started"
 ) {
   return 50;
 }

 return 0;
};

const MODULE_COUNT: number = 10;
const MODULE_INDEXES: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const MODULE_STORAGE_KEY: string = "training-course-module-progress";

const createInitialModules = (completionStatus: string): boolean[] => {
 const progress: number = getProgressPercentage(completionStatus);
 const completedModules: number = Math.round(
   (progress / 100) * MODULE_COUNT
 );
 const modules: boolean[] = [];

 for (let index: number = 0; index < MODULE_COUNT; index++) {
   modules.push(index < completedModules);
 }

 return modules;
};

// Displays the courses enrolled by the current SharePoint user.
const MyCourses: React.FC<IMyCoursesProps> = (props) => {
 const [selectedCourseId, setSelectedCourseId] =
   React.useState<number | null>(null);
 const [completedModules, setCompletedModules] =
   React.useState<{ [courseId: number]: boolean[] }>({});

 React.useEffect(() => {
   setCompletedModules((currentModules) => {
     const nextModules: { [courseId: number]: boolean[] } = {
       ...currentModules
     };

     let savedModules: { [courseId: number]: boolean[] } = {};
     try {
       const savedValue: string | null =
         window.localStorage.getItem(MODULE_STORAGE_KEY);
       if (savedValue) {
         savedModules = JSON.parse(savedValue) as {
           [courseId: number]: boolean[]
         };
       }
     }
     catch (error) {
       console.error("Unable to restore module progress:", error);
     }

     props.courses.forEach((course: IMyCourse) => {
       if (!nextModules[course.Id]) {
         nextModules[course.Id] = savedModules[course.Id] &&
           savedModules[course.Id].length === MODULE_COUNT
           ? savedModules[course.Id]
           : createInitialModules(course.CompletionStatus);
       }
     });

     return nextModules;
   });
 }, [props.courses]);

 const selectedCourse: IMyCourse | undefined =
   props.courses.filter(
     (course: IMyCourse) => course.Id === selectedCourseId
   )[0];

 const getCourseProgress = (course: IMyCourse): number => {
   const modules: boolean[] = completedModules[course.Id];
   if (!modules) {
     return getProgressPercentage(course.CompletionStatus);
   }

   return Math.round(
     (modules.filter((isComplete: boolean) => isComplete).length /
       MODULE_COUNT) * 100
   );
 };

 const completedCourses: number = props.courses.filter(
   (course: IMyCourse) =>
     getCourseProgress(course) === 100
 ).length;

 const averageProgress: number = props.courses.length === 0
   ? 0
   : Math.round(
       props.courses.reduce(
         (total: number, course: IMyCourse) =>
           total + getCourseProgress(course),
         0
       ) / props.courses.length
     );

 const toggleModule = (course: IMyCourse, moduleIndex: number): void => {
   setSelectedCourseId(course.Id);
   setCompletedModules((currentModules) => {
     const modules: boolean[] = currentModules[course.Id] ||
       createInitialModules(course.CompletionStatus);
     const updatedModules: boolean[] = modules.slice();
     updatedModules[moduleIndex] = !updatedModules[moduleIndex];
     const nextModules: { [courseId: number]: boolean[] } = {
       ...currentModules,
       [course.Id]: updatedModules
     };
     try {
       window.localStorage.setItem(
         MODULE_STORAGE_KEY,
         JSON.stringify(nextModules)
       );
     }
     catch (error) {
       console.error("Unable to save module progress:", error);
     }
     return {
       ...nextModules
     };
   });
 };

 // Show a confirmation before changing SharePoint data.
 const handleCancel = (course: IMyCourse): void => {
   if (!window.confirm("Cancel this course enrollment?")) {
     return;
   }

   props.onCancel(course).catch((error) => {
     console.error("Error cancelling enrollment:", error);
   });
 };

 return (
    <div>
      <h2>My Courses</h2>

      {props.courses.length > 0 && (
        <div style={styles.statsGrid}>
          <div style={{ ...styles.statCard, ...styles.enrolledCard }}>
            <div style={{ color: "#52666d", fontSize: "12px" }}>Enrolled Courses</div>
            <strong style={{ color: "#12343b", fontSize: "24px" }}>{props.courses.length}</strong>
          </div>
          <div style={{ ...styles.statCard, ...styles.avgCard }}>
            <div style={{ color: "#52666d", fontSize: "12px" }}>Average Progress</div>
            <strong style={{ color: "#12343b", fontSize: "24px" }}>{averageProgress}%</strong>
          </div>
          <div style={{ ...styles.statCard, ...styles.completedCard }}>
            <div style={{ color: "#52666d", fontSize: "12px" }}>Completed</div>
            <strong style={{ color: "#12343b", fontSize: "24px" }}>{completedCourses}</strong>
          </div>
        </div>
      )}

      {props.courses.length > 0 && (
        <div style={styles.overviewBox}>
          <div style={styles.overviewHeader}>
            <h3 style={{ margin: 0, color: "#12343b", fontSize: "17px" }}>Progress Overview</h3>
            <span style={{ color: "#52666d", fontSize: "12px" }}>Select a course for details</span>
          </div>
          <div style={styles.progressList}>
            {props.courses.map((course: IMyCourse) => {
              const progress: number = getCourseProgress(course);
              const isSelected: boolean = course.Id === selectedCourseId;
              return (
                <button
                  key={course.Id}
                  type="button"
                  aria-label={`${course.Training}: ${progress}% complete`}
                  onClick={() => setSelectedCourseId(course.Id)}
                  style={styles.progressButton(isSelected)}
                >
                  <span style={{ color: "#12343b", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>{progress}%</span>
                  <span style={{ width: "28px", height: `${Math.max(progress, 4)}px`, backgroundColor: progress === 100 ? "#107c10" : "#0078d4", transition: "height 250ms ease" }} />
                  <span style={{ color: "#52666d", fontSize: "11px", marginTop: "7px", maxWidth: "64px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{course.Training}</span>
                </button>
              );
            })}
          </div>
          {selectedCourse && (
            <div style={{ marginTop: "16px", padding: "12px 14px", backgroundColor: "#edf7f7", color: "#12343b", fontSize: "13px" }}>
              <strong>{selectedCourse.Training}</strong>
              {" - "}
              {getCourseProgress(selectedCourse)}% complete
            </div>
          )}
        </div>
      )}

      {props.courses.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px 20px", color: "#605e5c" }}>
          <p>You are not enrolled in any courses.</p>
        </div>
      ) : (
        <div style={styles.courseGrid}>
          {props.courses.map((course: IMyCourse) => (
            <div key={course.Id} style={styles.courseCard}>
              <h3 style={styles.courseHeader}>{course.Training}</h3>

              <div style={styles.progressContainer}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px" }}>
                  <span style={{ color: "#605e5c", fontWeight: 600 }}>Course Progress</span>
                  <span style={{ color: "#323130", fontWeight: 600 }}>{getCourseProgress(course)}%</span>
                </div>
                <div role="progressbar" aria-label={`${course.Training} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={getCourseProgress(course)} style={styles.progressBarOuter}>
                  <div style={styles.progressBarInner(getCourseProgress(course))} />
                </div>
              </div>

              <div style={{ borderTop: "1px solid #edebe9", paddingTop: "14px", marginBottom: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <strong style={{ color: "#12343b", fontSize: "14px" }}>Course Modules</strong>
                  <span style={{ color: "#52666d", fontSize: "12px" }}>{completedModules[course.Id] ? completedModules[course.Id].filter((isComplete: boolean) => isComplete).length : 0} / {MODULE_COUNT} complete</span>
                </div>
                <div style={styles.modulesGrid}>
                  {MODULE_INDEXES.map((moduleIndex: number) => {
                    const isComplete: boolean = Boolean(completedModules[course.Id] && completedModules[course.Id][moduleIndex]);
                    return (
                      <label key={moduleIndex} style={styles.moduleLabel(isComplete)}>
                        <input type="checkbox" checked={isComplete} onChange={() => toggleModule(course, moduleIndex)} />
                        Module {moduleIndex + 1}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div style={{ borderTop: "1px solid #edebe9", paddingTop: "14px", marginBottom: "18px" }}>
                <div style={styles.detailRow}>
                  <span style={{ color: "#605e5c", fontWeight: 600 }}>Enrolled On</span>
                  <span style={{ color: "#323130", textAlign: "right" }}>{course.EnrollmentDate ? new Date(course.EnrollmentDate).toLocaleDateString() : "Not specified"}</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={{ color: "#605e5c", fontWeight: 600 }}>Completion</span>
                  <span style={{ color: "#323130", textAlign: "right" }}>{course.CompletionStatus}</span>
                </div>
              </div>

              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <DefaultButton text="Cancel Course" disabled={props.submitting} onClick={() => handleCancel(course)} styles={{ root: styles.cancelButton as any }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;

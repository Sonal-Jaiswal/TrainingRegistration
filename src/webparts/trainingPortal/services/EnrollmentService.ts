import { SPFI } from "@pnp/sp";
import "@pnp/sp/items";
import "@pnp/sp/lists";

export interface IEnrollmentResult {
 trainingName: string;
}

export const enrollCurrentUser = async (
 sp: SPFI,
 trainingId: number,
 trainingName: string
): Promise<IEnrollmentResult> => {
 const currentUser = await sp.web.currentUser();
 const existing = await sp.web.lists
   .getByTitle("Enrollments-SAR")
   .items
   .select("Id", "Employee/Id", "Training/Id")
   .expand("Employee", "Training")
   .filter("Employee/Id eq " + currentUser.Id + " and Training/Id eq " + trainingId + " and Status ne 'Cancelled'")();

 if (existing.length > 0) {
   throw new Error("You are already enrolled in this training.");
 }

 const trainingItem = await sp.web.lists
   .getByTitle("Trainings-SAR")
   .items
   .getById(trainingId)
   .select("Id", "Title", "AvailableSeats")();
 const currentSeats: number = Number(trainingItem.AvailableSeats || 0);
 if (currentSeats <= 0) {
   throw new Error("No seats are available for this training.");
 }

 await sp.web.lists.getByTitle("Enrollments-SAR").items.add({
   Title: "Enrollment - " + currentUser.Title,
   EmployeeId: currentUser.Id,
   TrainingId: trainingId,
   EnrollmentDate: new Date().toISOString(),
   Status: "Enrolled",
   CompletionStatus: "Not Started"
 });
 await sp.web.lists.getByTitle("Trainings-SAR").items.getById(trainingId).update({
   AvailableSeats: currentSeats - 1
 });

 return { trainingName };
};

export const cancelEnrollment = async (
 sp: SPFI,
 enrollmentId: number,
 trainingId: number
): Promise<void> => {
 const trainingItem = await sp.web.lists
   .getByTitle("Trainings-SAR")
   .items
   .getById(trainingId)
   .select("Id", "AvailableSeats", "Status")();
 const currentSeats: number = Number(trainingItem.AvailableSeats || 0);
 await sp.web.lists.getByTitle("Enrollments-SAR").items.getById(enrollmentId).update({
   Status: "Cancelled"
 });
 await sp.web.lists.getByTitle("Trainings-SAR").items.getById(trainingId).update({
   AvailableSeats: currentSeats + 1
 });
};

import { SPFI } from "@pnp/sp";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import { IEnrollment, ITraining } from "../components/TrainingModels";

export const getTrainings = async (sp: SPFI): Promise<ITraining[]> => {
 const items = await sp.web.lists
   .getByTitle("Trainings-SAR")
   .items
   .select("Id", "Title", "Description", "Category", "Trainer", "TrainingDate", "AvailableSeats", "Status")
   .orderBy("TrainingDate", true)();

 return items.map((item) => ({
   Id: item.Id,
   TrainingName: item.Title || "",
   Description: item.Description || "",
   Category: Array.isArray(item.Category) ? item.Category.join(", ") : item.Category || "",
   Trainer: item.Trainer || "",
   TrainingDate: item.TrainingDate || "",
   AvailableSeats: Number(item.AvailableSeats || 0),
   Status: item.Status || ""
 }));
};

export const getEnrollments = async (sp: SPFI): Promise<IEnrollment[]> => {
 const items = await sp.web.lists
   .getByTitle("Enrollments-SAR")
   .items
  .select("Id", "Employee/Title", "Employee/Id", "Training/Id", "Training/Title", "EnrollmentDate", "Status", "CompletionStatus")
   .expand("Employee", "Training")
   .orderBy("Created", false)();

  return items.map((item) => ({
    Id: item.Id,
    Employee: item.Employee && item.Employee.Title ? item.Employee.Title : "",
    EmployeeId: item.Employee && item.Employee.Id ? Number(item.Employee.Id) : undefined,
    Training: item.Training && item.Training.Title ? item.Training.Title : "",
    TrainingId: item.Training && item.Training.Id ? Number(item.Training.Id) : 0,
    EnrollmentDate: item.EnrollmentDate || "",
    Status: item.Status || "",
    CompletionStatus: item.CompletionStatus || ""
  }));
};

// Represents one training record from the Trainings-SAR SharePoint list.
export interface ITraining {
 Id: number;
 TrainingName: string;
 Description: string;
 Category: string;
 Trainer: string;
 TrainingDate: string;
 AvailableSeats: number;
 Status: string;
}

// Represents one enrollment record from the Enrollments-SAR SharePoint list.
export interface IEnrollment {
 Id: number;
 Employee: string;
 EmployeeId?: number;
 Training: string;
 TrainingId: number;
 EnrollmentDate: string;
 Status: string;
 CompletionStatus: string;
}

// Represents an active Admin or HR assignment from UserRoles-SAR.
export interface IUserRole {
 UserEmail: string;
 UserName: string;
 Role: "Admin" | "HR";
 IsActive?: boolean;
}

// Roles available to every authenticated user of the application.
export type UserRole = "Admin" | "HR" | "Employee";

import { SPFI } from "@pnp/sp";
// import { IMyRegistration } from "../models/IMyRegistration";
import { IMyRegistration } from "../models/IMyRegistration";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { ITraining } from "../models/ITraining";

export default class TrainingServices {

  private sp: SPFI;
  private listName = "TrainingSprintECM1";

  constructor(sp: SPFI) {
    this.sp = sp;
  }

  public async getAllTrainings(): Promise<ITraining[]> {

    try {

      const items = await this.sp.web.lists
        .getByTitle(this.listName)
        .items();

      return items as ITraining[];

    } catch (error) {

      console.error(error);

      return [];
    }
  }

  public async registerTraining(
    trainingId: number,
    trainingTitle: string,
    userName: string,
    userEmail: string
  ): Promise<void> {

    await this.sp.web.lists
      .getByTitle("RegistrationsSprint")
      .items
      .add({
        Title: trainingTitle,
        TrainingId: trainingId,
        EmployeeName: userName,
        EmployeeEmail: userEmail,
        Status: "Registered",
        EnrollmentDate: new Date()
      });
  }

  public async cancelRegistration(
  registrationId: number
): Promise<void> {

  await this.sp.web.lists
    .getByTitle("RegistrationsSprint")
    .items
    .getById(registrationId)
    .update({
      Status: "Cancelled"
    });
}

public async increaseAvailableSeats(
  trainingTitle: string
): Promise<void> {

  const trainings = await this.sp.web.lists
    .getByTitle("TrainingSprintECM1")
    .items
    .filter(`Title eq '${trainingTitle}'`)();

  if (trainings.length === 0) {
    return;
  }

  const training = trainings[0];

  await this.sp.web.lists
    .getByTitle("TrainingSprintECM1")
    .items
    .getById(training.Id)
    .update({
      SeatAvailable: training.SeatAvailable + 1
    });
}

  public async isAlreadyRegistered(
  trainingId: number,
  userEmail: string
): Promise<boolean> {

  const items = await this.sp.web.lists
    .getByTitle("RegistrationsSprint")
    .items
    .filter(
      `TrainingId eq ${trainingId}
       and EmployeeEmail eq '${userEmail}'
       and Status eq 'Registered'`
    )();

  return items.length > 0;
}


public async reactivateRegistration(
  trainingId: number,
  userEmail: string
): Promise<boolean> {

  const items = await this.sp.web.lists
    .getByTitle("RegistrationsSprint")
    .items
    .filter(
      `TrainingId eq ${trainingId}
       and EmployeeEmail eq '${userEmail}'
       and Status eq 'Cancelled'`
    )();

  if (items.length === 0) {
    return false;
  }

  await this.sp.web.lists
    .getByTitle("RegistrationsSprint")
    .items
    .getById(items[0].Id)
    .update({
      Status: "Registered",
      EnrollmentDate: new Date()
    });

  return true;
}

  public async getMyRegistrations(
  userEmail: string
): Promise<IMyRegistration[]> {

  const items = await this.sp.web.lists
    .getByTitle("RegistrationsSprint")
    .items
    .filter(
      `EmployeeEmail eq '${userEmail}'`
    )();

  return items as IMyRegistration[];
}

  public async getRegistrationCount(
    trainingId: number
  ): Promise<number> {

    const items = await this.sp.web.lists
      .getByTitle("RegistrationsSprint")
      .items
      .filter(
        `TrainingId eq ${trainingId}`
      )();

    return items.length;
  }


  public async updateAvailableSeats(
    trainingId: number,
    currentSeats: number
  ): Promise<void> {

    await this.sp.web.lists
      .getByTitle("TrainingSprintECM1")
      .items
      .getById(trainingId)
      .update({
        SeatAvailable: currentSeats - 1
      });
  }
}
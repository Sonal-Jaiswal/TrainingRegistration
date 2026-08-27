import * as React from "react";
import { useEffect, useState } from "react";

import {
  DetailsList,
  Spinner,
  MessageBar,
  MessageBarType,
  IColumn,
  PrimaryButton
} from "@fluentui/react";

import { SPFI } from "@pnp/sp";

import { ITraining } from "../models/ITraining";
import TrainingServices from "../services/TrainingServices";

interface IAvailableTrainingsProps {
  sp: SPFI;
  userName: string;
  userEmail: string;
}

const AvailableTrainings: React.FC<IAvailableTrainingsProps> = ({
  sp,
  userName,
  userEmail
}) => {

  const [trainings, setTrainings] = useState<ITraining[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const loadTrainings = async (): Promise<void> => {

    const service = new TrainingServices(sp);

    const data = await service.getAllTrainings();

    setTrainings(data);

    setLoading(false);
  };

  useEffect(() => {

    loadTrainings().catch(console.error);

  }, [sp]);

  const registerTraining = async (
    item: ITraining
  ): Promise<void> => {

    try {

      setSuccessMessage("");
      setErrorMessage("");

      const service = new TrainingServices(sp);

      const alreadyRegistered =
        await service.isAlreadyRegistered(
          item.Id,
          userEmail
        );

      if (alreadyRegistered) {

        setErrorMessage(
          "You are already registered for this training."
        );

        return;
      }

      const registrationCount =
        await service.getRegistrationCount(
          item.Id
        );

      if (registrationCount >= item.SeatAvailable) {

        setErrorMessage(
          "No seats available for this training."
        );

        return;
      }

      const reactivated =
        await service.reactivateRegistration(
          item.Id,
          userEmail
        );

      if (reactivated) {

        await service.updateAvailableSeats(
          item.Id,
          item.SeatAvailable
        );

        await loadTrainings();

        setSuccessMessage(
          `Successfully registered for ${item.Title}`
        );

        return;
      }

      await service.registerTraining(
        item.Id,
        item.Title,
        userName,
        userEmail
      );

      await service.updateAvailableSeats(
        item.Id,
        item.SeatAvailable
      );

      await loadTrainings();

      setSuccessMessage(
        `Successfully registered for ${item.Title}`
      );

    } catch (error) {

      console.error(error);

      setErrorMessage(
        "Registration failed."
      );
    }
  };

  const columns: IColumn[] = [
    {
      key: "title",
      name: "Training",
      fieldName: "Title",
      minWidth: 120
    },
    {
      key: "trainer",
      name: "Trainer",
      fieldName: "Trainer",
      minWidth: 90
    },
    {
      key: "date",
      name: "Date",
      minWidth: 90,
      onRender: (item: ITraining) =>
        new Date(
          item.TrainingDate
        ).toLocaleDateString()
    },
    {
      key: "location",
      name: "Location",
      fieldName: "Location",
      minWidth: 80
    },
    {
      key: "seat",
      name: "Seats",
      fieldName: "SeatAvailable",
      minWidth: 60
    },
    {
      key: "status",
      name: "Status",
      minWidth: 90,
      onRender: (item: any) => {

        const status =
          item.Status?.Value ||
          item.Status ||
          "N/A";

        return (
          <span
            style={{
              color:
                status === "Open"
                  ? "#107c10"
                  : "#d13438",
              backgroundColor:
                status === "Open"
                  ? "#dff6dd"
                  : "#fde7e9",
              padding: "4px 10px",
              borderRadius: "14px",
              fontWeight: 600,
              fontSize: "12px"
            }}
          >
            {status}
          </span>
        );
      }
    },
    {
      key: "action",
      name: "Action",
      minWidth: 90,
      onRender: (item: ITraining) => (
        <PrimaryButton
          text={
            item.SeatAvailable <= 0
              ? "Full"
              : "Register"
          }
          disabled={
            item.SeatAvailable <= 0
          }
          styles={{
            root: {
              borderRadius: "20px"
            }
          }}
          onClick={() =>
            registerTraining(item)
              .catch(console.error)
          }
        />
      )
    }
  ];

  if (loading) {
    return (
      <Spinner
        label="Loading Trainings..."
      />
    );
  }

  if (trainings.length === 0) {
    return (
      <MessageBar
        messageBarType={MessageBarType.info}
      >
        No Trainings Available
      </MessageBar>
    );
  }

  return (
    <>
      {errorMessage && (
        <MessageBar
          messageBarType={MessageBarType.error}
        >
          {errorMessage}
        </MessageBar>
      )}

      {successMessage && (
        <MessageBar
          messageBarType={MessageBarType.success}
        >
          {successMessage}
        </MessageBar>
      )}

      <DetailsList
        items={trainings}
        columns={columns}
        compact={true}
      />
    </>
  );
};

export default AvailableTrainings;
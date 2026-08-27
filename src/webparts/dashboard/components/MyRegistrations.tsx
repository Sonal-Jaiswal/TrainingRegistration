import * as React from "react";
import { useEffect, useState } from "react";

import {
  DetailsList,
  Spinner,
  MessageBar,
  MessageBarType,
  IColumn,
  DefaultButton
} from "@fluentui/react";

import { SPFI } from "@pnp/sp";

import TrainingServices from "../services/TrainingServices";
import { IMyRegistration } from "../models/IMyRegistration";

interface IMyRegistrationsProps {
  sp: SPFI;
  userEmail: string;
}

const MyRegistrations: React.FC<IMyRegistrationsProps> = ({
  sp,
  userEmail
}) => {

  const [items, setItems] =
    useState<IMyRegistration[]>([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [message, setMessage] =
    useState<string>("");

  const loadData = async (): Promise<void> => {

    const service =
      new TrainingServices(sp);

    const data =
      await service.getMyRegistrations(
        userEmail
      );

    setItems(data);
    setLoading(false);
  };

  useEffect(() => {

    loadData().catch(console.error);

  }, [sp, userEmail]);

  const cancelRegistration = async (
    item: IMyRegistration
  ): Promise<void> => {

    const service =
      new TrainingServices(sp);

    await service.cancelRegistration(
      item.Id
    );

    await service.increaseAvailableSeats(
      item.Title
    );

    await loadData();

    setMessage(
      `Registration cancelled for ${item.Title}`
    );
  };

  const columns: IColumn[] = [
    {
      key: "title",
      name: "Training",
      fieldName: "Title",
      minWidth: 180
    },
    {
      key: "date",
      name: "Registration Date",
      minWidth: 140,
      onRender: (item: IMyRegistration) =>
        new Date(
          item.EnrollmentDate
        ).toLocaleDateString()
    },
    {
  key: "status",
  name: "Status",
  minWidth: 120,
  onRender: (item: IMyRegistration) => (
    <span
      style={{
        color:
          item.Status === "Registered"
            ? "#107c10"
            : "#d13438",
        fontWeight: 600,
        padding: "4px 10px",
        borderRadius: "12px",
        backgroundColor:
          item.Status === "Registered"
            ? "#dff6dd"
            : "#fde7e9"
      }}
    >
      {item.Status}
    </span>
  )
},
    {
      key: "action",
      name: "Action",
      minWidth: 120,
      onRender: (item: IMyRegistration) => (

        <DefaultButton
          text="Cancel"
          disabled={
            item.Status === "Cancelled"
          }
          onClick={() =>
            cancelRegistration(item)
              .catch(console.error)
          }
        />
      )
    }
  ];

  if (loading) {
    return (
      <Spinner
        label="Loading Registrations..."
      />
    );
  }

  return (
    <div style={{ marginTop: "30px" }}>

      <h2>My Registrations</h2>

      {
        message && (
          <MessageBar
            messageBarType={
              MessageBarType.success
            }
          >
            {message}
          </MessageBar>
        )
      }

      <DetailsList
        items={items}
        columns={columns}
        compact={true}
      />

    </div>
  );
};

export default MyRegistrations;
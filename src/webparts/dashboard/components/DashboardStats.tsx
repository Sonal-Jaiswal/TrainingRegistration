import * as React from "react";
import { useEffect, useState } from "react";

import { SPFI } from "@pnp/sp";
import TrainingServices from "../services/TrainingServices";

interface IDashboardStatsProps {
  sp: SPFI;
  userEmail: string;
}

const DashboardStats: React.FC<IDashboardStatsProps> = ({
  sp,
  userEmail
}) => {

  const [totalTrainings, setTotalTrainings] =
    useState<number>(0);

  const [myRegistrations, setMyRegistrations] =
    useState<number>(0);

  const [availableSeats, setAvailableSeats] =
    useState<number>(0);

  const [fullTrainings, setFullTrainings] =
    useState<number>(0);

  useEffect(() => {

    const loadStats = async (): Promise<void> => {

      const service =
        new TrainingServices(sp);

      const trainings =
        await service.getAllTrainings();

      const registrations =
        await service.getMyRegistrations(
          userEmail
        );

      setTotalTrainings(
        trainings.length
      );

      setMyRegistrations(
        registrations.filter(
          x => x.Status === "Registered"
        ).length
      );

      setAvailableSeats(
        trainings.reduce(
          (sum, item) =>
            sum + item.SeatAvailable,
          0
        )
      );

      setFullTrainings(
        trainings.filter(
          x => x.SeatAvailable === 0
        ).length
      );
    };

    loadStats().catch(console.error);

  }, [sp, userEmail]);

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "12px",
  padding: "10px",
  height: "70px",

  borderLeft: "4px solid #0070ad",

  boxShadow:
    "0 2px 8px rgba(0,0,0,.08)"
};

  return (
   <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "10px",
    marginBottom: "10px"
  }}
>


    
      <div style={cardStyle}>
        <h4 style={{ margin: 0 }}>
          Trainings
        </h4>
        <h2 style={{ margin: "5px 0" }}>
          {totalTrainings}
        </h2>
      </div>

      <div style={cardStyle}>
        <h4 style={{ margin: 0 }}>
          My Reg
        </h4>
        <h2 style={{ margin: "5px 0" }}>
          {myRegistrations}
        </h2>
      </div>

      <div style={cardStyle}>
        <h4 style={{ margin: 0 }}>
          Seats
        </h4>
        <h2 style={{ margin: "5px 0" }}>
          {availableSeats}
        </h2>
      </div>

      <div style={cardStyle}>
        <h4 style={{ margin: 0 }}>
          Full
        </h4>
        <h2 style={{ margin: "5px 0" }}>
          {fullTrainings}
        </h2>
      </div>
    </div>
  );
};

export default DashboardStats;

import * as React from "react";
import TrainingCard from "./TrainingCard";
import { ITraining } from "./TrainingModels";

interface IProps {
  trainings: ITraining[];
  userRole: string;
  onEnroll: (t: ITraining) => void;
  enrolledTrainingIds?: number[];
}

const TrainingList: React.FC<IProps> = ({ trainings, userRole, onEnroll, enrolledTrainingIds = [] }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
      {trainings.map((t) => (
        <TrainingCard
          key={t.Id}
          training={t}
          userRole={userRole}
          onEnroll={onEnroll}
          isEnrolled={enrolledTrainingIds.indexOf(t.Id) !== -1}
        />
      ))}
    </div>
  );
};

export default TrainingList;

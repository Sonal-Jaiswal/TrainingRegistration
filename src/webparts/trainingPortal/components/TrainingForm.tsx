import * as React from "react";
import { TextField, Dropdown, IDropdownOption, PrimaryButton, DefaultButton } from "@fluentui/react";
import { ITraining } from "./TrainingModels";

interface IProps {
  trainingForm: Omit<ITraining, "Id">;
  setTrainingForm: (t: Omit<ITraining, "Id">) => void;
  categoryOptions: IDropdownOption[];
  submitting: boolean;
  onSubmit: () => Promise<void> | void;
  onCancel: () => void;
}

const TrainingForm: React.FC<IProps> = ({ trainingForm, setTrainingForm, categoryOptions, submitting, onSubmit, onCancel }) => {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.45)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
      <div style={{ backgroundColor: "#ffffff", width: "90%", maxWidth: 500, borderRadius: 12, padding: 28, boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}>
        <h2 style={{ margin: "0 0 20px 0", fontSize: 23, color: "#323130" }}>Create Training</h2>
        <TextField label="Training name" required value={trainingForm.TrainingName} onChange={(_e, v) => setTrainingForm({ ...trainingForm, TrainingName: v || "" })} />
        <TextField label="Description" multiline value={trainingForm.Description} onChange={(_e, v) => setTrainingForm({ ...trainingForm, Description: v || "" })} />
        <Dropdown label="Category" required placeholder="Select a category" selectedKey={trainingForm.Category || undefined} options={categoryOptions} onChange={(_e, option) => setTrainingForm({ ...trainingForm, Category: option ? String(option.key) : "" })} />
        <TextField label="Trainer" required value={trainingForm.Trainer} onChange={(_e, v) => setTrainingForm({ ...trainingForm, Trainer: v || "" })} />
        <TextField label="Training date" type="date" required value={trainingForm.TrainingDate} onChange={(_e, v) => setTrainingForm({ ...trainingForm, TrainingDate: v || "" })} />
        <TextField label="Available seats" type="number" min={0} value={String(trainingForm.AvailableSeats)} onChange={(_e, v) => setTrainingForm({ ...trainingForm, AvailableSeats: Number(v || 0) })} />
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <PrimaryButton text={submitting ? "Creating..." : "Create Training"} disabled={submitting} onClick={onSubmit} />
          <DefaultButton text="Cancel" disabled={submitting} onClick={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default TrainingForm;

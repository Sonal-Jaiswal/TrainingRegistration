// Defines the data required to display one training card.
export interface ITrainingCardProps {
 // The name or title of the training course.
 title: string;

 // The category used to group or filter the training.
 category: string;

 // A short description of the training content.
 description: string;

 // The scheduled training date as formatted text.
 date: string;

 // The number of seats currently available.
 seats: number;
}
// Provides the SharePoint web part context type.
import { WebPartContext } from "@microsoft/sp-webpart-base";

// Defines the properties passed from the web part to the React component.
export interface ITrainingPortalProps {
 // Stores the description configured in the web part property pane.
 description: string;

 // Provides access to the current SharePoint site and user context.
 context: WebPartContext;
}
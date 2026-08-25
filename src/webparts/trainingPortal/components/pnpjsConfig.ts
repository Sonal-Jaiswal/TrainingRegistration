// Provides the SharePoint context type passed by the web part.
import { WebPartContext } from "@microsoft/sp-webpart-base";

// Provides the PnPjs client, factory function, and SPFx adapter.
import { SPFI, spfi, SPFx } from "@pnp/sp";

// Registers support for reading SharePoint web information.
import "@pnp/sp/webs";

// Registers support for accessing SharePoint lists.
import "@pnp/sp/lists";

// Registers support for reading and writing SharePoint list items.
import "@pnp/sp/items";

// Registers support for accessing the current SharePoint user.
import "@pnp/sp/site-users/web";

// Creates a PnPjs client configured for the current SharePoint site.
export const getSP = (context: WebPartContext): SPFI => {
  // Connect PnPjs to SharePoint through the SPFx web part context.
  return spfi().using(SPFx(context));
};



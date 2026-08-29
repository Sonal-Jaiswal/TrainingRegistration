import { WebPartContext } from "@microsoft/sp-webpart-base";

import { SPFI, spfi, SPFx } from "@pnp/sp";

import "@pnp/sp/webs";

import "@pnp/sp/lists";

import "@pnp/sp/items";

import "@pnp/sp/site-users/web";

export const getSP = (context: WebPartContext): SPFI => {
  return spfi().using(SPFx(context));
};



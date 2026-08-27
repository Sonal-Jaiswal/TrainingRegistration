import * as React from "react";
import * as ReactDom from "react-dom";

import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import { SPFI, spfi } from "@pnp/sp";
import { SPFx } from "@pnp/sp/presets/all";

import Dashboard from "./components/Dashboard";
import { IDashboardProps } from "./components/IDashboardProps";

export interface IDashboardWebPartProps {
}

export default class DashboardWebPart
  extends BaseClientSideWebPart<IDashboardWebPartProps> {

  private sp!: SPFI;

  protected async onInit(): Promise<void> {

    await super.onInit();

    this.sp = spfi().using(
      SPFx(this.context)
    );
  }

  public render(): void {

    const element: React.ReactElement<IDashboardProps> =
      React.createElement(
        Dashboard,
        {
          sp: this.sp,
          userName: this.context.pageContext.user.displayName,
          userEmail: this.context.pageContext.user.email
        }
      );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }
}
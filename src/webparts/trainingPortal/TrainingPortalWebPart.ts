import * as React from 'react';

import * as ReactDom from 'react-dom';

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import TrainingDashboard from './components/TrainingDashboard';

import WelcomePage from './components/WelcomePage';

import { ITrainingPortalProps } from './components/ITrainingPortalProps';

import { getSP } from './components/pnpjsConfig';

export interface ITrainingPortalWebPartProps {

  description: string;

}

export default class TrainingPortalWebPart

  extends BaseClientSideWebPart<ITrainingPortalWebPartProps> {

  // Keeps the welcome page visible until the user opens the dashboard.
  private showWelcomePage: boolean = true;

  public render(): void {

    // Render the welcome page first, then switch to the dashboard on request.
    const element: React.ReactElement = this.showWelcomePage
      ? React.createElement(
          WelcomePage,
          {
            onOpenDashboard: () => {
              this.showWelcomePage = false;
              this.render();
            }
          }
        )
      : React.createElement(
          TrainingDashboard,
          {
            description: this.properties.description,
            context: this.context
          } as ITrainingPortalProps
        );

    ReactDom.render(

      element,

      this.domElement

    );

  }

  protected onInit(): Promise<void> {
 getSP(this.context);
 return super.onInit();
}

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

}
 
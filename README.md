# rishi

## Summary

Short summary on functionality and used technologies.

[picture of the solution in action, if possible]

## Used SharePoint Framework Version

Project flow
```mermaid
flowchart TD
    A[User opens SharePoint page] --> B[SPFx web part loads]
    B --> C[TrainingPortalWebPart.ts]
    C --> D{Welcome page or dashboard?}
    D -- Yes --> E[WelcomePage.tsx]
    D -- No --> F[TrainingDashboard.tsx]

    F --> G[TrainingDataService.ts]
    G --> H[PnPjs client]
    H --> I[SharePoint lists]

    I --> J[Trainings-SAR]
    I --> K[Enrollments-SAR]
    I --> L[UserRoles-SAR]

    J --> M[Display training cards]
    K --> N[Display enrolled courses]
    L --> O[Resolve user role]

    F --> P[EnrollmentService.ts]
    P --> Q[Check seats]
    P --> R[Add enrollment]
    P --> S[Update available seats]

    F --> T[TrainingService.ts]
    T --> U[Create, update, delete training]
    T --> V[Role-based authorization]

    M --> W[User clicks Enroll]
    W --> P
    P --> X[UI updates immediately]
```

Tech Stack
- TypeScript (~5.x)
- React 17
- SPFx (SharePoint Framework) Web Part
- @fluentui/react for UI controls
- @pnp/sp for SharePoint REST access
- Gulp for SPFx build tasks

![version](https://img.shields.io/badge/version-1.21.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Any special pre-requisites?

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| folder name | Author details (name, company, twitter alias with link) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- topic 1
- topic 2
- topic 3

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

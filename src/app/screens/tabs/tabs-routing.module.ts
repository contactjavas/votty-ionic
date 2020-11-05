import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "survey-list",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../survey-list/survey-list.module").then(
                (m) => m.SurveyListPageModule
              ),
          },
        ],
      },
      {
        path: "vote-list",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../vote-list/vote-list.module").then(
                (m) => m.VoteListPageModule
              ),
          },
        ],
      },
      {
        path: "respondent-list",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../respondent-list/respondent-list.module").then(
                (m) => m.RespondentListPageModule
              ),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/app/tabs/survey-list",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/app/tabs/survey-list",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

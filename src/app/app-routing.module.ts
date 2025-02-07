import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./screens/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "app",
    loadChildren: () =>
      import("./screens/tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "input-survey/:surveyId",
    loadChildren: () =>
      import("./screens/input-survey/input-survey.module").then(
        (m) => m.InputSurveyPageModule
      ),
  },
  {
    path: "vote-detail",
    loadChildren: () =>
      import("./screens/vote-detail/vote-detail.module").then(
        (m) => m.VoteDetailPageModule
      ),
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "add-respondent",
    loadChildren: () =>
      import("./screens/add-respondent/add-respondent.module").then(
        (m) => m.AddRespondentPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

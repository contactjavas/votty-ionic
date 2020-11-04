import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'login',
    loadChildren: () => import('./screens/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./screens/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'survey-list',
    loadChildren: () => import('./screens/survey-list/survey-list.module').then( m => m.SurveyListPageModule)
  },
  {
    path: 'survey-detail',
    loadChildren: () => import('./screens/survey-detail/survey-detail.module').then( m => m.SurveyDetailPageModule)
  },
  {
    path: 'vote-list',
    loadChildren: () => import('./screens/vote-list/vote-list.module').then( m => m.VoteListPageModule)
  },
  {
    path: 'vote-detail',
    loadChildren: () => import('./screens/vote-detail/vote-detail.module').then( m => m.VoteDetailPageModule)
  },
  {
    path: 'respondent-list',
    loadChildren: () => import('./screens/respondent-list/respondent-list.module').then( m => m.RespondentListPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

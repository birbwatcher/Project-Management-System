import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MainPageComponent } from './core/main-page/main-page.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { BoardComponent } from './boards/board/board.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './boards/dashboard/dashboard.component';
import { SearchResultsComponent } from './core/search-results/search-results.component';
import { TetComponent } from './auth/tet/tet.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'sign-in', component: SigninComponent},
  {path: 'sign-up', component: SignupComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'board',
    component: BoardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search', 
    component: SearchResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tet',
    component: TetComponent
  },
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

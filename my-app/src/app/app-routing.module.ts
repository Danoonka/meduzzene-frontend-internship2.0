import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPage} from './pages/main/main.component';
import {AboutPage} from './pages/about/about.component';
import {RegistrationPage} from './pages/registration/registration.component';
import {AuthorisationPage} from './pages/authorisation/authorisation.component';
import {UserListPage} from './pages/user/userList/userList.component';
import {UserProfilePage} from './pages/user/userProfile/userProfile.component';
import {CompanyListPage} from './pages/company/companyList/companyList.component';
import {CompanyProfilePage} from './pages/company/companyProfile/companyProfile.component';
import {AuthGuard, AuthGuardForUnauthorised} from "./utils";

const routes: Routes = [
  {path: '', component: MainPage},
  {path: 'about', component: AboutPage},
  {path: 'user-registration', component: RegistrationPage, canActivate: [AuthGuardForUnauthorised]},
  {path: 'user-authorization', component: AuthorisationPage, canActivate: [AuthGuardForUnauthorised]},
  {path: 'user-list', component: UserListPage, canActivate: [AuthGuard]},
  {path: 'user-profile', component: UserProfilePage, canActivate: [AuthGuard]},
  {path: 'company-list', component: CompanyListPage, canActivate: [AuthGuard]},
  {path: 'company-profile', component: CompanyProfilePage, canActivate: [AuthGuard]},
  {path: '**', component: MainPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

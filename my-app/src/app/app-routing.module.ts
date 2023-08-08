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
import {UserCompaniesPageComponent} from "./pages/user/userCompanies/user-companies-page/user-companies-page.component";
import {UserInvitesPageComponent} from "./pages/user/userCompanies/user-invites-page/user-invites-page.component";
import {UserRequestsPageComponent} from "./pages/user/userCompanies/user-rrquests-page/user-requests-page.component";
import {MembersPageComponent} from "./pages/user/userCompanies/members-page/members-page.component";
import {CompanyInvitesPageComponent} from "./pages/user/userCompanies/company-invites-page/company-invites-page.component";
import {CompanyRequestsPageComponent} from "./pages/user/userCompanies/company-requests-page/company-requests-page.component";

const routes: Routes = [
    {path: '', component: MainPage},
    {path: 'about', component: AboutPage},
    {path: 'user-registration', component: RegistrationPage, canActivate: [AuthGuardForUnauthorised]},
    {path: 'user-authorization', component: AuthorisationPage, canActivate: [AuthGuardForUnauthorised]},
    {path: 'user-list', component: UserListPage, canActivate: [AuthGuard]},
    {path: 'user-profile', component: UserProfilePage, canActivate: [AuthGuard]},
    {path: 'company-list', component: CompanyListPage, canActivate: [AuthGuard]},
    {path: 'company-profile', component: CompanyProfilePage, canActivate: [AuthGuard]},
    {path: 'user-companies', component: UserCompaniesPageComponent, canActivate: [AuthGuard]},
    {path: 'user-invites', component: UserInvitesPageComponent, canActivate: [AuthGuard]},
    {path: 'user-requests', component: UserRequestsPageComponent, canActivate: [AuthGuard]},
    {path: 'company-members', component: MembersPageComponent, canActivate: [AuthGuard]},
    {path: 'company-invites', component: CompanyInvitesPageComponent, canActivate: [AuthGuard]},
    {path: 'company-requests', component: CompanyRequestsPageComponent, canActivate: [AuthGuard]},
    // {path: '**', component: MainPage},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

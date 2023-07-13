import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AboutPage} from './pages/about/about.component'
import {AuthorisationPage} from "./pages/authorisation/authorisation.component";
import {CompanyListPage} from "./pages/company/companyList/companyList.component";
import {CompanyProfilePage} from "./pages/company/companyProfile/companyProfile.component";
import {MainPage} from "./pages/main/main.component";
import {RegistrationPage} from "./pages/registration/registration.component";
import {UserListPage} from "./pages/user/userList/userList.component";
import {UserProfilePage} from "./pages/user/userProfile/userProfile.component";
import { ModalComponent } from './components/modal/modal.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutPage,
    AuthorisationPage,
    CompanyListPage,
    CompanyProfilePage,
    MainPage,
    RegistrationPage,
    UserListPage,
    UserProfilePage,
    ModalComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { StoreModule } from '@ngrx/store';
import {counterReducer} from './../ngRx/counter.reducer';
import { MyCounterComponent } from './components/my-counter/my-counter.component';
import { ButtonComponent } from './components/button/button.component'

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
    NavigationComponent,
    MyCounterComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({count: counterReducer}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

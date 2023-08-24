import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AboutPage} from './pages/about/about.component'
import {AuthorisationPage} from "./pages/authorisation/authorisation.component";
import {CompanyListPage} from "./pages/company/companyList/companyList.component";
import {CompanyProfilePage} from "./pages/company/companyProfile/companyProfile.component";
import {MainPage} from "./pages/main/main.component";
import {RegistrationPage} from "./pages/registration/registration.component";
import {UserListPage} from "./pages/user/userList/userList.component";
import {UserProfilePage} from "./pages/user/userProfile/userProfile.component";
import {ModalComponent} from './components/modal/modal.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {StoreModule} from '@ngrx/store';
import {counterReducer} from './../ngRx/counter.reducer';
import {MyCounterComponent} from './components/my-counter/my-counter.component';
import {ButtonComponent} from './components/button/button.component';
import {InputComponent} from './components/input/input.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthModule} from '@auth0/auth0-angular';
import {environment} from "../environments/environments";
import {actionReducer, companyReducer, userReducer} from "../ngRx/user.reducer";
import {CurrentComponent} from "./components/currentComponent";
import {ToastrModule} from "ngx-toastr";
import {provideToastr} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserItemComponent} from './components/user-item/user-item.component';
import {UserUpdateModalComponent} from './components/user-update-modal/user-update-modal.component';
import {EditPasswordModalComponent} from './components/edit-password-modal/edit-password-modal.component';
import {CompanyItemComponent} from './components/company-item/company-item.component';
import {CreateCompanyModalComponent} from './components/create-company-modal/create-company-modal.component';
import {CompanyUpdateModalComponent} from './components/company-update-modal/company-update-modal.component';
import { UserCompaniesPageComponent } from './pages/user/userCompanies/user-companies-page/user-companies-page.component';
import { UserInvitesPageComponent } from './pages/user/userCompanies/user-invites-page/user-invites-page.component';
import { UserRequestsPageComponent } from './pages/user/userCompanies/user-rrquests-page/user-requests-page.component';
import { MembersPageComponent } from './pages/user/userCompanies/members-page/members-page.component';
import { CompanyInvitesPageComponent } from './pages/user/userCompanies/company-invites-page/company-invites-page.component';
import { CompanyRequestsPageComponent } from './pages/user/userCompanies/company-requests-page/company-requests-page.component';
import { SendInviteModalComponent } from './components/send-invite-modal/send-invite-modal.component';
import { CompanyAdminsPageComponent } from './pages/user/userCompanies/company-admins-page/company-admins-page.component';
import { CreateQuizModalComponent } from './components/create-quiz-modal/create-quiz-modal.component';
import { QuestionFieldComponent } from './components/question-field/question-field.component';
import { AnswerComponentComponent } from './components/answer-component/answer-component.component';
import { QuizListComponent } from './pages/quiz-list/quiz-list.component';
import { QuizItemComponent } from './components/quiz-item/quiz-item.component';
import { UpdateQuizModalComponent } from './components/update-quiz-modal/update-quiz-modal.component';
import { QuestionLinesComponent } from './components/question-lines/question-lines.component';
import { UpdateQuestionModalComponent } from './components/update-question-modal/update-question-modal.component';
import { AddQuestionModalComponent } from './components/add-question-modal/add-question-modal.component';
import { TakeQuizModalComponent } from './components/take-quiz-modal/take-quiz-modal.component';

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
        ButtonComponent,
        InputComponent,
        CurrentComponent,
        UserItemComponent,
        UserUpdateModalComponent,
        EditPasswordModalComponent,
        CompanyItemComponent,
        CreateCompanyModalComponent,
        CompanyUpdateModalComponent,
        UserCompaniesPageComponent,
        UserInvitesPageComponent,
        UserRequestsPageComponent,
        MembersPageComponent,
        CompanyInvitesPageComponent,
        CompanyRequestsPageComponent,
        SendInviteModalComponent,
        CompanyAdminsPageComponent,
        CreateQuizModalComponent,
        QuestionFieldComponent,
        AnswerComponentComponent,
        QuizListComponent,
        QuizItemComponent,
        UpdateQuizModalComponent,
        QuestionLinesComponent,
        UpdateQuestionModalComponent,
        AddQuestionModalComponent,
        TakeQuizModalComponent
    ],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({
            count: counterReducer,
            user: userReducer,
            company: companyReducer,
            action: actionReducer
        }, {}),
        FormsModule,
        ReactiveFormsModule,
        AuthModule.forRoot({
            domain: environment.domain,
            clientId: environment.clientId,
            authorizationParams: {
                audience: environment.audience,
                redirect_uri: window.location.origin
            }
        }),
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
    ],
    providers: [
        provideAnimations(),
        provideToastr(),],
    bootstrap: [AppComponent]
})
export class AppModule {
}

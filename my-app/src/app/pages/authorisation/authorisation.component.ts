import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {delay, map, Observable, of} from "rxjs";
import {checkAuthEffects, logInUserEffects} from "../../../ngRx/healthcheck.effects";
import {AuthService} from "@auth0/auth0-angular";
import {Store} from "@ngrx/store";
import {userAuthorized} from "../../../ngRx/user.actions";
import {UserState} from "../../../ngRx/user.reducer";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {User} from "../../types/types";

@Component({
  selector: 'app-authorisation-page',
  templateUrl: './authorisation.component.html',
  styleUrls: ['authorisation.component.css']
})
export class AuthorisationPage implements OnInit {
  user$: Observable<User | null>;
  isAuthorized$: Observable<boolean>;
  emailAsyncValidator = (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(null).pipe(
      delay(1000),
      map(() => {
        const emailExists = ['user@example.com', 'anotheruser@example.com'].includes(control.value);
        return emailExists ? {emailTaken: true} : null;
      })
    );
  };

  authorizationFields = [
    {
      label: 'Email',
      name: 'user_email',
      type: 'email',
    },
    {
      label: 'Password',
      name: 'user_password',
      type: 'password',
    }
  ]

  title = "Authorisation";
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private store: Store<{ user: UserState }>,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.isAuthorized$ = this.store.select((state) => state.user.isAuthorized);
    this.user$ = this.store.select((state) => state.user.user);
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      user_email: ['', [Validators.required, Validators.email], [this.emailAsyncValidator]],
      user_password: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    let userFromStore: User | null = null;
    this.store.select((state) => state.user.user).subscribe((user) => {
      userFromStore = user;
    });
    if (this.form.invalid) {
      this.toastr.error('Form is invalid', 'Error!', {toastClass: 'custom-toast-error'});
      return
    }

    if (!await logInUserEffects(this.f["user_email"].value, this.f["user_password"].value)) {
      this.toastr.error('Login failed', 'Error!', {toastClass: 'custom-toast-error'});
      return
    }

    if (!await checkAuthEffects(this.store)) {
      this.toastr.error('Login failed', 'Error!', {toastClass: 'custom-toast-error'});
      return
    }

    this.store.dispatch(userAuthorized());
    await this.router.navigate(['/user-profile']);
    this.toastr.success('Welcome!', 'Success!', {toastClass: 'custom-toast-success'});
  }

  async setTokenAuth() {
    this.auth.getAccessTokenSilently().subscribe(
      (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken);
      },
      (error: any) => {
        console.error('Error getting access token:', error);
      }
    );
  };


  async LoginWithAuth() {
    let userFromStore: User | null = null;
    this.store.select((state) => state.user.user).subscribe((user) => {
      userFromStore = user;
    });
    await this.auth.loginWithRedirect();
    this.setTokenAuth().then(async () => {
        if (userFromStore && await checkAuthEffects(this.store)) {
          this.store.dispatch(userAuthorized());
        }
      }
    )
  }
}

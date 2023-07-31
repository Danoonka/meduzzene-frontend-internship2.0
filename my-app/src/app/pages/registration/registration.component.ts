import {Component} from '@angular/core'
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {delay, map, Observable, of} from "rxjs";
import {checkAuthEffects, logInUserEffects, SignUpEffects} from "../../../ngRx/healthcheck.effects";
import {AuthService} from "@auth0/auth0-angular";
import {Store} from "@ngrx/store";
import {User, userAuthorized, UserToSignUp} from "../../../ngRx/user.actions";
import {UserState} from "../../../ngRx/user.reducer";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration.component.html',
  styleUrls: ['registration.component.css']
})
export class RegistrationPage {
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
  title = "Registration"
  form!: FormGroup;
  loading = false;
  submitted = false;

  registrationFields = [
    {
      label: 'Email',
      name: 'user_email',
      type: 'email',
    },
    {
      label: 'Password',
      name: 'user_password',
      type: 'password',
    },
    {
      label: 'Repeat password',
      name: 'user_password_repeat',
      type: 'password',
    },
    {
      label: 'Firstname',
      name: 'user_firstname',
      type: 'text',
    },
    {
      label: 'Lastname',
      name: 'user_lastname',
      type: 'text',
    },
  ];
  private user: UserToSignUp | null = null;

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
      user_password: ['', Validators.required],
      user_password_repeat: ['', Validators.required],
      user_firstname: ['', Validators.required],
      user_lastname: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    let userFromStore: User | null = null;
    await this.store.select((state) => state.user.user).subscribe((user) => {
      userFromStore = user;
    });

    if (this.form.invalid) {
      this.toastr.error('Form is invalid', 'Error!', {toastClass: 'custom-toast-error'});
      return
    }

    if (!this.f["user_password"].value || !this.f["user_password"].value === this.f["user_password_repeat"].value) {
      return
    }

    this.user = {
      user_email: this.f["user_email"].value,
      user_password: this.f["user_password"].value,
      user_firstname: this.f["user_firstname"].value,
      user_lastname: this.f["user_lastname"].value
    }

    if (!await SignUpEffects(this.user)) {
      return
    }

    if (!await logInUserEffects(this.f["user_email"].value, this.f["user_password"].value)) {
      this.toastr.error('Registration failed', 'Error!', {toastClass: 'custom-toast-error'});
      return
    }

    if (!await checkAuthEffects(this.store)) {
      this.toastr.error('Registration failed', 'Error!', {toastClass: 'custom-toast-error'});
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


  async RegistrationWithAuth() {
    let userFromStore: User | null = null;
    this.store.select((state) => state.user.user).subscribe((user) => {
      userFromStore = user;
    });
    try {
      await this.auth.loginWithRedirect()
      await this.setTokenAuth();
      if (userFromStore && await checkAuthEffects(this.store)) {
        this.store.dispatch(userAuthorized());
      }
    } catch (error) {
      console.error('Error during login with auth:', error);
    }


  }
}

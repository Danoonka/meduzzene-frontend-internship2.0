import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../ngRx/user.actions";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {UserState} from "../../../ngRx/user.reducer";
import {updateUserPasswordEffects} from "../../../ngRx/healthcheck.effects";


@Component({
  selector: 'app-edit-password-modal',
  templateUrl: './edit-password-modal.component.html',
  styleUrls: ['../modal/modal.component.css']
})
export class EditPasswordModalComponent {
  user$: Observable<User | null>;
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ user: UserState }>
  ) {
    this.user$ = this.store.select((state) => state.user.user);
  }

  editPASSWORD = [
    {
      label: 'Enter previous password',
      name: 'user_password',
      type: 'text'
    },
    {
      label: 'New password',
      name: 'user_new_password',
      type: 'text'
    },
    {
      label: 'Repeat password',
      name: 'user_new_password_repeat',
      type: 'text'
    },]

  ngOnInit() {
    this.form = this.formBuilder.group({
      user_password: ['', Validators.required],
      user_new_password: ['', Validators.required],
      user_new_password_repeat: ['', Validators.required],
    });
  }


  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.user$.subscribe((user) => {
      if (user) {
        updateUserPasswordEffects(user.user_id, this.f["user_password"].value, this.f["user_new_password"].value, this.store)
      }
    });

    this.closeDialog();
  }

  showDialog() {
    let modal_t = document.getElementById('modal_2')
    modal_t?.classList.remove('hhidden')
    modal_t?.classList.add('sshow');
  }

  closeDialog() {
    let modal_t = document.getElementById('modal_2')
    modal_t?.classList.remove('sshow')
    modal_t?.classList.add('hhidden');
  }
}

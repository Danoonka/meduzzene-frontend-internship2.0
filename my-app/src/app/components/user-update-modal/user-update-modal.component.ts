import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../../ngRx/user.actions";
import { Store } from "@ngrx/store";
import { UserState } from "../../../ngRx/user.reducer";
import { Observable } from "rxjs";
import {updateUserInfoEffects} from "../../../ngRx/healthcheck.effects";

@Component({
  selector: 'app-user-update-modal',
  templateUrl: './user-update-modal.component.html',
  styleUrls: ['../modal/modal.component.css']
})
export class UserUpdateModalComponent {
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

  ngOnInit() {
    this.form = this.formBuilder.group({
      user_firstname: ['', Validators.required],
      user_lastname: ['', Validators.required],
      user_status: [''],
      user_city: [''],
      user_phone: [0],
      user_links: [''],
    });

    this.user$.subscribe((user) => {
      if (user) {
        this.form.patchValue({
          user_firstname: user.user_firstname,
          user_lastname: user.user_lastname,
          user_status: user.user_status,
          user_city: user.user_city,
          user_phone: user.user_phone,
          user_links: user.user_links,
        });
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

   let userToEdit  = {
     user_firstname: this.f["user_firstname"].value,
     user_lastname: this.f["user_lastname"].value,
     user_avatar: '',
     user_status: this.f["user_status"].value ? this.f["user_status"].value : "",
     user_city: this.f["user_city"].value? this.f["user_city"].value : "",
     user_phone: this.f["user_phone"].value ? this.f["user_phone"].value: 0
   }

    this.user$.subscribe((user) => {
      if (user) {
        updateUserInfoEffects(user.user_id, userToEdit, this.store)
      }
    });

    this.closeDialog();
  }

  editFields = [
    {
      label: 'Firstname',
      name: 'user_firstname',
      type: 'text'
    },
    {
      label: 'Lastname',
      name: 'user_lastname',
      type: 'text'
    },
    {
      label: 'Status',
      name: 'user_status',
      type: 'text'
    },
    {
      label: 'City',
      name: 'user_city',
      type: 'text'
    },
    {
      label: 'Phone',
      name: 'user_phone',
      type: 'text'
    },
    {
      label: 'Links',
      name: 'user_links',
      type: 'text'
    }
  ];

  showDialog() {
    let modal_t = document.getElementById('modal_1')
    modal_t?.classList.remove('hhidden')
    modal_t?.classList.add('sshow');
  }

  closeDialog() {
    let modal_t = document.getElementById('modal_1')
    modal_t?.classList.remove('sshow')
    modal_t?.classList.add('hhidden');
  }
}

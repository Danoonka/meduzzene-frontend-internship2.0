import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {CompanyById} from "../../../ngRx/user.actions";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {CompanyState} from "../../../ngRx/user.reducer";
import {updateCompanyInfoEffects} from "../../../ngRx/healthcheck.effects";

@Component({
  selector: 'app-company-update-modal',
  templateUrl: './company-update-modal.component.html',
  styleUrls: ['../modal/modal.component.css']
})
export class CompanyUpdateModalComponent {
  company$: Observable<CompanyById | null>;
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private store: Store<{ company: CompanyState }>
  ) {
    this.company$ = this.store.select((state) => state.company.companyById);
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      company_name: ['', Validators.required],
      company_description: ['', Validators.required],
    });

    this.company$.subscribe((company) => {
      if (company) {
        this.form.patchValue({
          company_name: company.company_name,
          company_description: company.company_description,
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

    let companyToEdit  = {
      company_name: this.f["company_name"].value,
      company_description: this.f["company_description"].value,
    }

    this.company$.subscribe((company) => {
      if (company){
        updateCompanyInfoEffects(company.company_id, companyToEdit, this.store)
      }
    })

    this.closeDialog();
  }

  editFields = [
    {
      label: 'Name',
      name: 'company_name',
      type: 'text'
    },
    {
      label: 'Description',
      name: 'company_description',
      type: 'text'
    }
  ];

  showDialog() {
    let modal_t = document.getElementById('modal_4')
    modal_t?.classList.remove('hhidden')
    modal_t?.classList.add('sshow');
  }

  closeDialog() {
    let modal_t = document.getElementById('modal_4')
    modal_t?.classList.remove('sshow')
    modal_t?.classList.add('hhidden');
  }

}

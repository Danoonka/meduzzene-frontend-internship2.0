import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {CompanyState} from "../../../ngRx/user.reducer";
import {CreateCompany} from "../../../ngRx/healthcheck.effects";
import {CompanyToCreate} from "../../types/types";

@Component({
  selector: 'app-create-company-modal',
  templateUrl: './create-company-modal.component.html',
  styleUrls: ['../modal/modal.component.css']
})
export class CreateCompanyModalComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private store: Store<{ company: CompanyState }>
  ) {}


  createCompany = [
    {
      label: 'Name',
      name: 'company_name',
      type: 'text'
    },
    {
      label: 'Description',
      name: 'company_description',
      type: 'text'
    }]

  ngOnInit() {
    this.form = this.formBuilder.group({
      company_name: ['', Validators.required],
      company_description: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }


  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    let newCompany: CompanyToCreate = {
      company_name: this.f["company_name"].value,
      company_description: this.f["company_description"].value
    }

    CreateCompany(newCompany, this.store).then(()=>this.closeDialog())
  }

  showDialog() {
    let modal_t = document.getElementById('modal_3')
    modal_t?.classList.remove('hhidden')
    modal_t?.classList.add('sshow');
  }

  closeDialog() {
    let modal_t = document.getElementById('modal_3')
    modal_t?.classList.remove('sshow')
    modal_t?.classList.add('hhidden');
  }
}

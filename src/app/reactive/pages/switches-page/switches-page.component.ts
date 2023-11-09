import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [],
})
export class SwitchesPageComponent implements OnInit {
  public myForm: FormGroup = this.fb.group({
    gender: ['', Validators.required],
    wantNotifications: [false, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  public person = { gender: '', wantNotifications: false };

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSave(): void {
    if (this.myForm.invalid) return;

    this.myForm.markAllAsTouched();

    //Creamos un new person con las propiedades del formulario menos termsAndConditions
    const { termsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    console.log(this.person);
    this.myForm.reset({
      gender: '',
      wantNotifications: false,
      termsAndConditions: false,
    });
    return;
  }
}

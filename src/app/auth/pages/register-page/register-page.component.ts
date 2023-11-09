import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(
            this.validatorsService.firstNameAndLastnamePattern
          ),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
        ],
        [this.emailValidatorService.validate],
      ],
      username: [
        '',
        [Validators.required, this.validatorsService.canBeStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorsService.isFieldOneEqualsFieldTwo(
          'password',
          'password2'
        ),
      ],
    }
  );

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidatorService: EmailValidatorService
  ) {}

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSave(): void {
    console.log('myForm', this.myForm);
    this.myForm.markAllAsTouched();
  }
}

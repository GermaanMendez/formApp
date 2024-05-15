import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormBuilder, FormGroup,Validators } from '@angular/forms';
import * as customValidators from '../../shared/validators/validators';
import { ValidatorsService } from '../../shared/services/validators.service';
import { EmailValidatorService } from '../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl:'./registerPage.component.html',
  styles: ` `,
})
export class RegisterPageComponent {
  private validatorsService: ValidatorsService;
  private fb: FormBuilder;
  public myForm: FormGroup;

  constructor(fb: FormBuilder, validatorsService: ValidatorsService) {
    this.validatorsService = validatorsService;
    this.fb = fb;
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)], []],
      email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [new EmailValidatorService()]],
      userName: ['', [Validators.required, this.validatorsService.cantBeStrider], []],
      password: ['', [Validators.required, Validators.minLength(6)], []],
      password2: ['', [Validators.required, Validators.minLength(6)], []],
    }, {
      validators: [
        //aca se valida a nivel de TODO el formulario, arriba se valida a nivel de CADA field
        this.validatorsService.isFieldOneEqualToFieldTwo('password', 'password2')
      ]
    });
  }
  isNotValidField(field: string): boolean | null{
    return this.validatorsService.isNotValidField(this.myForm,field)
  }
  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // this.myForm.reset();
  }
}

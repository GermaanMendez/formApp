import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {
  private validatorsService: ValidatorsService;
  private fb: FormBuilder;
  public myForm: FormGroup;

  constructor(fb: FormBuilder, validatorsService: ValidatorsService) {
    this.validatorsService = validatorsService;
    this.fb = fb;
    this.myForm = this.fb.group({
      gender: ['M', [Validators.required], []],
      wantNotification: [true, [Validators.required], []],
      termsAndCondition:[false,[Validators.requiredTrue],[]],
    })
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset();
  }

  isNotValidField(field: string): boolean | null{
    return this.validatorsService.isNotValidField(this.myForm,field)
  }
}

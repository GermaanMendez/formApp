import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const rtx5090 = {
  name:'RTX5090',
  price:2500,
  inStorage:10,
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {

  private fb: FormBuilder;
  public myForm: FormGroup;


  constructor(fb: FormBuilder) {
    this.fb = fb;
    //param1: valor por defecto
    //param2: validaciones sincronas
    //param3: validaciones asincronas
    this.myForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(3)],[]],
      price:[0,[Validators.required, Validators.min(0)],[]],
      inStorage:[0,[Validators.required, Validators.min(0)],[]],
    })
  }

  ngOnInit(): void {
    //reestablece el formulario y en este caso mete esos valores por defecto
    // this.myForm.reset(rtx5090)
    // this.myForm.reset();
  }
  //metodo custom para saber si una field es valida o no
  isNotValidField(field: string):boolean|null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null{
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};
    //obtengo el nombre/key del error ejemplo required,  minlength
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This Field is required'
        case 'minlength':
          return `This field must be contain ${errors['minlength'].requiredLength} characters`
      }
    }
    return ''
  }

  onSave(): void{
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return;
    }
    console.log(this.myForm.value)

    //reestablece el formulario y en este caso mete esos valores por defecto
    // this.myForm.reset(rtx5090)
    this.myForm.reset();

  }

}

import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {
  public myForm: FormGroup;
  private fb: FormBuilder;
  public newFavorite: FormControl = new FormControl('',[Validators.required]);

  constructor(fb: FormBuilder) {
    this.fb = fb;

    this.myForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(3)],[]],
      favouriteGames: this.fb.array([
        ['God of war', Validators.required],
        ['Mario Bros', Validators.required],

      ]),
      inStorage:[0,[Validators.required, Validators.min(0)],[]],
    })
  }

  get favoriteGamesControl() {
    return this.myForm.get('favouriteGames') as FormArray;
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

  //metodo custom para saber si una field es valida o no
  isNotValidField(field: string):boolean|null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  isNotValidFieldInArray(formArray:FormArray, index:number) {
    return formArray.controls[index].errors && formArray.controls[index].touched
  }

  onSubmit(): void{
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return
    }
    console.log(this.myForm.value);
    this.favoriteGamesControl.clear();
    this.myForm.reset();
  }

  onDeleteFavorite(index: number): void{
    this.favoriteGamesControl.removeAt(index)
  }

  onAddToFavorites(): void{
    if (this.newFavorite.invalid) return;
    console.log(this.newFavorite.value)
    const newGame = this.newFavorite.value;

    this.favoriteGamesControl.push(this.fb.control(newGame, Validators.required))
    this.newFavorite.reset()
  }

}

import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

//validador asincrono
@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator {

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    //recibo el email y hago una peticion http a un backend que me devuelve si el email ya esta en uso, en ese caso
    //como no existe dicha api lo hago asi paraprobar
    const email = control.value;
    const httpCallObservable = new Observable<ValidationErrors|null>((suscriber) => {
      if (email === 'german@gmail.com') {
        //siguiente valor que se emite
        //se completa y no se emiten mas valores
        suscriber.next({ emailIsAlreadyInUse: true })
        suscriber.complete();
      }

      suscriber.next(null);
      suscriber.complete();
    })

    return httpCallObservable;
  }




}

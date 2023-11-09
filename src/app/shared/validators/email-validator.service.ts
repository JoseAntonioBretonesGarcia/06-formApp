import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    const httCallEmailTaken = new Observable<ValidationErrors | null>(
      (subscriber) => {
        if (email === 'jose@google.com') {
          subscriber.next({ emailTaken: true });
        } else {
          subscriber.next(null);
        }
        subscriber.complete();
      }
    ).pipe(delay(2000));

    return httCallEmailTaken;
  }
}

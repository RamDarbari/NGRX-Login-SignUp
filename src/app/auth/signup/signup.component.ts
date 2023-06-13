import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signUp } from 'src/data';
import { AuthService } from '../services/auth.service';
import { signup } from 'src/app/store /action/actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  sellerSignUp!: NgForm;
  constructor(private _admin: AuthService, private store: Store){}

  signUp(data: signUp): void {
    this.store.dispatch(signup({signUpData: data}))
    this._admin.signup(data);
  }


  hasUpperCase(value: string): boolean {
    return /[A-Z]/.test(value);
  }

  hasSymbol(value: string): boolean {
    return /[!@#$%^&*()_+]/.test(value);
  }

  hasThreeConsecutiveNumbers(value: string): boolean {
    return /[0-9]{3,}/.test(value);
  }

  passwordIsValid(value: string): boolean {
    return (
      this.hasUpperCase(value) &&
      this.hasSymbol(value) &&
      !this.hasThreeConsecutiveNumbers(value) &&
      value.length >= 8
    );
  }
  passwordsDoNotMatch(): boolean {
    const password = this.sellerSignUp?.value?.password;
    const password2 = this.sellerSignUp?.value?.password2;
    return password !== password2;
  }
}

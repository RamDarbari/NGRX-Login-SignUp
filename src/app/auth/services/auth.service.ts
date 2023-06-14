import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { signUp, login } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isuserLoggedIn = new BehaviorSubject<boolean>(false);
  isLogginFailed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient, private _router: Router, private toastr: ToastrService) { }
         

  signup(data: signUp): Observable<any> {
    if (!data.userName || !data.emailAddress || !data.password) {
      this.toastr.error('Please fill all the required fields');
      return of(null);
    }
    try {
      return this._http.post<any>('http://10.8.10.95:4003/users/', data, { headers: { "Content-Type": "application/json" } }).pipe(
        tap((response: any) => {
          // localStorage.setItem('user', JSON.stringify(response.token));
          this.toastr.success('User sign-up successfully');
          this.isuserLoggedIn.next(true);
          this._router.navigate(['/admin']);
        }),
      );
    } catch (error) {
      console.log('Signup failed', error);
      this.toastr.error('An error occurred during Signup. Please try again.')
      return of(null);
    }
  }

  login(data: login): Observable<any> {
    if (!data.emailAddress || !data.password) {
      this.toastr.error('Please fill all the required fields');
      return of(null);
    }
    return this._http.post<any>('http://10.8.10.95:4003/users/login', data).pipe(
      tap((response: any) => {
        const user = response;
        // if(response.status !== 200) throw new Error;
        if (user) {
          // localStorage.setItem('user', JSON.stringify(response));
          this.toastr.success('User logged in successfully');
          this.isuserLoggedIn.next(true);
          this.isLogginFailed.next(false);
          this._router.navigate(['./admin']);
        } else {
          this.isuserLoggedIn.next(false);
        }
      }),
      catchError((error: any) => {
        console.log('API error:', error);
        this.toastr.error('An error occurred during login. Please try again.');
        return of(null);
      })
    );
  }
  
  

  reloadSeller() {
    if (localStorage.getItem('user')) {
      this.isuserLoggedIn.next(true);
      this._router.navigate(['./admin'])
    }
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');

    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

}

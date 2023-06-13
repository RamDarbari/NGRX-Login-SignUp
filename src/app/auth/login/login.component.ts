import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { login } from 'src/data';
import { AuthService } from '../services/auth.service';
import { login1 } from 'src/app/store /action/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private _admin: AuthService,
    private _router: Router,
    private _taostr: ToastrService,
    private store: Store
  ) { }
  loginError: any;

  ngOnInit() {
    // this._admin.reloadSeller();
  }
  
  login(data: login) {
    this.store.dispatch(login1({ loginData: data }));
    this._admin.isLogginFailed.subscribe((isError) => {
      if (isError) {
        this.loginError = this._taostr.error('Email or Password is not correct');
      }
    });
  }
}

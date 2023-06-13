import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/data';
import * as actions from '../action/actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) { }


    login$ = createEffect((): Observable<any> =>
        this.actions$.pipe(
            ofType(actions.login1),
            switchMap((action) => {
                console.log(action.loginData);
                return this.authService.login(action.loginData).pipe(
                    map((user: User) => actions.loginSuccess({ user })),
                    catchError((error) => {
                        return of(actions.loginFailure({ error: error.message }));
                    })
                );
            })
        )
    );
    
    signup$ = createEffect((): Observable<any> => {
        return this.actions$.pipe(
            ofType(actions.signup),
            switchMap((action) => {
                return this.authService.signup(action.signUpData).pipe(
                    map((user: User) => actions.signupSuccess({ user })),
                    catchError((error) => {
                        return of(actions.signupFailure({ error: error.message }));
                    })
                );
            })
        )

    });
}

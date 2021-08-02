import { IUser } from 'src/app/core/models/user.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { AuthenticationService } from '../../services/authentification.service';
import { IAppState } from '../state/app.state';
import { AuthUserActions, UserActions } from './user.actions';

@Injectable()
export class UserEffects {
	getUserModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.GetUserModel),
			mergeMap(({ id }) =>
				this.userService.getUserModel(id).pipe(
					map((payload) => UserActions.GetUserModelSuccess({ user: payload })),
					catchError(() => of(UserActions.GetUserModelFail())),
				),
			),
		),
	);

	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthUserActions.SignIn),
			switchMap(({ login, password }: { login: string; password: string }) =>
				this.authenticationService.login(login, password).pipe(
					map((user: IUser) => {
						return AuthUserActions.SignInComplete({ user });
					}),
					catchError((errors) => of(AuthUserActions.SignInError({ errors }))),
				),
			),
		),
	);

	checkToken$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthUserActions.CheckToken),
			switchMap(() =>
				this.authenticationService.checkToken().pipe(
					map((user: IUser) => {
						return AuthUserActions.SignInComplete({ user });
					}),
					catchError((errors) => of(AuthUserActions.CheckTokenError({ errors }))),
				),
			),
		),
	);

	/*   newUserModel$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.NewUserModel),
      mergeMap(() => this.userService.newUserModel()
          .pipe(
              map((payload) => UserActions.GetUserModelSuccess({ user: payload })),
              catchError(() => of(UserActions.GetUserModelFail()))
        ))
      ));
    updateUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.UpdateUser),
      switchMap(payload => this.userService.updateUser(payload)
          .pipe(
              map(result => {
                if (result && result.isValid === true) {
                  return UserActions.UpdateUserComplete();
                }
                return UserActions.UpdateUserFail({errors: result.error});
              })
        ))
      ));
      createUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.CreateUser),
        switchMap(payload => this.userService.createUser(payload.user)
            .pipe(
                map(result => {
                  if (result && result.isValid === true) {
                    return UserActions.CreateUserComplete({id: result.id});
                  }
                  return UserActions.UpdateUserFail({errors: result.error});
                })
          ))
        ));
*/
	constructor(
		private store: Store<IAppState>,
		private actions$: Actions,
		private userService: UserService,
		private authenticationService: AuthenticationService,
	) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthUserActions, IUser, UserActions } from '../actions/user.actions';

@Injectable()
export class UserEffects {
	public constructor(
		private actions$: Actions,
		private userService: UserService,
		private authenticationService: AuthenticationService, // private router: Router,
	) {}

	public getUserModel$ = createEffect(() =>
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

	public logOut$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthUserActions.LogOut),
			map(() => {
				this.authenticationService.logout();
				return AuthUserActions.LogOutComplete();
			}),
			catchError(() => of(AuthUserActions.LogOutError())),
		),
	);

	public login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthUserActions.SignIn),
			switchMap(
				({ login, password }: { login: string | undefined; password: string | undefined }) => {
					return this.authenticationService.login(login, password).pipe(
						map((user: IUser) => {
							this.authenticationService.saveToken(user.token);
							return AuthUserActions.SignInComplete({ user });
						}),
						catchError((errors) => {
							return of(AuthUserActions.SignInError({ errors }));
						}),
					);
				},
			),
		),
	);

	public checkToken$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthUserActions.CheckToken),
			switchMap(() => {
				return this.authenticationService.checkToken().pipe(
					map((user: IUser) => {
						return AuthUserActions.SignInComplete({ user });
					}),
					catchError((errors) => {
						console.log(`errors: ${errors}`);
						return of(AuthUserActions.CheckTokenError({ errors }));
					}),
				);
			}),
		),
	);
}

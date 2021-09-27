import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
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
		private authenticationService: AuthenticationService,
		public _store: Store<IUser>,
	) {}

	public getUserModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.GetUserModel),
			mergeMap(({ id }: { id: number | null }) =>
				this.userService.getUserModel(id).pipe(
					map((payload: IUser) => UserActions.GetUserModelSuccess({ user: payload })),
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
							this._store.dispatch(UserActions.GetUserAvatarPending({ id: user.userId }));
							return AuthUserActions.SignInComplete({ user });
						}),
						catchError((errors: string) => {
							return of(AuthUserActions.SignInError({ errors }));
						}),
					);
				},
			),
		),
	);

	public getUserAvatar$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.GetUserAvatarPending),
			switchMap(({ id }: { id: number }) => {
				return this.authenticationService.getUserAvatar(id).pipe(
					map((response: { data: string }) => {
						return UserActions.GetUserAvatarSuccess({ url: response.data });
					}),
					catchError((errors: string) => {
						return of(UserActions.GetUserAvatarError({ errors }));
					}),
				);
			}),
		),
	);

	public checkToken$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthUserActions.CheckToken),
			switchMap(() => {
				return this.authenticationService.checkToken().pipe(
					mergeMap((user: IUser) => {
						return [
							AuthUserActions.SignInComplete({ user }),
							UserActions.GetUserAvatarPending({ id: user.userId }),
						];
					}),
					catchError((errors: string) => {
						return of(AuthUserActions.CheckTokenError({ errors }));
					}),
				);
			}),
		),
	);
}

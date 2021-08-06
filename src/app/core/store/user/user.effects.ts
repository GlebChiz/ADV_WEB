import { IUser } from 'src/app/core/models/user.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
// import { AuthenticationService } from '../../../shared/services/authentification.service';
import { AuthenticationService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { AuthUserActions, UserActions } from './user.actions';
// import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
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

	public login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthUserActions.SignIn),
			switchMap(
				({ login, password }: { login: string | undefined; password: string | undefined }) => {
					return this.authenticationService.login(login, password).pipe(
						map((user: IUser) => {
							this.authenticationService.saveToken(user.token);
							window.location.href = this.route.snapshot.queryParams.returnUrl;
							// this.router.navigate([this.route.snapshot.queryParams.returnUrl]);
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
	public constructor(
		private actions$: Actions,
		private route: ActivatedRoute,
		private userService: UserService,
		// private router: Router,
		private authenticationService: AuthenticationService, // private router: Router,
	) {}
}

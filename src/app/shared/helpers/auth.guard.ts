import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/core/models/user.model';
import { IAppState } from 'src/app/core/store/state/app.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	public constructor(
		private router: Router,
		// private auth: AuthenticationService,
		// private authenticationService: AuthenticationService,
		private _store: Store<IAppState>,
	) {}

	public canActivate(
		_route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
		// _route: ActivatedRouteSnapshot,
	): // _route: ActivatedRouteSnapshot,
	// state: RouterStateSnapshot,
	boolean {
		// const currentUser = this.authenticationService.getCurrentUser();
		// if (currentUser) {
		// 	if (currentUser.sharedCallId) {
		// 		this.router.navigate(['/sharedcall']);
		// 		return false;
		// 	}
		// 	// authorised so return true
		// 	return true;
		// }
		// this.auth.currentUser?.userId;

		// if (this.auth.currentUser) {
		// 	console.log(this.auth.currentUser);
		// 	if (this.auth.currentUser.sharedCallId) {
		// 		this.router.navigate(['/sharedcall']);
		// 		return false;
		// 	}
		// 	return true;
		// }
		this._store.select('userState', 'user').subscribe((user: IUser | null) => {
			if (user) {
				if (user.sharedCallId) {
					this.router.navigate(['/sharedcall']);
					return false;
				}
				// authorised so return true
				return true;
			}
			return false;
		});
		// const currentUser = this.authenticationService.getCurrentUser();
		// if (currentUser) {
		// 	if (currentUser.sharedCallId) {
		// 		this.router.navigate(['/sharedcall']);
		// 		return false;
		// 	}
		// 	// authorised so return true
		// 	return true;
		// }

		// not logged in so redirect to login page with the return url
		// this.router.navigate(['/payers']);
		this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
		return false;
	}
}

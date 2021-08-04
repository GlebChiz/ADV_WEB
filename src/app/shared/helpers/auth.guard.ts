import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { IUser } from 'src/app/core/models/user.model';
// import { IAppState } from 'src/app/core/store/state/app.state';
import { AuthenticationService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	public constructor(
		private router: Router,
		private auth: AuthenticationService, // private auth: AuthenticationService, // private authenticationService: AuthenticationService, // private _store: Store<IAppState>,
	) {}

	// private currentUser!: IUser | null;

	// public ngOnInit(): void {
	// 	console.log(1);
	// 	this._store.select('userState', 'user').subscribe((user: IUser | null) => {
	// 		this.currentUser = user;
	// 	});
	// 	console.log(2);
	// }

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
		if (this.auth.getCurrentUser()?.userId) {
			if (this.auth.currentUser?.sharedCallId) {
				this.router.navigate(['/sharedcall']);
				return false;
			}
			// authorised so return true
			return true;
		}
		// return false;
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
		// console.log(state.url);
		// console.log(this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }));

		this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

		// this.router.navigate([`/${state.url === '/' ? 'login' : state.url}`]);
		return false;
	}
}

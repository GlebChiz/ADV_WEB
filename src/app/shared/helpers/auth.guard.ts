import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	public constructor(
		private router: Router,
		// private _store: Store<IAppState>,
		private auth: AuthenticationService,
	) {}

	// private currentUser!: IUser | null;

	// public ngOnInit(): void {
	// 	this._store.select('userState', 'user').subscribe((user: IUser | null) => {
	// 		this.currentUser = user;
	// 	});
	// }

	public canActivate(
		_route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
		// _route: ActivatedRouteSnapshot,
	): // _route: ActivatedRouteSnapshot,
	// state: RouterStateSnapshot,
	boolean {
		// const token: string = this._store
		// 	.select('userState', 'user')
		// 	.subscribe((user: IUser | null) => {
		// 		return user?.token;
		// 	});
		// if (token) {
		// 	return true;
		// }
		// this.router.navigate(['/']);
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
		// this.auth.currentUser?.userId;

		// if (this.auth.currentUser) {
		// 	console.log(this.auth.currentUser);
		// 	if (this.auth.currentUser.sharedCallId) {
		// 		this.router.navigate(['/sharedcall']);
		// 		return false;
		// 	}
		// 	return true;
		// }
		// this.auth.getCurrentUser();

		if (this.auth.getToken()) {
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

		// this.router.navigate(['/payers']);
		// console.log(state.url);
		// console.log(this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }));

		// not logged in so redirect to login page with the return url
		this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

		// this.router.navigate([`/${state.url === '/' ? 'login' : state.url}`]);
		return false;
	}
}

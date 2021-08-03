import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/core/models/user.model';
import { IAppState } from 'src/app/core/store/state/app.state';

@Injectable({ providedIn: 'root' })
export class SharedCallAuthGuard implements CanActivate {
	public constructor(private router: Router, private _store: Store<IAppState>) {}

	public canActivate(): // _route: ActivatedRouteSnapshot, _state: RouterStateSnapshot
	boolean {
		this._store.select('userState', 'user').subscribe((user: IUser | null) => {
			if (user?.sharedCallId) {
				return true;
			}
			return false;
		});
		// const currentUser = this.authenticationService.getCurrentUser();
		// if (currentUser?.sharedCallId) {
		// 	return true;
		// }

		// not logged in so redirect to login page with the return url
		this.router.navigate(['/login']);
		return false;
	}
}

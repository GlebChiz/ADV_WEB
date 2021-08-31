import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	public constructor(
		private router: Router,

		private auth: AuthenticationService,
	) {}

	public canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.auth.getToken()) {
			if (this.auth.currentUser?.sharedCallId) {
				this.router.navigate(['/sharedcall']);
				return false;
			}

			return true;
		}

		this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
		return false;
	}
}

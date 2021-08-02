import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services';

@Injectable({ providedIn: 'root' })
export class SharedCallAuthGuard implements CanActivate {
	constructor(private router: Router, private authenticationService: AuthenticationService) {}

	canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
		const currentUser = this.authenticationService.getCurrentUser();
		if (currentUser?.sharedCallId) {
			// authorised so return true
			return true;
		}

		// not logged in so redirect to login page with the return url
		this.router.navigate(['/login']);
		return false;
	}
}
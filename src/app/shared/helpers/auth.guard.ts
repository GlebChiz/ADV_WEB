import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthenticationService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	public constructor(
		private router: Router,

		private auth: AuthenticationService,
	) {}

	public canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const token: string | null = this.auth.getToken();
		if (!token) {
			this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
			return false;
		}
		const decoded: any = jwt_decode(token);
		const epochTime: number = new Date().getTime() / 1000;
		if (epochTime > decoded.exp) {
			this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
			return false;
		}
		if (this.auth.currentUser?.sharedCallId) {
			this.router.navigate(['/sharedcall']);
			return false;
		}
		// if (true) {
		// 	alert('you do not have access to this page');
		// 	return false;
		// }
		return true;
	}

	public canLoad(): boolean {
		if (true) {
			alert('You are not authorised to visit this page');
			return false;
		}
		return true;
	}
}

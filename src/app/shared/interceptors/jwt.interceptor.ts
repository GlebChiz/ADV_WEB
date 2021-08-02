import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private authenticationService: AuthenticationService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// add authorization header with jwt token if available
		let locRequest!: HttpRequest<any>;
		const currentUser = this.authenticationService.getCurrentUser();
		if (currentUser && currentUser.token) {
			locRequest = request.clone({
				setHeaders: {
					Authorization: `Bearer ${currentUser.token}`,
				},
			});
		}
		return next.handle(locRequest);
	}
}

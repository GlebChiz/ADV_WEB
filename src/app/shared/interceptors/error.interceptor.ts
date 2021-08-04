import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { AlertService, AuthenticationService } from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	public constructor(
		private authenticationService: AuthenticationService,
		private alertService: AlertService,
	) {}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((err) => {
				if (err.status === 401) {
					// auto logout if 401 response returned from api
					this.authenticationService.logout();
					// location.reload();
				}
				if (err.error?.isSuccess === false) {
					this.alertService.error(err.error.error);
				}

				const error: string = err.error?.message || err.statusText;
				return throwError(error);
			}),
		);
	}
}

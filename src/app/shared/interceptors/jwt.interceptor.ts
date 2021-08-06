/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders,
	HttpResponse,
} from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentification.service';
// import { AuthenticationService } from 'src/app/shared/services/authentification.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	public constructor(private authenticationService: AuthenticationService) {}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// let url: string = req.url;
		const headers: HttpHeaders = new HttpHeaders({
			Authorization: `Bearer ${this.authenticationService.getToken()}`,
			// enctype: 'multipart/form-data',
		});
		// add authorization header with jwt token if available
		const jsonReq: HttpRequest<any> = req.clone({
			headers,
		});
		return next.handle(jsonReq).pipe(filter(this._isHttpResponse));
	}

	private _isHttpResponse(event: HttpEvent<any>): event is HttpResponse<any> {
		if (event instanceof HttpResponse) {
			return true;
		}
		return false;
	}
}

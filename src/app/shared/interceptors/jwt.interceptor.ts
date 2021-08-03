import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders,
	HttpResponse,
} from '@angular/common/http';
import { Observable, map, filter } from 'rxjs';
import { AuthenticationService } from '../services/authentification.service';
// import { AuthenticationService } from 'src/app/shared/services/authentification.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	public constructor(private authenticationService: AuthenticationService) {}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log(this.authenticationService.getToken());

		const headers: HttpHeaders = new HttpHeaders({
			Authorization: `Bearer ${this.authenticationService.getToken()}`,
			// enctype: 'multipart/form-data',
		});
		// add authorization header with jwt token if available
		const jsonReq: HttpRequest<any> = req.clone({
			headers,
		});
		return next.handle(jsonReq).pipe(
			filter(this._isHttpResponse),
			map((res: HttpResponse<any>) => {
				return res.clone({ body: res.body && res.body.data });
			}),
		);
	}

	private _isHttpResponse(event: HttpEvent<any>): event is HttpResponse<any> {
		if (event instanceof HttpResponse) {
			return true;
		}
		return false;
	}
}

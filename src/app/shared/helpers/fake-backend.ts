import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpResponse,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

const users = [
	{ id: 1, firstName: 'Mordechai', lastName: 'Guterman', username: 'test', password: 'test' },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const { url, method, body } = request;
		// helper functions

		function ok(b?: Object) {
			return of(new HttpResponse({ status: 200, body: b }));
		}

		function error(message: string) {
			return throwError({ error: { message } });
		}

		// route functions

		function authenticate() {
			const { username, password } = body;
			const user = users.find((x) => x.username === username && x.password === password);
			if (!user) {
				return error('Username or password is incorrect');
			}
			return ok({
				id: user.id,
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				token: 'fake-jwt-token',
			});
		}
		function handleRoute() {
			switch (true) {
				case url.endsWith('/users/authenticate') && method === 'POST':
					return authenticate();
				default:
					// pass through any requests not handled above
					return next.handle(request);
			}
		}
		// wrap in delayed observable to simulate server api call
		return of(null)
			.pipe(mergeMap(handleRoute))
			.pipe(materialize())
			.pipe(delay(500))
			.pipe(dematerialize());
	}
}

export const fakeBackendProvider = {
	// use fake backend in place of Http service for backend-less development
	provide: HTTP_INTERCEPTORS,
	useClass: FakeBackendInterceptor,
	multi: true,
};

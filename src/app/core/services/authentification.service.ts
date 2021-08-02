import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/core/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	constructor(private http: HttpClient) {}

	public saveToken(token: string): void {
		localStorage.setItem('token', token);
	}

	public getToken(): string | null {
		return localStorage.getItem('token');
	}

	public logout(): void {
		localStorage.removeItem('token');
	}

	public getCurrentUser(): IUser {
		return new IUser();
	}

	login(username: string, password: string): Observable<IUser> {
		// console.log(`${environment.apiUrl}/users/authenticate`);
		return this.http.post<IUser>(`${environment.apiUrl}/users/authenticate`, {
			Username: username,
			Password: password,
		});
	}

	sharedCalllogin(sharedCallId: string, code: any) {
		return this.http
			.post<any>(`${environment.apiUrl}/users/shared-call-authenticate`, {
				id: sharedCallId,
				code,
			})
			.pipe(
				map((user) => {
					// this.setCurrentUser(user);
					return user;
				}),
			);
	}

	checkToken(): Observable<IUser> {
		return this.http.get<IUser>(`${environment.apiUrl}/users/current`);
	}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/core/models/user.model';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import { AuthUserActions } from 'src/app/core/store/user/user.actions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	public currentUser: BehaviorSubject<User>;

	constructor(private http: HttpClient, private _store: Store<IAppState>) {
		this.currentUser = new BehaviorSubject<User>(this.getCurrentUser());
	}

	public getCurrentUser(): User {
		return JSON.parse(localStorage.getItem('currentUser')!);
	}

	private setCurrentUser(user: User): void {
		// store user details and jwt token in local storage to keep user logged in between page refreshes
		localStorage.setItem('currentUser', JSON.stringify(user));
		this.currentUser.next(user);
		this._store.dispatch(AuthUserActions.SetUser({ user }));
	}

	private resetCurrentUser(): void {
		localStorage.removeItem('currentUser');
		this.currentUser.next(null);
		this._store.dispatch(AuthUserActions.SetUser({ user: null }));
	}

	login(username, password) {
		console.log(`${environment.apiUrl}/users/authenticate`);
		return this.http
			.post<any>(`${environment.apiUrl}/users/authenticate`, {
				Username: username,
				Password: password,
			})
			.pipe(
				map((user) => {
					this.setCurrentUser(user);
					return user;
				}),
			);
	}

	sharedCalllogin(sharedCallId, code) {
		return this.http
			.post<any>(`${environment.apiUrl}/users/shared-call-authenticate`, {
				id: sharedCallId,
				code,
			})
			.pipe(
				map((user) => {
					this.setCurrentUser(user);
					return user;
				}),
			);
	}

	logout() {
		// remove user from local storage and set current user to null
		this.resetCurrentUser();
	}

	apiUser() {
		return this.http.get<any>(`${environment.apiUrl}/users/current`).pipe(
			map((user) => {
				return user;
			}),
		);
	}

	getAPIUser(): Observable<any[]> {
		return this.http.get<any>(`${environment.apiUrl}/users/current`);
	}
}

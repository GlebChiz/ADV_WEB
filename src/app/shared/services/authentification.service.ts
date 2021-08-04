import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/core/models/user.model';
import { Store } from '@ngrx/store';
import { Injectable, OnInit } from '@angular/core';
import { IAppState } from '../../core/store/state/app.state';
// import { AuthUserActions } from 'src/app/core/store/user/user.actions';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService implements OnInit {
	public currentUser$: Observable<IUser | null> = this._store.select('userState', 'user');

	public currentUser?: IUser | null;

	public getCurrentUser(): IUser | null | undefined {
		this.currentUser$.subscribe((user: IUser | null) => {
			this.currentUser = user;
		});
		return this.currentUser;
	}

	public constructor(private http: HttpClient, private _store: Store<IAppState>) {}

	public saveToken(token: string): void {
		localStorage.setItem('token', token);
	}

	public getToken(): string | null {
		return localStorage.getItem('token');
	}

	public logout(): void {
		localStorage.removeItem('token');
	}

	public login(username: string | undefined, password: string | undefined): Observable<IUser> {
		return this.http.post<IUser>(`${environment.apiUrl}/users/authenticate`, {
			Username: username,
			Password: password,
		});
	}

	public sharedCalllogin(sharedCallId: string, code: any): any {
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

	public checkToken(): Observable<IUser> {
		return this.http.get<IUser>(`${environment.apiUrl}/users/current`);
	}

	// eslint-disable-next-line @angular-eslint/contextual-lifecycle
	public ngOnInit(): void {
		this.currentUser$.subscribe((user: IUser | null) => {
			this.currentUser = user;
		});
	}
}

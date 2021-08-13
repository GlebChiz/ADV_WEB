import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser, PermissionType } from 'src/app/store/actions/user.actions';

@Injectable({ providedIn: 'root' })
export class UserService {
	public constructor(private http: HttpClient) {}

	public checkPermissions(permissions: PermissionType[]): Observable<PermissionType[]> {
		return this.http.post<PermissionType[]>('permissions', permissions);
	}

	public getUserModel(id: number | null): Observable<IUser> {
		return this.http.get<IUser>(`${id}/get-model`);
	}

	public newUserModel(): Observable<IUser> {
		const model: any = {
			userId: null,
			person: {} as any,
		} as unknown as IUser;
		return of(model);
	}

	public updateUser(user: IUser): Observable<any> {
		return this.http.post('update', user);
	}

	public createUser(user: IUser): Observable<any> {
		return this.http.post('create', user);
	}
}

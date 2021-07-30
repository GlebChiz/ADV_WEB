import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/services';
import { PermissionType } from '../enums/permission.type';
import { IUser } from '../models/user.model';
import { IPerson } from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class UserService extends DataService {
	constructor(http: HttpClient) {
		super(http, 'users');
	}

	checkPermissions(permissions: PermissionType[]): Observable<PermissionType[]> {
		return this.post('permissions', permissions);
	}

	getUserModel(id: number | null): Observable<IUser> {
		return this.get(`${id}/get-model`);
	}

	newUserModel(): Observable<IUser> {
		const model = {
			userId: null,
			person: {} as IPerson,
		} as unknown as IUser;
		return of(model);
	}

	updateUser(user: IUser): Observable<any> {
		return this.post('update', user);
	}

	createUser(user: IUser): Observable<any> {
		return this.post('create', user);
	}
}

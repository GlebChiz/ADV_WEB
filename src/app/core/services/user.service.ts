import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/services';
import { PermissionType } from '../enums/permission.type';
import { User } from '../models/user.model';
import { Person } from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class UserService extends DataService {
	constructor(http: HttpClient) {
		super(http, 'users');
	}

	checkPermissions(permissions: PermissionType[]): Observable<PermissionType[]> {
		return this.post('permissions', permissions);
	}

	getUserModel(id: number | null): Observable<User> {
		return this.get(`${id}/get-model`);
	}

	newUserModel(): Observable<User> {
		const model = {
			userId: null,
			person: {} as Person,
		} as User;
		return of(model);
	}

	updateUser(user: User): Observable<any> {
		return this.post('update', user);
	}

	createUser(user: User): Observable<any> {
		return this.post('create', user);
	}
}

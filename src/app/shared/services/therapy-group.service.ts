import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TherapyGroupService {
	public constructor(private http: HttpClient) {}

	public updateFieldTherapyGroup(ids: string[], value: any, entity: string): Observable<any> {
		return this.http.put(`therapygroup/update-${entity}`, {
			ids,
			value,
		});
	}
}

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TherapyGroupDetailsService {
	public constructor(private http: HttpClient) {}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getTherapyGroupDetails(id: string): Observable<any> {
		return this.http.get(`therapygroup/${id}`);
	}
}

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionPlanDetailsService {
	public constructor(private http: HttpClient) {}

	public getSessionPlanDetails(id: string): Observable<any> {
		return this.http.get(`sessionplans/${id}`);
	}
}

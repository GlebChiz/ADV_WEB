import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class SessionPlanTableSerivce {
	public constructor(private http: HttpClient) {}

	public reorder(controller: string, body: any): Observable<any> {
		return this.http.post(`${controller}/reorder`, body);
	}

	public link(ids: string[], seriesPlanId: string, link: boolean): Observable<any> {
		return this.http.put(`sessionplan/link`, {
			sessionPlanIds:ids,
			seriesPlanId: seriesPlanId,
			link: link
		});
	}
}

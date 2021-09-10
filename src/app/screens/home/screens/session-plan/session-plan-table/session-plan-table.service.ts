import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ISessionPlanTranslate } from './session-plan-translate-popup/session-plan-translate-popup.component';

@Injectable()
export class SessionPlanTableSerivce {
	public constructor(private http: HttpClient) {}

	public reorder(controller: string, body: any): Observable<any> {
		return this.http.post(`${controller}/reorder`, body);
	}

	public link(ids: string[], seriesPlanId: string, link: boolean): Observable<any> {
		return this.http.put(`sessionplan/link`, {
			sessionPlanIds: ids,
			seriesPlanId: seriesPlanId,
			link: link,
		});
	}

	public getCurrentTransletion(
		questionId: string,
		languageId: string,
	): Observable<ISessionPlanTranslate> {
		return this.http.get(
			`sessionplan/${questionId}/translation/${languageId}`,
		) as Observable<ISessionPlanTranslate>;
	}

	public updateCurrentTransletion(
		questionId: string,
		languageId: string,
		body: ISessionPlanTranslate,
	): Observable<any> {
		return this.http.put(`sessionplan/${questionId}/translation/${languageId}`, body);
	}
}

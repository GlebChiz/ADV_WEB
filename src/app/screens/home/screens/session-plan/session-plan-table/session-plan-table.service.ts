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
			seriesPlanId,
			link,
		});
	}

	public getCurrentTransletionSessionPlan(
		sessionPlanId: string,
		languageId: string,
	): Observable<ISessionPlanTranslate> {
		return this.http.get(
			`sessionplan/${sessionPlanId}/translation/${languageId}`,
		) as Observable<ISessionPlanTranslate>;
	}

	public updateCurrentTransletionSessionPlan(body: ISessionPlanTranslate): Observable<any> {
		return this.http.post(`sessionplan/translation`, body);
	}
}

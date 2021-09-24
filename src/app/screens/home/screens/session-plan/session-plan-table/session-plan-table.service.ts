import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IReorderSesseionPlan } from './session-plan-table.component';
import { ISessionPlanTranslate } from './session-plan-translate-popup/session-plan-translate-popup.component';

@Injectable()
export class SessionPlanTableSerivce {
	public constructor(private http: HttpClient) {}

	public reorder(
		controller: string,
		body: IReorderSesseionPlan,
	): Observable<{ isSuccess: boolean }> {
		return this.http.post<{ isSuccess: boolean }>(`${controller}/reorder`, body);
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

	public updateCurrentTransletionSessionPlan(body: any): Observable<any> {
		return this.http.post(`sessionplan/translation`, body.item);
	}
}

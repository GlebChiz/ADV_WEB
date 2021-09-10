import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IAssessmentQuestionTranslate } from './assessment-question-translate-popup/assessment-question-translate-popup.component';

@Injectable()
export class AssessmentQuestionTableSerivce {
	public constructor(private http: HttpClient) {}

	public reorder(controller: string, body: any): Observable<any> {
		return this.http.post(`${controller}/reorder`, body);
	}

	public getCurrentTransletion(
		questionId: string,
		languageId: string,
	): Observable<IAssessmentQuestionTranslate> {
		return this.http.get(
			`assessmentquestion/${questionId}/translation/${languageId}`,
		) as Observable<IAssessmentQuestionTranslate>;
	}

	public updateCurrentTransletion(
		questionId: string,
		languageId: string,
		body: IAssessmentQuestionTranslate,
	): Observable<any> {
		return this.http.put(`assessmentquestion/${questionId}/translation/${languageId}`, body);
	}
}

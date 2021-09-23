import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IAssessmentTranslate } from './assessment-question-translate-popup/assessment-question-translate-popup.component';

@Injectable()
export class AssessmentQuestionTableSerivce {
	public constructor(private http: HttpClient) {}

	public reorder(controller: string, body: any): Observable<any> {
		return this.http.post<any>(`${controller}/reorder`, body);
	}

	public getCurrentTransletion(questionId: string, languageId: string): Observable<string> {
		return this.http.get(
			`assessmentquestion/${questionId}/translation/${languageId}`,
		) as Observable<string>;
	}

	public updateCurrentTransletion(
		questionId: string,
		languageId: string,
		body: IAssessmentTranslate,
	): Observable<string> {
		return this.http.put<string>(
			`assessmentquestion/${questionId}/translation/${languageId}`,
			body,
		);
	}
}

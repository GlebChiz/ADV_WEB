import { IAssessmentQuestion } from 'src/app/shared/interfaces/assessment-question.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AssessmentLegendService {
	public constructor(private http: HttpClient) {}

	public getAssessmentLegend(
		legendId: string,
		languageId: string,
	): Observable<IAssessmentQuestion> {
		return this.http.get<IAssessmentQuestion>(
			`assessmentlegend/${legendId}/translation/${languageId}`,
		);
	}

	public setAssessmentLegend(body: { item: string }): Observable<string> {
		return this.http.post<string>('assessmentlegend/translation', { ...body });
	}
}

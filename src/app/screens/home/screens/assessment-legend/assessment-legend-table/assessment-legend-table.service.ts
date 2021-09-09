import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AssessmentLegendService {
	public constructor(private http: HttpClient) {}

	public getAssessmentLegend(id: string, languageId: string): Observable<any> {
		return this.http.get(`assessmentlegend/${id}/translation/${languageId}`);
	}

	public setAssessmentLegend(body: any): Observable<any> {
		return this.http.post('assessmentlegend/translation', body);
	}
}

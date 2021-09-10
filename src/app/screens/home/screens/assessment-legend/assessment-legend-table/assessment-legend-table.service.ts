import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AssessmentLegendService {
	public constructor(private http: HttpClient) {}

	public getAssessmentLegend(legendId: string, languageId: string): Observable<any> {
		return this.http.get(`assessmentlegend/${legendId}/translation/${languageId}`);
	}

	public setAssessmentLegend(body: any): Observable<any> {
		return this.http.post('assessmentlegend/translation', body);
	}
}

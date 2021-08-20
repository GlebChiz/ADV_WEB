import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AssessmentQuestionDetailsService {
	public constructor(private http: HttpClient) {}

	public getAssessmentQuestionDetails(id: string): Observable<any> {
		return this.http.get(`assessmentquestion/${id}`);
	}
}

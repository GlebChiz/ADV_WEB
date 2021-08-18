import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AssessmentQuestionService {
	public constructor(private http: HttpClient) {}

	public getAssessmentQuestion(id: string): Observable<any> {
		return this.http.get(`assessment/${id}`);
	}
}

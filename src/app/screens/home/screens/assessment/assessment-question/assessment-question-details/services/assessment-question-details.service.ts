import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ITableState } from 'src/app/shared/table/table.reducer';

@Injectable()
export class AssessmentQuestionDetailsService {
	public constructor(private http: HttpClient) {}

	public getAssessmentQuestionDetails(id: string): Observable<ITableState<any, any, any>> {
		return this.http.get(`assessmentquestion/${id}`);
	}
}

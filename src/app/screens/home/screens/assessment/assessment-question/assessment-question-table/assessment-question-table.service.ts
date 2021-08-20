import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class AssessmentQuestionTableSerivce {
	public constructor(private http: HttpClient) {}

	public reorder(controller: string, body: any): Observable<any> {
		return this.http.post(`${controller}/reorder`, body);
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class InsuranceService {
	public constructor(private http: HttpClient) {}

	public getCurrentInsurance(id: string): Observable<any> {
		return this.http.get(`insurance/${id}/current-insurance/`);
	}
}

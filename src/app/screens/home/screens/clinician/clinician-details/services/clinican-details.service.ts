import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ClinicianDetailsService {
	public constructor(private http: HttpClient) {}

	public getPatientDetails(id: string): Observable<any> {
		return this.http.get(`clinician/${id}`);
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClinicianGeneralInfo } from './clinician-table.component';

@Injectable()
export class ClinicianService {
	public constructor(private http: HttpClient) {}

	public getClinicianGeneralInfo(id: string): Observable<any> {
		return this.http.get(`clinician/${id}/general`);
	}

	public updateClinicianGeneralInfo(id: string, body: IClinicianGeneralInfo): Observable<any> {
		return this.http.put(`clinician/${id}/general`, body);
	}
}

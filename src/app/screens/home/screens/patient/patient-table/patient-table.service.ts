import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPatientGeneralInfo } from 'src/app/shared/components/patient-general-info/patient-general-info.component';

@Injectable()
export class PatientService {
	public constructor(private http: HttpClient) {}

	public getPatientGeneralInfo(id: string): Observable<any> {
		return this.http.get(`patient/${id}/general`);
	}

	public updatePatientGeneralInfo(id: string, body: IPatientGeneralInfo): Observable<any> {
		return this.http.put(`patient/${id}/general`, body);
	}
}

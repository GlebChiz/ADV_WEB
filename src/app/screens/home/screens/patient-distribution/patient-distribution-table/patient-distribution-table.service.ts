import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PatientDistributionService {
	public constructor(private http: HttpClient) {}

	public updateFieldPatientDistribution(
		patientIds: string[],
		supervisorId: string,
		start: Date,
	): Observable<any> {
		return this.http.put(`patientsupervisor/move-to-supervisor`, {
			supervisorId,
			patientIds,
			start,
		});
	}
}

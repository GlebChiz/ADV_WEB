import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService, GridDataService } from 'src/app/shared/services';
import { IPatientFilterModel } from '../models/filters/patient-filter.model';
import { IPatient } from '../models/patient.model';
import { IPrivatePersonLink } from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class PatientGridService extends GridDataService {
	constructor(http: HttpClient, auth: AuthenticationService) {
		super(http, auth, 'patient');
	}

	getModelByPerson(personId: Guid | string): Observable<IPatient> {
		return this.get(`${personId}/get-person-model`);
	}

	updateStatus(patientId: Guid, status: Guid | string): Observable<any> {
		const model = {
			id: patientId,
			valueId: status,
		};
		return this.post('update-status', model);
	}

	updateArea(patientId: Guid, area: Guid | string): Observable<any> {
		const model = {
			id: patientId,
			valueId: area,
		};
		return this.post('update-area', model);
	}

	getPrivatePersonLinks(patientId: string): Observable<IPrivatePersonLink[]> {
		return this.post(`${patientId}/get-private-person-links`);
	}

	getPatients(patientIds: (Guid | null)[]): Observable<IPatient[]> {
		const filterId = Guid.create();
		const filter = { patientIds } as IPatientFilterModel;
		const url = `${filterId}/get-patients`;
		return this.saveFilterData('save-patient-filter', filterId, filter).pipe(
			switchMap(() => this.get<IPatient[]>(url)),
		);
	}
}

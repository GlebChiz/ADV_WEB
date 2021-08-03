import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService, GridDataService } from 'src/app/shared/services';
import { IPatientFilterModel } from '../models/filters/patient-filter.model';
import { IPatient } from '../models/patient.model';
import { IPersonIdModel, IPrivatePersonLink } from '../models/person.model';
// import { AuthenticationService } from '../../shared/services/authentification.service';

@Injectable({ providedIn: 'root' })
export class PatientGridService extends GridDataService {
	public constructor(http: HttpClient, auth: AuthenticationService) {
		super(http, auth, 'patient');
	}

	public getModelByPerson(personId: Guid | string): Observable<IPatient> {
		return this.get(`${personId}/get-person-model`);
	}

	public updateStatus(patientId: Guid, status: Guid | string): Observable<IPersonIdModel> {
		const model: IPersonIdModel = {
			id: patientId,
			valueId: status,
		};
		return this.post('update-status', model);
	}

	public updateArea(patientId: Guid, area: Guid | string): Observable<IPersonIdModel> {
		const model: IPersonIdModel = {
			id: patientId,
			valueId: area,
		};
		return this.post('update-area', model);
	}

	public getPrivatePersonLinks(patientId: string): Observable<IPrivatePersonLink[]> {
		return this.post(`${patientId}/get-private-person-links`);
	}

	public getPatients(patientIds: (Guid | null)[]): Observable<IPatient[]> {
		const filterId: Guid = Guid.create();
		const filter: IPatientFilterModel = { patientIds };
		const url: string = `${filterId}/get-patients`;
		return this.saveFilterData('save-patient-filter', filterId, filter).pipe(
			switchMap(() => this.get<IPatient[]>(url)),
		);
	}
}

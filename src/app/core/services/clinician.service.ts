import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthenticationService, GridDataService } from 'src/app/shared/services';
import { Clinician } from '../models/clinician.model';
import { Person } from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class ClinicianGridService extends GridDataService {
	constructor(http: HttpClient, auth: AuthenticationService) {
		super(http, auth, 'clinician');
	}

	newClinicianModel(): Observable<Clinician> {
		const model = {
			userId: null,
			person: {} as Person,
		} as Clinician;
		return of(model);
	}
}

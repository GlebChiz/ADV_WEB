import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthenticationService, GridDataService } from 'src/app/shared/services';
import { IClinicianEmpty } from '../models/clinician.model';
import { IPerson } from '../models/person.model';
// import { AuthenticationService } from '../../shared/services/authentification.service';

@Injectable({ providedIn: 'root' })
export class ClinicianGridService extends GridDataService {
	public constructor(http: HttpClient, auth: AuthenticationService) {
		super(http, auth, 'clinician');
	}

	public newClinicianModel(): Observable<IClinicianEmpty> {
		const model: IClinicianEmpty = {
			userId: null,
			person: {} as IPerson,
		};
		return of(model);
	}
}

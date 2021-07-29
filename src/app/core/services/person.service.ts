import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { AuthenticationService, GridDataService } from 'src/app/shared/services';
import { Insurance, InsuranceSaveModel } from '../models/insurance.model';
import {
	GeneralPersonData,
	Person,
	PersonContactsData,
	PersonDemographicData,
	PrivatePersonLink,
} from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class PersonGridService extends GridDataService {
	constructor(http: HttpClient, auth: AuthenticationService) {
		super(http, auth, 'person');
	}

	getPrivatePersonLinks(personId: string): Observable<PrivatePersonLink[]> {
		return this.get(`${personId}/get-private-person-links`);
	}

	getPersonModel(id: Guid | null): Observable<Person> {
		return this.get(`${id || Guid.EMPTY}/`);
	}

	getPersonGeneralDataModel(id: Guid): Observable<GeneralPersonData> {
		return this.get(`${id}/general`);
	}

	getPersonDemographicDataModel(id: Guid): Observable<PersonDemographicData> {
		return this.get(`${id}/demographic`);
	}

	getPersonContactsDataModel(id: Guid): Observable<PersonContactsData> {
		return this.get(`${id}/contacts`);
	}

	updatePerson(person: Person): Observable<any> {
		return this.post('update', person);
	}

	updatePersonGeneral(generalData: GeneralPersonData): Observable<any> {
		return this.put(`${generalData.id}/general`, generalData);
	}

	updatePersonDemographic(demographicData: PersonDemographicData): Observable<any> {
		return this.put(`${demographicData.id}/demographic`, demographicData);
	}

	updatePersonContacts(contactsData: PersonContactsData): Observable<any> {
		return this.post(`${contactsData.id}/contacts`, contactsData);
	}

	getInsurances(personId: Guid): Observable<Insurance[]> {
		return this.get(`${personId}/insurances`);
	}

	saveInsurance(insurances: InsuranceSaveModel): Observable<any> {
		return this.post(`insurances`, insurances);
	}
}

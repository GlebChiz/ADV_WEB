import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { AuthenticationService, GridDataService } from 'src/app/shared/services';
import { IInsurance, IInsuranceSaveModel } from '../models/insurance.model';
import {
	IGeneralPersonData,
	IPerson,
	IPersonContactsData,
	IPersonDemographicData,
	IPrivatePersonLink,
} from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class PersonGridService extends GridDataService {
	constructor(http: HttpClient, auth: AuthenticationService) {
		super(http, auth, 'person');
	}

	getPrivatePersonLinks(personId: string): Observable<IPrivatePersonLink[]> {
		return this.get(`${personId}/get-private-person-links`);
	}

	getPersonModel(id: Guid | null): Observable<IPerson> {
		return this.get(`${id || Guid.EMPTY}/`);
	}

	getPersonGeneralDataModel(id: Guid | null): Observable<IGeneralPersonData> {
		return this.get(`${id}/general`);
	}

	getPersonDemographicDataModel(id: Guid | null | string): Observable<IPersonDemographicData> {
		return this.get(`${id}/demographic`);
	}

	getPersonContactsDataModel(id: Guid | null): Observable<IPersonContactsData> {
		return this.get(`${id}/contacts`);
	}

	updatePerson(person: IPerson): Observable<any> {
		return this.post('update', person);
	}

	updatePersonGeneral(generalData: IGeneralPersonData): Observable<any> {
		return this.put(`${generalData.id}/general`, generalData);
	}

	updatePersonDemographic(demographicData: IPersonDemographicData): Observable<any> {
		return this.put(`${demographicData.id}/demographic`, demographicData);
	}

	updatePersonContacts(contactsData: IPersonContactsData): Observable<any> {
		return this.post(`${contactsData.id}/contacts`, contactsData);
	}

	getInsurances(personId: Guid | null): Observable<IInsurance[]> {
		return this.get(`${personId}/insurances`);
	}

	saveInsurance(insurances: IInsuranceSaveModel): Observable<any> {
		return this.post(`insurances`, insurances);
	}
}

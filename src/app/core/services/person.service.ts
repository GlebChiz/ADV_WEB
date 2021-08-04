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
// import { AuthenticationService } from '../../shared/services/authentification.service';

@Injectable({ providedIn: 'root' })
export class PersonGridService extends GridDataService {
	public constructor(http: HttpClient, auth: AuthenticationService) {
		super(http, auth, 'person');
	}

	public getPrivatePersonLinks(personId: string): Observable<IPrivatePersonLink[]> {
		return this.get(`${personId}/get-private-person-links`);
	}

	public getPersonModel(id: Guid | null): Observable<IPerson> {
		return this.get(`${id || Guid.EMPTY}/`);
	}

	public getPersonGeneralDataModel(id: Guid | null): Observable<IGeneralPersonData> {
		return this.get(`${id}/general`);
	}

	public getPersonDemographicDataModel(
		id: Guid | null | string,
	): Observable<IPersonDemographicData> {
		return this.get(`${id}/demographic`);
	}

	public getPersonContactsDataModel(id: Guid | null): Observable<IPersonContactsData> {
		return this.get(`${id}/contacts`);
	}

	public updatePerson(person: IPerson): Observable<any> {
		return this.post('update', person);
	}

	public updatePersonGeneral(generalData: IGeneralPersonData): Observable<any> {
		return this.put(`${generalData.id}/general`, generalData);
	}

	public updatePersonDemographic(demographicData: IPersonDemographicData): Observable<any> {
		return this.put(`${demographicData.id}/demographic`, demographicData);
	}

	public updatePersonContacts(contactsData: IPersonContactsData): Observable<any> {
		return this.post(`${contactsData.id}/contacts`, contactsData);
	}

	public getInsurances(personId: Guid | null): Observable<IInsurance[]> {
		return this.get(`${personId}/insurances`);
	}

	public saveInsurance(insurances: IInsuranceSaveModel): Observable<any> {
		return this.post(`insurances`, insurances);
	}
}

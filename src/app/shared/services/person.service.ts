import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
	IPersonDemographicInfo,
	IPersonInfo,
} from '../components/demografic/demographic.component';
import { IPersonContactInfo } from '../components/contact/contact.component';


@Injectable({ providedIn: 'root' })
export class PersonService {
	public constructor(private http: HttpClient) {}

	public getPersonDemographicInfo(id: string): Observable<any> {
		return this.http.get(`person/${id}/demographic`);
	}

	public updatePersonDemographicInfo(id: string, body: IPersonDemographicInfo): Observable<any> {
		return this.http.put(`person/${id}/demographic`, body);
	}

	public getPersonInfo(id: string): Observable<any> {
		return this.http.get(`person/${id}/general`);
	}

	public updatePersonInfo(id: string, body: IPersonInfo): Observable<any> {
		return this.http.put(`person/${id}/general`, body);
	}

	public getPersonContactInfo(id: string): Observable<any> {
		return this.http.get(`person/${id}/contacts`);
	}

	public updatePersonContactInfo(id: string, body: IPersonContactInfo): Observable<any> {
		return this.http.put(`person/${id}/contacts`, body);
	}

}

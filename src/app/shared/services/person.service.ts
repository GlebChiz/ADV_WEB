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

	public getPersonDemographicInfo(id: string): Observable<IPersonDemographicInfo> {
		return this.http.get<IPersonDemographicInfo>(`person/${id}/demographic`);
	}

	public updatePersonDemographicInfo(
		id: string,
		body: IPersonDemographicInfo,
	): Observable<boolean> {
		return this.http.put<boolean>(`person/${id}/demographic`, body);
	}

	public getPersonInfo(id: string): Observable<IPersonInfo> {
		return this.http.get<IPersonInfo>(`person/${id}/general`);
	}

	public updatePersonInfo(id: string, body: IPersonInfo): Observable<boolean> {
		return this.http.put<boolean>(`person/${id}/general`, body);
	}

	public getPersonContactInfo(id: string): Observable<IPersonContactInfo> {
		return this.http.get<IPersonContactInfo>(`person/${id}/contacts`);
	}

	public updatePersonContactInfo(id: string, body: IPersonContactInfo): Observable<boolean> {
		return this.http.put<boolean>(`person/${id}/contacts`, body);
	}
}

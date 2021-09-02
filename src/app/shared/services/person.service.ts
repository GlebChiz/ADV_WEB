import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IPersonDemographicInfo } from '../components/demografic/demographic.component';

@Injectable({ providedIn: 'root' })
export class PersonService {
	public constructor(private http: HttpClient) {}

	public getPersonDemographicInfo(id: string): Observable<any> {
		return this.http.get(`person/${id}/demographic`);
	}

	public updatePersonDemographicInfo(id: string, body: IPersonDemographicInfo): Observable<any> {
		return this.http.put(`person/${id}/demographic`, body);
	}
}

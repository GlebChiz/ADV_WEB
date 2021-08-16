import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PublicSnipitDetailsService {
	public constructor(private http: HttpClient) {}

	public getPublicSnipitDetails(id: string): Observable<any> {
		return this.http.get(`snipits/${id}`);
	}
}

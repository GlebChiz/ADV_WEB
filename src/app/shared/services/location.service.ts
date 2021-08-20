import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocationService {
	public constructor(private http: HttpClient) {}

	public getLocation(id: string): Observable<any> {
		return this.http.get(`location/${id}`);
	}
}

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ILocation } from '../interfaces/location.interface';

@Injectable({ providedIn: 'root' })
export class LocationService {
	public constructor(private http: HttpClient) {}

	public getLocation(id: string): Observable<ILocation> {
		return this.http.get<ILocation>(`location/${id}`);
	}
}

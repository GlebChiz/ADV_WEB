import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from 'src/app/shared/interfaces/location.interface';

@Injectable()
export class LocationService {
	public constructor(private http: HttpClient) {}

	public getLocation(id: string): Observable<ILocation> {
		return this.http.get<ILocation>(`location/${id}`);
	}
}

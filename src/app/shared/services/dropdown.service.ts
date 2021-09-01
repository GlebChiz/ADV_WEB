import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DropdownService {
	public constructor(private http: HttpClient) {}

	public getSeriesPlans(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/series-plans');
	}

	public getSupervisorLicense(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/supervisors');
	}

	public getSupervisorLicensePayers(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/get-payers');
	}

	public getSupervisorLanguages(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/Language/lookup');
	}

	public getAreas(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/Area/lookup');
	}

	public getServiceSubTypes(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/ServiceSubType/lookup');
	}

	public getModalities(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/modalities');
	}

	public getLocationInitiatives(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/LocationInitiative');
	}

	public getLocations(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/locations');
	}

	public getClinicians(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/clinicians');
	}

	public getLegends(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/legends');
	}

	public getRoomSize(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/RoomSize');
	}

	public getRoomSetup(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/RoomSetup');
	}

	public getSnipitTypes(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/snipit-types');
	}

	public getSnipitCategory(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/SnipitCategory');
	}

	public getPatients(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/patients');
	}

	public getRooms(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/rooms');
	}
}

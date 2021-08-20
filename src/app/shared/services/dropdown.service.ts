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
		return this.http.get<IDropdownData[]>('/dropdowns/get-payers');
	}

	public getLocationInitiatives(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/LocationInitiative');
	}

	public getRoomSize(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/RoomSize');
	}

	public getRoomSetup(): Observable<IDropdownData[]> {
		return this.http.get<IDropdownData[]>('dropdowns/RoomSetup');
	}
}
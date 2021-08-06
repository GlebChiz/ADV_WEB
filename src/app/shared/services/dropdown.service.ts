import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';
import { DataService } from './data.service';

@Injectable({
	providedIn: 'root',
})
export class DropDownService extends DataService {
	public constructor(http: HttpClient) {
		super(http, 'dropdowns');
	}

	public getPatientModalityStatuses(): Observable<any[]> {
		return this.get('patient-modality-statuses');
	}

	public getModalities(): Observable<any[]> {
		return this.get('modalities');
	}

	public getPatientStatuses(): Observable<any[]> {
		return this.get('patientStatuses');
	}

	public getFormTypeLookup(formTypeCode: string): Observable<any[]> {
		return this.get(`${formTypeCode}/form-types`);
	}

	public getLookup(lookupTypeCode: string): Observable<any[]> {
		return this.get(`${lookupTypeCode}`);
	}

	public getPayers(): Observable<any[]> {
		return this.get(`get-payers`);
	}

	public getServiceTypes(): Observable<any[]> {
		return this.get(`service-types`);
	}

	public getServiceDeliveryTypes(): Observable<any[]> {
		return this.get(`service-delivery-types`);
	}

	public getServiceStatuses(): Observable<any[]> {
		return this.get(`service-statuses`);
	}

	public getCallerTypes(): Observable<any[]> {
		return this.get(`get-caller-types`);
	}

	public getName(valueId: Guid, values: any[]) {
		if (!values) {
			return '';
		}
		const found = values.filter((x) => x.id === valueId);
		return found.length > 0 ? found[0].name : '';
	}

	public getItem(valueId: Guid | null | string, values: any[]) {
		if (!values) {
			return '';
		}
		const found = values.filter((x) => x.id === valueId);
		return found.length > 0 ? found[0] : null;
	}

	public filterByOrderNumbers(numbers: number[], values: any[]) {
		if (!values) {
			return [];
		}
		return values.filter((x) => numbers.includes(x.orderNumber));
	}
}

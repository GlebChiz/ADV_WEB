import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';
import { DataService } from './data.service';

@Injectable({
	providedIn: 'root',
})
export class DropDownService extends DataService {
	constructor(http: HttpClient) {
		super(http, 'dropdowns');
	}

	getPatientModalityStatuses(): Observable<any[]> {
		return this.get('patient-modality-statuses');
	}

	getModalities(): Observable<any[]> {
		return this.get('modalities');
	}

	getPatientStatuses(): Observable<any[]> {
		return this.get('patientStatuses');
	}

	getFormTypeLookup(formTypeCode: string): Observable<any[]> {
		return this.get(`${formTypeCode}/form-types`);
	}

	getLookup(lookupTypeCode: string): Observable<any[]> {
		return this.get(`${lookupTypeCode}`);
	}

	getPayers(): Observable<any[]> {
		return this.get(`get-payers`);
	}

	getServiceTypes(): Observable<any[]> {
		return this.get(`service-types`);
	}

	getServiceDeliveryTypes(): Observable<any[]> {
		return this.get(`service-delivery-types`);
	}

	getServiceStatuses(): Observable<any[]> {
		return this.get(`service-statuses`);
	}

	getCallerTypes(): Observable<any[]> {
		return this.get(`get-caller-types`);
	}

	getName(valueId: Guid, values: any[]) {
		if (!values) {
			return '';
		}
		const found = values.filter((x) => x.id === valueId);
		return found.length > 0 ? found[0].name : '';
	}

	getItem(valueId: Guid | null | string, values: any[]) {
		if (!values) {
			return '';
		}
		const found = values.filter((x) => x.id === valueId);
		return found.length > 0 ? found[0] : null;
	}

	filterByOrderNumbers(numbers: number[], values: any[]) {
		if (!values) {
			return [];
		}
		return values.filter((x) => numbers.includes(x.orderNumber));
	}
}

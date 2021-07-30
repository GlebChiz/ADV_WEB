import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { AuthenticationService, GridDataService } from 'src/app/shared/services';
import { ICall, ICallPatientIndex } from '../models/call.model';
import { ICheckList } from '../models/checklist.model';

@Injectable({ providedIn: 'root' })
export class CallService extends GridDataService {
	constructor(http: HttpClient, auth: AuthenticationService) {
		super(http, auth, 'call');
	}

	getActiveCall(): Observable<ICall> {
		return this.get(`${this.auth.getCurrentUser().userId}/active`);
	}

	endCall(callId: Guid): Observable<any> {
		return this.put(`${callId}/end`);
	}

	createPatientIndex(model: ICallPatientIndex): Observable<any> {
		return this.post(`createPatientIndex`, model);
	}

	updatePatientIndexes(model: ICallPatientIndex[]): Observable<any> {
		return this.post(`updatePatientIndexes`, model);
	}

	getChecklist(id: Guid): Observable<ICheckList> {
		return this.get(`${id}/checklist`);
	}
}

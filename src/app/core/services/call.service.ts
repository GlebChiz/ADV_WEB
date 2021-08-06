import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { AuthenticationService, GridDataService } from 'src/app/shared/services';
import { ICall, ICallPatientIndex } from '../models/call.model';
import { ICheckList } from '../models/checklist.model';

// import { AuthenticationService } from '../../shared/services/authentification.service';

@Injectable({ providedIn: 'root' })
export class CallService extends GridDataService {
	public constructor(http: HttpClient, auth: AuthenticationService) {
		super(http, auth, 'call');
	}

	public getActiveCall(): Observable<ICall> {
		// void
		// let currentUserId: number | undefined;
		// if (this.auth.currentUser) {
		return this.get(`${this.auth.currentUser?.userId}/active`); // TODO
		// }
		// if (currentUserId) {
		// return this.get(`${currentUserId}/active`);
		// }
	}

	public endCall(callId: Guid): Observable<any> {
		return this.put(`${callId}/end`);
	}

	public createPatientIndex(model: ICallPatientIndex): Observable<any> {
		return this.post(`createPatientIndex`, model);
	}

	public updatePatientIndexes(model: ICallPatientIndex[]): Observable<any> {
		return this.post(`updatePatientIndexes`, model);
	}

	public getChecklist(id: Guid): Observable<ICheckList> {
		return this.get(`${id}/checklist`);
	}
}

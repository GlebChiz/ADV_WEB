import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService, GridDataService } from 'src/app/shared/services';

@Injectable({ providedIn: 'root' })
export class PayerGridService extends GridDataService {
	public constructor(http: HttpClient, auth: AuthenticationService) {
		super(http, auth, 'payer');
	}
}

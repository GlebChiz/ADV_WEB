import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceSchedulerService } from './service.scheduler.service';

@Injectable({ providedIn: 'root' })
export class ClinicianSchedulerService extends ServiceSchedulerService {
	constructor(http: HttpClient) {
		super(http, 'clinician');
	}
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import {
	EditingService,
	SchedulerSettings,
	Service,
	ServiceFieldEditRule,
	ServiceFieldsSettings,
} from 'src/app/core/models/service.model';
import * as _ from 'lodash';
import { ClinicianSchedulerService } from 'src/app/core/services/clinician.scheduler.service';
import { ClinicianSchedulerFilter } from 'src/app/core/models/filters/clinician-filter.model';

@Component({
	selector: 'advenium-clinician-service-scheduler',
	templateUrl: './clinician.service.scheduler.component.html',
	styleUrls: ['./clinician.service.scheduler.component.scss'],
})
export class ClinicianServiceSchedulerComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	filter: ClinicianSchedulerFilter | null = null;

	@Input() clinicianId!: Guid;

	schedulerSettings: SchedulerSettings = {
		slotDuration: 30,
		fields: {
			patient: ServiceFieldEditRule.Edit,
			clinician: ServiceFieldEditRule.Display,
			serviceType: ServiceFieldEditRule.Edit,
			deliveryType: ServiceFieldEditRule.Edit,
			status: ServiceFieldEditRule.Edit,
			time: ServiceFieldEditRule.Edit,
		} as ServiceFieldsSettings,
	} as SchedulerSettings;

	editedEvent!: EditingService;

	constructor(public schedulerService: ClinicianSchedulerService) {}

	ngOnInit(): void {
		this.filter = {
			clinicianId: this.clinicianId,
		} as ClinicianSchedulerFilter;
	}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	save(e: Service) {
		this.schedulerService.sendToSave(e);
	}
}

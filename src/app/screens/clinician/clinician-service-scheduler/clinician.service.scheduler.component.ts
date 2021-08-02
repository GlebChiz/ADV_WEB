import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import {
	IEditingService,
	ISchedulerSettings,
	IService,
	ServiceFieldEditRule,
	IServiceFieldsSettings,
} from 'src/app/core/models/service.model';
import { ClinicianSchedulerService } from 'src/app/core/services/clinician.scheduler.service';
import { IClinicianSchedulerFilter } from 'src/app/core/models/filters/clinician-filter.model';

@Component({
	selector: 'advenium-clinician-service-scheduler',
	templateUrl: './clinician.service.scheduler.component.html',
	styleUrls: ['./clinician.service.scheduler.component.scss'],
})
export class ClinicianServiceSchedulerComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	filter: IClinicianSchedulerFilter | null = null;

	@Input() clinicianId!: Guid;

	schedulerSettings: ISchedulerSettings = {
		slotDuration: 30,
		fields: {
			patient: ServiceFieldEditRule.Edit,
			clinician: ServiceFieldEditRule.Display,
			serviceType: ServiceFieldEditRule.Edit,
			deliveryType: ServiceFieldEditRule.Edit,
			status: ServiceFieldEditRule.Edit,
			time: ServiceFieldEditRule.Edit,
		} as IServiceFieldsSettings,
	} as ISchedulerSettings;

	editedEvent!: IEditingService;

	constructor(public schedulerService: ClinicianSchedulerService) {}

	ngOnInit(): void {
		this.filter = {
			clinicianId: this.clinicianId,
		} as IClinicianSchedulerFilter;
	}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	save(e: IService) {
		this.schedulerService.sendToSave(e);
	}
}

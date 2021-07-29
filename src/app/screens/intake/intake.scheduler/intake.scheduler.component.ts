import { formatDate } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { IntakeSchedulerFilter } from 'src/app/core/models/filters/intake-scheduler-filter';
import {
	EditingService,
	SchedulerSettings,
	Service,
	ServiceFieldEditRule,
	ServiceFieldsSettings,
	ServiceStatus,
} from 'src/app/core/models/service.model';
import * as _ from 'lodash';
import { PatientGridService } from 'src/app/core/services/patient.service';
import { IntakeSchedulerService } from 'src/app/core/services/intake.service';
import { Patient } from 'src/app/core/models/patient.model';

@Component({
	selector: 'advenium-intake-scheduler',
	templateUrl: './intake.scheduler.component.html',
	styleUrls: ['./intake.scheduler.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class IntakeSchedulerComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	filter: IntakeSchedulerFilter | null = null;

	@Input() patientIds: Guid[] | null = null;

	schedulerSettings: SchedulerSettings = {
		slotDuration: 30,
		fields: {
			patient: ServiceFieldEditRule.Edit,
			clinician: ServiceFieldEditRule.Edit,
			serviceType: ServiceFieldEditRule.Display,
			deliveryType: ServiceFieldEditRule.Edit,
			status: ServiceFieldEditRule.Edit,
			time: ServiceFieldEditRule.Edit,
		} as ServiceFieldsSettings,
	} as SchedulerSettings;

	editedEvent!: EditingService;

	services: Service[] = [];

	patients: Patient[] = [];

	isNew!: boolean;

	constructor(
		public schedulerService: IntakeSchedulerService,
		private _patientService: PatientGridService,
	) {}

	ngOnInit(): void {
		this.filter = {
			patientIds: this.patientIds,
		} as IntakeSchedulerFilter;
		this.schedulerService.getIntakeServices(this.patientIds!).subscribe((x) => {
			this.services = x;
		});

		this._patientService.getPatients(this.patientIds!).subscribe((x) => {
			this.patients = x;
		});
	}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	cancelledServices(patientId: Guid): string {
		return this.services
			.filter((s) => s.patientId === patientId && s.status === ServiceStatus.Cancelled)
			.map((s) => this.formatDate(s.date))
			.join(', ');
	}

	hasCancelledServices(patientId: Guid): boolean {
		return (
			this.services.filter((s) => s.patientId === patientId && s.status === ServiceStatus.Cancelled)
				.length > 0
		);
	}

	hasDeliveredServices(patientId: Guid): boolean {
		return (
			this.services.filter((s) => s.patientId === patientId && s.status === ServiceStatus.Delivered)
				.length > 0
		);
	}

	deliveredServices(patientId: Guid): string {
		return this.services
			.filter((s) => s.patientId === patientId && s.status === ServiceStatus.Delivered)
			.map((s) => this.formatDate(s.date))
			.join(', ');
	}

	scheduledServices(patientId: Guid): string {
		const services = this.services.filter(
			(s) => s.patientId === patientId && s.status === ServiceStatus.Scheduled,
		);
		return services.length > 0
			? services.map((s) => this.formatDate(s.date)).join(', ')
			: 'NOT SCHEDULED';
	}

	formatDate(date: Date): string {
		return formatDate(date, 'MM/dd/yyyy', 'en-US');
	}
}

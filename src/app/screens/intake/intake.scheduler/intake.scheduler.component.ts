import { formatDate } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { IIntakeSchedulerFilter } from 'src/app/core/models/filters/intake-scheduler-filter';
import {
	IEditingService,
	ISchedulerSettings,
	IService,
	ServiceFieldEditRule,
	IServiceFieldsSettings,
	ServiceStatus,
} from 'src/app/core/models/service.model';
import { PatientGridService } from 'src/app/core/services/patient.service';
import { IntakeSchedulerService } from 'src/app/core/services/intake.service';
import { IPatient } from 'src/app/core/models/patient.model';

@Component({
	selector: 'advenium-intake-scheduler',
	templateUrl: './intake.scheduler.component.html',
	styleUrls: ['./intake.scheduler.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class IntakeSchedulerComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	filter: IIntakeSchedulerFilter | null = null;

	@Input() patientIds!: (Guid | null)[];

	schedulerSettings: ISchedulerSettings = {
		slotDuration: 30,
		fields: {
			patient: ServiceFieldEditRule.Edit,
			clinician: ServiceFieldEditRule.Edit,
			serviceType: ServiceFieldEditRule.Display,
			deliveryType: ServiceFieldEditRule.Edit,
			status: ServiceFieldEditRule.Edit,
			time: ServiceFieldEditRule.Edit,
		} as IServiceFieldsSettings,
	} as ISchedulerSettings;

	editedEvent!: IEditingService;

	services: IService[] = [];

	patients: IPatient[] = [];

	isNew!: boolean;

	constructor(
		public schedulerService: IntakeSchedulerService,
		private _patientService: PatientGridService,
	) {}

	ngOnInit(): void {
		this.filter = {
			patientIds: this.patientIds,
		} as IIntakeSchedulerFilter;
		this.schedulerService.getIntakeServices(this.patientIds!).subscribe((x) => {
			this.services = x;
		});

		this._patientService.getPatients(this.patientIds!).subscribe((x) => {
			this.patients = x;
		});
	}

	ngOnDestroy(): void {
		this._destroy$.next(null);
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

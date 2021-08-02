import { formatDate } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
	DateChangeEvent,
	DateRange,
	EventClickEvent,
	EventStyleArgs,
	RemoveEvent,
	SlotClassArgs,
	SlotClickEvent,
} from '@progress/kendo-angular-scheduler';
import { BehaviorSubject, Subject } from 'rxjs';
import {
	AvailabilityType,
	IEditingService,
	ISchedulerSettings,
	ISchedulerViewModel,
	IService,
	ServiceStatus,
	ISlotDecorationModel,
} from 'src/app/core/models/service.model';
import * as _ from 'lodash';
import { fixDate, removeTimezone } from 'src/app/shared/services/date.utils';
import { IServiceSchedulerService } from 'src/app/core/services/service.scheduler.service';
import { ValidationMessageService } from 'src/app/core/services/validation.message.service';
import '@progress/kendo-date-math/tz/Europe/Sofia';

@Component({
	selector: 'advenium-service-scheduler',
	templateUrl: './service.scheduler.component.html',
	styleUrls: ['./service.scheduler.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ServiceSchedulerComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	@Input() settings!: ISchedulerSettings;

	@Input() schedulerService!: IServiceSchedulerService;

	@Input() filter: any = null;

	onFiltering: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	range!: DateRange;

	viewModel!: ISchedulerViewModel;

	isNew!: boolean;

	editedEvent!: IEditingService;

	editedEventValue: any;

	constructor(public validationService: ValidationMessageService) {}

	ngOnInit(): void {
		this.onFiltering.subscribe((x) => {
			if (x) {
				this.filter = _.clone(x);
				this.load();
			}
		});
	}

	public onDateChange(args: DateChangeEvent): void {
		this.range = args.dateRange;
		this.load();
	}

	load(): void {
		if (this.range) {
			const filterData = this.filter ? { ...this.filter } : {};
			const filterModel = {
				...filterData,
				start: removeTimezone(this.range.start),
				end: removeTimezone(this.range.end),
			};

			this.schedulerService.loadView(filterModel).subscribe((x) => {
				x.events.forEach((ev) => {
					fixDate(ev, 'start');
					fixDate(ev, 'end');
				});
				x.slotDecoration.forEach((sl) => {
					fixDate(sl, 'start');
					fixDate(sl, 'end');
				});
				this.viewModel = x;
			});
		}
	}

	getIntersectionMinutes(start1: Date, end1: Date, start2: Date, end2: Date): number {
		if (start1 > end2 || end1 < start2) {
			return 0;
		}
		return Math.round(
			((end1 < end2 ? end1 : end2).getTime() - (start1 > start2 ? start1 : start2).getTime()) /
				60000,
		);
	}

	sumIntersectionMinutes(start1: Date, end1: Date, slots: ISlotDecorationModel[]): number {
		return slots.reduce(
			(total, slot) => total + this.getIntersectionMinutes(start1, end1, slot.start, slot.end),
			0,
		);
	}

	getSlotAvailability(start: Date, end: Date): AvailabilityType {
		const found = this.viewModel.slotDecoration.filter((x) => x.start < end && x.end > start);
		if (found.length > 0) {
			const available = this.sumIntersectionMinutes(
				start,
				end,
				found.filter((x) => x.type === AvailabilityType.Available),
			);
			const possible = this.sumIntersectionMinutes(
				start,
				end,
				found.filter((x) => x.type === AvailabilityType.Possible),
			);
			return available >= possible ? AvailabilityType.Available : AvailabilityType.Possible;
		}
		return AvailabilityType.None;
	}

	getSlotClass = (args: SlotClassArgs) => {
		if (this.viewModel && args.isAllDay === false) {
			const availability = this.getSlotAvailability(
				removeTimezone(args.start!),
				removeTimezone(args.end!),
			);
			switch (availability) {
				case AvailabilityType.Available:
					return 'available';
				case AvailabilityType.Possible:
					return 'possible';
				default:
					return '';
			}
			// return availability === AvailabilityType.Available
			// 	? 'available'
			// 	: availability === AvailabilityType.Possible
			// 	? 'possible'
			// 	: '';
		}
		return '';
	};

	getEventClass = (args: EventStyleArgs) => {
		const service = args.event?.dataItem?.dataItem as IService;
		switch (service?.status) {
			case ServiceStatus.Cancelled:
				return 'service-cancelled';
			case ServiceStatus.Delivered:
				return 'service-delivered';
			case ServiceStatus.Scheduled:
				return 'service-scheduled';
			default:
				return '';
		}
	};

	onEventDblClick({ event }: EventClickEvent): void {
		const service = event.dataItem.dataItem;
		if (service.status === ServiceStatus.Delivered && this.settings?.canChangeDelivered !== true) {
			this.validationService.display(['Delivered appointment is readonly'], true);
		}
		if (service.status === ServiceStatus.Cancelled && this.settings?.canChangeCancelled !== true) {
			this.validationService.display(['Cancelled appointment is readonly'], false);
			return;
		}
		this.isNew = false;
		this.editedEventValue = null;
		this.editedEvent = null!;

		this.schedulerService.getServiceModel(service.id, this.filter).subscribe((x) => {
			this.validationService.displayResponse(x);
			if (x.isValid === true) {
				this.editedEvent = x.model;
			}
		});
	}

	onSlotDblClick({ start, end }: SlotClickEvent): void {
		const timezone = start.getTimezoneOffset();
		const dt = new Date(start);
		dt.setMinutes(dt.getMinutes() - timezone);
		if (this.viewModel?.canCreate === false) {
			this.validationService.display([this.viewModel.createDenyMessage], false);
			return;
		}
		if (this.viewModel?.ignoreAvailability !== true) {
			const availability = this.getSlotAvailability(start, end);
			if (availability === AvailabilityType.None) {
				this.validationService.display(['Could not schedule on this time'], false);
				return;
			}
		}

		this.isNew = true;
		this.editedEventValue = null;
		this.editedEvent = null!;
		this.schedulerService.getNewServiceModel(start, end, this.filter).subscribe((x) => {
			this.validationService.displayResponse(x);
			if (x.isValid === true) {
				this.editedEvent = x.model;
			}
		});
	}

	onEventDeleteClick(e: RemoveEvent) {
		e.preventDefault();
		if (!window.confirm('Are you sure you want to delete appointment?')) {
			return;
		}
		if (
			e.dataItem.dataItem.status === ServiceStatus.Delivered &&
			this.settings?.canChangeDelivered !== true
		) {
			this.validationService.display(['Service could not be removed'], false);
			return;
		}
		if (
			e.dataItem.dataItem.status === ServiceStatus.Delivered &&
			this.settings?.canChangeCancelled !== true
		) {
			this.validationService.display(['Service could not be removed'], false);
			return;
		}

		this.schedulerService.deleteService(e.dataItem.dataItem.id).subscribe(() => {
			this.load();
		});
	}

	formatDate(date: Date): string {
		return formatDate(date, 'MM/dd/yyyy', 'en-US');
	}

	closeEdit(result: string) {
		if (result === 'save') {
			const val = this.editedEventValue;
			if (val) {
				const service = {
					...this.editedEvent,
					...val,
				};
				const saver = this.isNew
					? this.schedulerService.createService(service)
					: this.schedulerService.updateService(service);
				saver.subscribe((response) => {
					this.validationService.displayResponse(response);
					this.load();
				});
			}
		}
		this.editedEvent = null!;
	}

	keepEditedEvent(value: any) {
		this.editedEventValue = _.clone(value);
	}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}
}

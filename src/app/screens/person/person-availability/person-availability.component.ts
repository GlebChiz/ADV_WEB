import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { IAppState } from 'src/app/core/store/state/app.state';
import { ValidationMessageService } from 'src/app/core/services/validation.message.service';
import {
	DateChangeEvent,
	DateRange,
	EventClickEvent,
	EventStyleArgs,
	RemoveEvent,
	ResizeEndEvent,
	SchedulerEvent,
	SlotClickEvent,
} from '@progress/kendo-angular-scheduler';
import { PersonAvailabilityService } from 'src/app/core/services/availability.service';
import {
	AvailabilityStatus,
	IPersonAvailability,
	IPersonAvailabilityFilter,
} from 'src/app/core/models/availability.model';
import { addTimezone, fixDate } from 'src/app/shared/services/date.utils';
import { Guid } from 'guid-typescript';
import { formatDate } from '@angular/common';
import * as _ from 'lodash';

@Component({
	providers: [],
	selector: 'advenium-person-availability',
	templateUrl: './person-availability.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class PersonAvailabilityComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	@Input() filter!: IPersonAvailabilityFilter;

	@Input() saveEvent!: Observable<void>;

	private saveSubscription!: Subscription;

	@Output() confirmSave: EventEmitter<any> = new EventEmitter();

	events: SchedulerEvent[] = [];

	range!: DateRange;

	slotDuration = 15;

	editedEvent: any;

	editedEventValue: any;

	isNew!: boolean;

	deletedEvent: any;

	deleteMessage!: string;

	deleteButtons!: any[];

	deletedDate: Date | null = null;

	constructor(
		public _store: Store<IAppState>,
		public validationService: ValidationMessageService,
		private service: PersonAvailabilityService,
	) {}

	ngOnInit(): void {
		if (this.saveEvent) {
			this.saveSubscription = this.saveEvent.subscribe(() => this.submit());
		}
	}

	ngOnDestroy(): void {
		if (this.saveSubscription) {
			this.saveSubscription.unsubscribe();
		}
		this._destroy$.next(null);
	}

	submit(): void {
		this.confirmSave.emit();
	}

	onDateChange(args: DateChangeEvent): void {
		this.range = args.dateRange;
		this.load();
	}

	load(): void {
		if (this.filter && this.range) {
			this.filter.start = this.range.start;
			this.filter.end = this.range.end;
			this.service.loadEvents(this.filter).subscribe((x) => {
				x.forEach((ev) => {
					fixDate(ev, 'start');
					fixDate(ev, 'end');
				});
				this.events = x;
			});
		}
	}

	createEvent({ start, end }: SlotClickEvent): void {
		this.isNew = true;
		this.editedEvent = null;
		const availability = {
			startDate: start,
			endDate: null,
			startTime: start,
			endTime: end,
			personId: this.filter.personId,
			type: this.filter.type,
			status: AvailabilityStatus.Available,
			day: start.getDay(),
			person: null,
		} as unknown as IPersonAvailability;
		this.service.createAvailability(availability).subscribe((x) => {
			this.validationService.displayResponse(x);
			if (x.isValid === true) {
				this.load();
			}
		});
	}

	resizeEndEvent(e: ResizeEndEvent): void {
		const { start } = e;
		const { end } = e;

		const list = [];
		if (e.start !== e.event.start || e.end !== e.event.end) {
			const minDay = e.start.getDay() < e.end.getDay() ? e.start.getDay() : e.end.getDay();
			const maxDay = e.start.getDay() > e.end.getDay() ? e.start.getDay() : e.end.getDay();
			for (let day = minDay; day <= maxDay; day++) {
				const availability = {
					...e.event.dataItem.dataItem,
					id: Guid.EMPTY,
					day,
					startTime: start,
					endTime: end,
				};
				availability.startTime.setDate(
					availability.startTime.getDate() - (e.event.start.getDay() - day),
				);
				availability.endTime.setDate(
					availability.endTime.getDate() - (e.event.start.getDay() - day),
				);
				if (day === e.event.start.getDay()) {
					availability.id = e.event.dataItem.dataItem.id;
				}
				list.push(availability);
			}
		}

		if (list.length > 0) {
			this.service.updateAvailabilityList(list).subscribe((x) => {
				this.validationService.displayResponse(x);
				if (x.isValid === true) {
					this.load();
				}
			});
		}
	}

	deleteEvent(e: RemoveEvent): void {
		const availability = e.event.dataItem.dataItem as IPersonAvailability;
		const startDate = new Date(availability.startDate);
		const clickedDate = e.event.start;
		this.deletedDate = clickedDate;
		this.deleteButtons = [
			{
				title: 'Cancel',
				isPrimary: false,
				value: 'cancel',
			},
			{
				title: 'Delete Completely',
				isPrimary: false,
				value: 'delete',
			},
		];
		this.deleteMessage = `this schedule started at ${formatDate(startDate, 'MM/dd/yyyy', 'en-US')}`;

		if (startDate.getDate() === clickedDate.getDate()) {
			this.deleteMessage = 'Would you like to delete this schedule completely?';
			this.deleteButtons[1].isPrimary = true;
		} else {
			this.deleteMessage = `Would you like to delete this schedule completely or starting ${formatDate(
				e.event.start,
				'MM/dd/yyyy',
				'en-US',
			)}?`;
			this.deleteButtons.push({
				title: `Delete starting ${formatDate(e.event.start, 'MM/dd/yyyy', 'en-US')}`,
				isPrimary: true,
				value: 'close',
			});
		}
		this.deletedEvent = e.event.dataItem;
	}

	closeDeleteDialog(value: string) {
		if (value === 'delete') {
			this.service.deleteAvailability(this.deletedEvent.dataItem.id).subscribe((x) => {
				this.validationService.displayResponse(x);
				if (x.isValid === true) {
					this.load();
				}
			});
		} else if (value === 'close') {
			const closeDate = this.deletedDate;
			closeDate!.setDate(closeDate!.getDate() - 1);
			const availability = { ...this.deletedEvent.dataItem, endDate: closeDate };
			this.service.updateAvailabilityList([availability]).subscribe((x) => {
				this.validationService.displayResponse(x);
				if (x.isValid === true) {
					this.load();
				}
			});
		}
		this.deletedEvent = null;
	}

	getEventClass = (args: EventStyleArgs) => {
		const availability = args.event?.dataItem?.dataItem as IPersonAvailability;
		switch (availability.status) {
			case AvailabilityStatus.Available:
				return 'available';
			case AvailabilityStatus.Possible:
				return 'possible';
			default:
				return '';
		}
	};

	getEventStyles = (args: EventStyleArgs) => {
		const availability = args.event?.dataItem?.dataItem as IPersonAvailability;
		switch (availability.status) {
			case AvailabilityStatus.Available:
				return { backgroundColor: 'lightgreen', color: 'red', textAlign: 'center' };
			case AvailabilityStatus.Possible:
				return { backgroundColor: 'yellow', color: 'red', textAlign: 'center' };
			default:
				return {};
		}
	};

	editEvent(args: EventClickEvent): void {
		this.editedEventValue = null;
		const availability = args.event.dataItem.dataItem as IPersonAvailability;
		fixDate(availability, 'startTime');
		fixDate(availability, 'endTime');

		this.editedEvent = {
			...availability,
			startTime: addTimezone(availability.startTime),
			endTime: addTimezone(availability.endTime),
		};
	}

	closeEdit(value: string) {
		if (value === 'save') {
			const val = this.editedEventValue;
			if (val) {
				const availability = {
					...this.editedEvent,
					startDate: val.startDate,
					endDate: val.endDate,
					startTime: val.startTime,
					endTime: val.endTime,
					status: val.status,
				};
				this.service.updateAvailabilityList([availability]).subscribe((x) => {
					this.validationService.displayResponse(x);
					if (x.isValid === true) {
						this.load();
					}
				});
			}
		}
		this.editedEvent = null;
	}

	keepEditedEvent(e: any) {
		this.editedEventValue = _.clone(e);
	}
}

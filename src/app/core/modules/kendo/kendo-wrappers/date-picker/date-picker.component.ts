import {
	Component,
	Input,
	Output,
	EventEmitter,
	forwardRef,
	OnDestroy,
	ViewChild,
	OnInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import {
	CalendarView,
	DateInputFormatPlaceholder,
	PopupSettings,
	PreventableEvent,
	DatePickerComponent,
} from '@progress/kendo-angular-dateinputs';
import moment from 'moment';
import { DateTimeTypes } from 'src/app/core/enums/date-time.types';
import { Day } from '@progress/kendo-date-math';

@Component({
	selector: 'advenium-date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: ['./date-picker.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DatePickerWrapperComponent),
			multi: true,
		},
	],
})
export class DatePickerWrapperComponent implements ControlValueAccessor, OnDestroy, OnInit {
	private readonly unsubscribeAll$ = new Subject();

	readonly dateTimeTypes = DateTimeTypes;

	formControl: FormControl;

	@Input() activeView: CalendarView = 'month';

	@Input() bottomView: CalendarView = 'month';

	@Input() class = '';

	@Input() disabled = false;

	@Input() readonly = false;

	@Input() disabledDates!: ((date: Date) => boolean) | Date[] | Day[];

	@Input() disabledDatesValidation = false;

	@Input() focusedDate = new Date();

	@Input() format = '';

	@Input() formatPlaceholder: DateInputFormatPlaceholder = 'wide';

	@Input() label = '';

	@Input() max!: Date;

	@Input() min!: Date;

	@Input() navigation = false;

	@Input() placeholder = '';

	@Input() popupSettings: PopupSettings = { animate: true, appendTo: 'root' };

	@Input() rangeValidation = true;

	@Input() tabindex!: number;

	@Input() title = '';

	@Input() topView: CalendarView = 'century';

	@Input() type = DateTimeTypes.Date;

	@Input() value!: Date;

	@Input() weekNumber = false;

	@Input() showTitle = false;

	@Output() onblur = new EventEmitter();

	@Output() onclose = new EventEmitter<PreventableEvent>();

	@Output() onfocus = new EventEmitter();

	@Output() onopen = new EventEmitter<PreventableEvent>();

	@Output() valueChange = new EventEmitter<Date>();

	@ViewChild(DatePickerComponent) datePicker!: DatePickerComponent;

	get today(): Date {
		return new Date();
	}

	constructor(private _fb: FormBuilder) {}

	ngOnDestroy(): void {
		this.unsubscribeAll$.next(null);
		this.unsubscribeAll$.complete();
	}

	onChange = (_v: Date) => {};

	onTouched = () => {};

	ngOnInit(): void {
		this.formControl = this._fb.control(null);
	}

	checkDate(date: Date): boolean {
		const selectedDecade = Math.floor(
			(this.datePicker.calendar.focusedDate.getFullYear() % 100) / 10,
		);
		const decade = Math.floor((date.getFullYear() % 100) / 10);
		switch (this.datePicker.calendar.activeView) {
			case 'month':
				return this.datePicker.calendar.focusedDate.getMonth() === date.getMonth();

			case 'year':
				return this.datePicker.calendar.focusedDate.getFullYear() === date.getFullYear();
			case 'decade':
				return selectedDecade === decade;
			default:
				return false;
		}
	}

	navigate(event: Event, dir: 1 | -1): void {
		event.stopPropagation();
		const units = this.datePicker.calendar.activeView === 'month' ? 'month' : 'year';
		let number: number;
		switch (this.datePicker.calendar.activeView) {
			case 'decade':
				number = 10;
				break;
			case 'century':
				number = 100;
				break;
			default:
				number = 1;
				break;
		}

		const amount = dir * number;
		const newDate = moment(this.datePicker.calendar.focusedDate).add(amount, units).toDate();
		this.datePicker.calendar.focusedDate = newDate;
	}

	registerOnChange(fn: (v: Date) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	selectToday(): void {
		this.formControl.patchValue(this.today);
		this.datePicker.toggle(false);
	}

	setDisabledState(isDisabled: boolean): void {
		if (isDisabled) {
			this.formControl.disable();
		} else {
			this.formControl.enable();
		}
	}

	valueChanged(value: Date): void {
		this.valueChange.emit(value);
		this.onChange(value);
	}

	writeValue(value: Date): void {
		this.focusedDate = value;
		this.formControl.patchValue(value);
	}
}

import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	QueryList,
	ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropDownFilterSettings, FilterDirective } from '@progress/kendo-angular-dropdowns';
import { IntakeSchedulerFilter } from 'src/app/core/models/filters/intake-scheduler-filter';
import { DropDownData } from 'src/app/core/models/kendo/dropdown-data.model';

@Component({
	providers: [],
	selector: 'advenium-intake-scheduler-filter',
	templateUrl: './intake.scheduler.filter.component.html',
})
export class IntakeSchedulerFilterComponent implements OnInit {
	readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	filterForm!: FormGroup;

	filterModel!: IntakeSchedulerFilter;

	@Output() toggleFilterEvent: EventEmitter<IntakeSchedulerFilter> = new EventEmitter();

	@Input() clinicianLookup!: DropDownData[];

	@Input() set initialFilter(model: IntakeSchedulerFilter) {
		this.filterModel = model;
		this.initForm(this.filterModel);
	}

	@ViewChildren(FilterDirective) filters!: QueryList<FilterDirective>;

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		this.initForm(this.filterModel);
	}

	initForm(model: IntakeSchedulerFilter): void {
		/* this.filterForm = this._fb.group({
        clinicianIds: this._fb.control(model?.clinicianIds)
      }); */
	}

	onKeyDown(pressedKey) {
		if (pressedKey.key === 'Enter') {
			this.filter();
		}
	}

	filter(): void {
		if (this.filterModel) {
			const value = {
				...this.filterForm.value,
				patientIds: this.filterModel.patientIds,
			};
			this.toggleFilterEvent.emit(value);
		}
	}

	reset(): void {
		if (!confirm('Are you sure you want to reset Filters?')) {
			return;
		}

		this.filterForm.reset();
		this.filters.forEach((f: any) => f.filterChangeSubscription.next(''));
		this.filter();
	}
}

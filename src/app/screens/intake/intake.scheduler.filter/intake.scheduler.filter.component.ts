import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	QueryList,
	ViewChildren,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DropDownFilterSettings, FilterDirective } from '@progress/kendo-angular-dropdowns';
import { IIntakeSchedulerFilter } from 'src/app/core/models/filters/intake-scheduler-filter';
import { IDropDownData } from 'src/app/core/models/kendo/dropdown-data.model';

@Component({
	providers: [],
	selector: 'advenium-intake-scheduler-filter',
	templateUrl: './intake.scheduler.filter.component.html',
})
export class IIntakeSchedulerFilterComponent implements OnInit {
	readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	filterForm!: FormGroup;

	filterModel!: IIntakeSchedulerFilter;

	@Output() toggleFilterEvent: EventEmitter<IIntakeSchedulerFilter> = new EventEmitter();

	@Input() clinicianLookup!: IDropDownData[];

	@Input() set initialFilter(model: IIntakeSchedulerFilter) {
		this.filterModel = model;
		this
			.initForm
			// this.filterModel
			();
	}

	@ViewChildren(FilterDirective) filters!: QueryList<FilterDirective>;

	// constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		this
			.initForm
			// this.filterModel
			();
	}

	initForm(): // model: IIntakeSchedulerFilter
	void {
		/* this.filterForm = this._fb.group({
        clinicianIds: this._fb.control(model?.clinicianIds)
      }); */
	}

	onKeyDown(pressedKey: any) {
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
		// if (!confirm('Are you sure you want to reset Filters?')) {
		// 	return;
		// }

		this.filterForm.reset();
		this.filters.forEach((f: any) => f.filterChangeSubscription.next(''));
		this.filter();
	}
}

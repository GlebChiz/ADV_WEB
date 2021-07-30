import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { IDropDownData, LookupTypeCodes } from 'src/app/core/models/kendo/dropdown-data.model';
import { FilterActions } from 'src/app/core/store/filter/filter.actions';
import { IAppState } from 'src/app/core/store/state/app.state';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	providers: [],
	selector: 'advenium-patient-filter',
	templateUrl: './patient-filter.component.html',
})
export class PatientFilterComponent implements OnInit {
	readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	filterForm!: FormGroup;

	patientStatusesData = Array<IDropDownData>();

	@Input() filterId!: string;

	constructor(
		private _fb: FormBuilder,
		private _dropDownService: DropDownService,
		private _store: Store<IAppState>,
	) {}

	ngOnInit(): void {
		this.filterForm = this._fb.group({
			search: this._fb.control(null),
			statusId: this._fb.control(null),
		});

		this._dropDownService
			.getLookup(LookupTypeCodes.patientStatus)
			.subscribe((x) => (this.patientStatusesData = x));
	}

	onKeyDown(pressedKey: KeyboardEvent) {
		if (pressedKey.key === 'Enter') {
			this.filter();
		}
	}

	filter(): void {
		this._store.dispatch(
			FilterActions.SetFilter({ id: this.filterId, filter: this.filterForm.value }),
		);
	}

	reset(): void {
		// if (!confirm('Are you sure you want to reset Filters?')) {
		// 	return;
		// }

		this.filterForm.reset();
		this.filter();
	}
}

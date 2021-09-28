/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogService } from '@progress/kendo-angular-dialog';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { filter, takeUntil } from 'rxjs/operators';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_GRID_SETTINGS_PENDING,
	GET_TABLE_DATA_PENDING,
	MAKE_DEFAULT_GRID_PENDING,
	RENAME_GRID_PENDING,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_SETTINGS_PENDING,
} from 'src/app/shared/table/table.tokens';
import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-unsupervised-services-table',
	templateUrl: './unsupervised-services-table.component.html',
})
export class UnsupervisedServicesTableComponent extends CustomTableDirective implements OnInit {
	public constructor(
		_router: Router,
		_store: Store<any>,
		dialogService: DialogService,
		_clipboardApi: ClipboardService,
		_toasterService: ToastrService,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(SAVE_GRID_SETTINGS_PENDING) saveNewGridSettingsPending: any,
		@Inject(SAVE_GRID_CHANGES_PENDING) saveGridChangesPending: any,
		@Inject(GET_GRID_SETTINGS_PENDING) getGridSettingsPending: any,
		@Inject(MAKE_DEFAULT_GRID_PENDING) makeDefaultGridPending: any,
		@Inject(RENAME_GRID_PENDING) renameGridPending: any,
		private _fb: FormBuilder,
	) {
		super(
			_store,
			dialogService,
			_clipboardApi,
			_router,
			_toasterService,
			getTableDataPending,
			getCurrentItemPending,
			deleteDataPending,
			editDataPending,
			saveNewGridSettingsPending,
			saveGridChangesPending,
			getGridSettingsPending,
			makeDefaultGridPending,
			renameGridPending,
		);
	}

	public currentDate: Date = new Date();

	public firstOfJune: Date = new Date(2021, 6, 1);

	public dateForm: FormGroup = this._fb.group({
		from: this.firstOfJune,
		to: this.currentDate,
	});

	public ngOnInit(): void {
		this.dateForm.valueChanges
			.pipe(
				filter((value) => value && value.from && value.to),
				takeUntil(this.unsubscribe$$),
			)
			.subscribe((val: { from: Date; to: Date }) => {
				this.changeGridSettingsFilter(val);
			});
		if (this.dropdownnGridSettings) {
			this.changeGridSettingsFilter({ from: this.firstOfJune, to: this.currentDate });
		}
		this._store
			.select('vunsupervisedservice' as any, 'table', 'filter', 'filter', 'filters')
			.pipe(
				filter<(CompositeFilterDescriptor | FilterDescriptor)[]>((val) => val && val.length > 0),
				takeUntil(this.unsubscribe$$),
			)
			.subscribe((currentFilter: (CompositeFilterDescriptor | FilterDescriptor)[]) => {
				const fieldsFilter: FilterDescriptor[] = currentFilter as FilterDescriptor[];
				this.dateForm.setValue(
					{
						from: new Date(
							fieldsFilter.find((val: FilterDescriptor) => {
								return val.field === 'from';
							})?.value,
						),
						to: new Date(
							fieldsFilter.find((val: FilterDescriptor) => {
								return val.field === 'to';
							})?.value,
						),
					},
					{ emitEvent: false },
				);
			});

		super.ngOnInit();
	}

	public changeGridSettingsFilter(val: { from: Date; to: Date }): void {
		if (this.gridSettings.state.filter) {
			this.gridSettings.state.filter.filters = this.gridSettings.state.filter?.filters.filter(
				(value: CompositeFilterDescriptor | FilterDescriptor) => {
					const fieldFilter: FilterDescriptor = value as FilterDescriptor;
					return fieldFilter.field !== 'from' && fieldFilter.field !== 'to';
				},
			);
			this.gridSettings.state.filter.filters = [
				...this.gridSettings.state.filter.filters,
				{
					field: 'from',
					operator: 'custom',
					value: val.from.toISOString(),
				},
				{
					field: 'to',
					operator: 'custom',
					value: val.to.toISOString(),
				},
			];
			this._store.dispatch(
				this.getTableDataPending({
					controller: this.controller,
					filter: this.gridSettings.state,
					gridId: this.gridId,
					columns: this.columns,
				}),
			);
		}
	}

	public columns: IColumn[] = [
		{
			field: 'date',
			title: 'Date',
			hidden: false,
			filterable: true,
			type: 'date',
		},
		{
			field: 'patient',
			title: 'Patient',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'clinician',
			title: 'Clinician',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'insurance',
			title: 'Insurance',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'insuranceeffectivedate',
			title: 'Insurance Effective Date',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'supervisors',
			title: 'Supervisors',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'licenses',
			title: 'Licenses',
			hidden: false,
			filterable: true,
			type: 'text',
		},
	];

	public toPatient(): void {
		this._router.navigate(['patients']);
	}

	public toClinician(): void {
		this._router.navigate(['clinicians']);
	}

	public toSupervisors(): void {
		this._router.navigate(['patients']);
	}

	public toLicenses(): void {
		this._router.navigate(['supercred']);
	}
}

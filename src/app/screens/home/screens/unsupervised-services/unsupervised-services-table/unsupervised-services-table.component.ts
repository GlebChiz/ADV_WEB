/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_GRID_SETTINGS_PENDING,
	GET_TABLE_DATA_PENDING,
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
		private _router: Router,
		_store: Store<any>,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		// @Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(SAVE_GRID_SETTINGS_PENDING) saveNewGridSettingsPending: any,
		@Inject(SAVE_GRID_CHANGES_PENDING) saveGridChangesPending: any,
		@Inject(GET_GRID_SETTINGS_PENDING) getGridSettingsPending: any,
	) {
		super(
			_store,
			getTableDataPending,
			getCurrentItemPending,
			deleteDataPending,
			editDataPending,
			saveNewGridSettingsPending,
			saveGridChangesPending,
			getGridSettingsPending,
		);
	}

	public from!: Date;

	public to!: Date;

	public valueChange(): void {
		if (this.gridSettings.state.filter && this.from && this.to) {
			this.gridSettings.state.filter.filters = [
				...this.gridSettings.state.filter.filters,
				{
					field: 'from',
					operator: 'custom',
					value: this.from.toISOString(),
				},
				{
					field: 'to',
					operator: 'custom',
					value: this.to.toISOString(),
				},
			];
			super.ngOnInit();
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

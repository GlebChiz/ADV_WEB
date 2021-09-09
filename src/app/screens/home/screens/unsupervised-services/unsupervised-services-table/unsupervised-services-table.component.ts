/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_PENDING,
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
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
	) {
		super(_store, getTableDataPending, getCurrentItemPending, deleteDataPending, editDataPending);
	}

	public formDate!: FormGroup;

	public ngOnInit(): void {
		this.formDate = new FormGroup({
			from: new FormControl(''),
			to: new FormControl(''),
		});
		this.formDate.valueChanges.subscribe((item: any) => {
			if (this.gridSettings.state.filter && item.from && item.to) {
				this.gridSettings.state.filter.filters = [
					...this.gridSettings.state.filter.filters,
					{
						field: 'from',
						operator: 'custom',
						value: item.from.toISOString(),
					},
					{
						field: 'to',
						operator: 'custom',
						value: item.to.toISOString(),
					},
				];
				super.ngOnInit();
			}
		});
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

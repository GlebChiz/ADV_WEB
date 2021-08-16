import { Router } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import { CellClickEvent } from '@progress/kendo-angular-grid';
import {
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_PENDING,
} from 'src/app/shared/table/table.tokens';
import { Store } from '@ngrx/store';
import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-patient-table',
	templateUrl: './patient-table.component.html',
})
export class PatientTableComponent extends CustomTableDirective {
	public constructor(
		private _router: Router,
		_store: Store<any>,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		// @Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
	) {
		super(_store, getTableDataPending, getCurrentItemPending, deleteDataPending, editDataPending);
	}

	public columns: IColumn[] = [
		// { field: 'id', title: 'Id', hidden: false },
		{
			field: 'name',
			title: 'Name',
			hidden: false,
			// filterable: true,
			// filter: 'text',
		},
	];

	public onCellClick(e: CellClickEvent): void {
		this._router.navigate(['patients', e.dataItem.id]);
	}
}

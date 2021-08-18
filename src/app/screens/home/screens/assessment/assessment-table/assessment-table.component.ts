import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CellClickEvent } from '@progress/kendo-angular-grid';
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
	selector: 'advenium-assessment-table',
	templateUrl: './assessment-table.component.html',
})
export class AssessmentTableComponent extends CustomTableDirective {
	public constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
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
		{
			field: 'typeName',
			title: 'Type',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'modality',
			title: 'Modality',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'patient',
			title: 'Patient',
			hidden: false,
			filterable: true,
			type: 'text',
		},
	];

	public onCellClick(e: CellClickEvent): void {
		this._router.navigate([e.dataItem.id], { relativeTo: this._activatedRoute });
	}
}

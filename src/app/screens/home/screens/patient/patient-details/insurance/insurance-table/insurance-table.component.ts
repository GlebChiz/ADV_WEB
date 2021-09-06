/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	CLEAR_CURRENT_ITEM,
	CREATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_PENDING,
} from 'src/app/shared/table/table.tokens';
import { InsurancePopupComponent } from './insurance-popup/insurance-popup.component';

@Component({
	providers: [],
	selector: 'advenium-insurance-table',
	templateUrl: './insurance-table.component.html',
	styleUrls: ['../../../../../home.component.scss'],
})
export class InsuranceTableComponent extends CustomTableDirective {
	public constructor(
		private dialogService: DialogService,
		_store: Store<any>,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(CLEAR_CURRENT_ITEM) private clearCurrentItem: any,
	) {
		super(_store, getTableDataPending, getCurrentItemPending, deleteDataPending, editDataPending);
	}

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
	}

	public openDialog(dataItem?: any, isDublicate?: boolean): void {
		if (dataItem) {
			this._store.dispatch(
				this.getCurrentItemPending({ id: dataItem.id, controller: this.controller }),
			);
		}
		const dialog: DialogRef = this.dialogService.open({
			title: 'Insurance',
			content: InsurancePopupComponent,
			width: 600,
			height: 600,
			minWidth: 250,
		});

		dialog.content.instance.modality = { ...dataItem };
		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				if (isDublicate) {
					result.id = null;
				}
				if (dataItem && !isDublicate) {
					this._store.dispatch(this.editDataPending({ item: result, controller: this.controller }));
					return;
				}
				this._store.dispatch(this.createDataPending({ item: result, controller: this.controller }));
			}
			this._store.dispatch(this.clearCurrentItem());
		});
	}

	public columns: IColumn[] = [
		{
			field: 'orderType',
			title: 'Type',
			hidden: false,
			filterable: true,
			sortable: false,
			type: 'text',
		},
		{
			field: 'payer',
			title: 'Payer',
			hidden: false,
			filterable: true,
			sortable: false,
			type: 'text',
		},
		{
			field: 'effectiveDate',
			title: 'Effective Date',
			hidden: false,
			filterable: true,
			sortable: false,
			type: 'date',
		},
		{
			field: 'closedDate',
			title: 'Closed Date',
			hidden: false,
			filterable: true,
			sortable: false,
			type: 'date',
		},
		{
			field: 'memberId',
			title: 'Member ID',
			hidden: false,
			filterable: true,
			sortable: false,
			type: 'text',
		},
	];
}

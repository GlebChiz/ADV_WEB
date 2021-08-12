/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	CREATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_PENDING,
} from 'src/app/shared/table/table.tokens';
import { PayerPopupComponent } from './payer-popup/payer-popup.component';

@Component({
	providers: [],
	selector: 'advenium-payer-table',
	templateUrl: './payer-table.component.html',
})
export class PayerTableComponent extends CustomTableDirective {
	public constructor(
		private dialogService: DialogService,
		_store: Store<any>,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		// @Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
	) {
		super(_store, getTableDataPending, getCurrentItemPending, deleteDataPending, editDataPending);
	}

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
	}

	public openDialog(dataItem?: any): void {
		const dialog: DialogRef = this.dialogService.open({
			title: 'Payer',
			content: PayerPopupComponent,
			width: 600,
			height: 550,
			minWidth: 250,
		});
		dialog.content.instance.payer = { ...dataItem };
		dialog.result.subscribe((result: any) => {
			if (result instanceof DialogCloseResult) {
			} else {
				if (dataItem) {
					this._store.dispatch(this.editDataPending({ item: result, controller: this.controller }));
					return;
				}
				this._store.dispatch(this.createDataPending({ item: result, controller: this.controller }));
			}
		});
	}

	public columns: any[] = [
		{
			field: 'name',
			title: 'Name',
		},
		{
			field: 'type',
			title: 'Type',
		},
		{
			field: 'payerId',
			title: 'Payer Id',
		},
		{
			field: 'carrierCode',
			title: 'Carrier Code',
		},
	];
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { CellClickEvent } from '@progress/kendo-angular-grid';
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
import { LocationPopupComponent } from './location-popup/location-popup.component';

@Component({
	providers: [],
	selector: 'advenium-location-table',
	templateUrl: './location-table.component.html',
	styleUrls: ['../../../home.component.scss'],
})
export class LocationTableComponent extends CustomTableDirective {
	public constructor(
		private dialogService: DialogService,
		_store: Store<any>,
		private _router: Router,
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
			title: 'Location',
			content: LocationPopupComponent,
			width: 600,
			height: 550,
			minWidth: 250,
		});
		dialog.content.instance.payer = { ...dataItem };
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
			field: 'name',
			title: 'Name',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'master',
			title: 'Master Location',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'city',
			title: 'City',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'address',
			title: 'Address',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'state',
			title: 'State',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'zip',
			title: 'Zip',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'code',
			title: 'Code',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'Billing Code',
			title: 'billingCode',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'initiatives',
			title: 'Initiatives',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'roomCount',
			title: 'RoomCount',
			hidden: false,
			filterable: true,
			type: 'text',
		},
	];

	public onCellClick(e: CellClickEvent): void {
		this._router.navigate(['locations', e.dataItem.id]);
		this._store.dispatch(
			this.getCurrentItemPending({ id: e.dataItem.id, controller: this.controller }),
		);
	}
}

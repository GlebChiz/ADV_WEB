/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_PENDING,
} from 'src/app/shared/table/table.tokens';

@Component({
	providers: [],
	selector: 'advenium-room-table',
	templateUrl: './room-table.component.html',
	styleUrls: ['../../../../home.component.scss'],
})
export class RoomTableComponent extends CustomTableDirective {
	public constructor(
		_store: Store<any>,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
	) {
		super(_store, getTableDataPending, getCurrentItemPending, deleteDataPending, editDataPending);
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
			field: 'size',
			title: 'Size',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'setup',
			title: 'Setup',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'direction',
			title: 'Direction',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'description',
			title: 'Description',
			hidden: false,
			filterable: true,
			type: 'text',
		},
	];
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { IColumnGrid } from 'src/app/core/models/filters/column-filter.model';
import { IAppState } from 'src/app/core/store/state/app.state';
import {
	DELETE_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_PENDING,
} from './table.tokens';

@Directive({
	selector: 'advenium-table',
})
export class CustomTableDirective implements OnInit {
	@Input() public controller: string = '';

	@Input() public storePath: string = '';

	@Input() public columns!: IColumnGrid[];

	public gridData: GridDataResult = { data: [], total: 0 };

	public state: DataStateChangeEvent = { skip: 0, take: 10 };

	public isLoading: boolean = false;

	public gridSettings: { state: DataStateChangeEvent } = {
		state: {
			skip: 0, // page number indexed by 0
			take: 10, // how many rows are shown
			sort: [],
			filter: {
				logic: 'and',
				filters: [],
			},
		},
	};

	public constructor(
		private _store: Store<IAppState>,
		@Inject(GET_TABLE_DATA_PENDING) private getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) private getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) private deleteDataPending: any,
	) {}

	public ngOnInit(): void {
		this._store.dispatch(
			this.getTableDataPending({ controller: this.controller, filter: this.gridSettings.state }),
		);
		this._store
			.select((state: any) => state[this.storePath])
			.subscribe((tableData: any) => {
				console.log('im in table: ', this.storePath, tableData);
				this.gridData = tableData;
				this.isLoading = tableData.isLoading;
			});
	}

	public delete(id: string): void {
		this._store.dispatch(
			this.deleteDataPending({
				id,
				controller: this.controller,
			}),
		);
	}

	public getOne(id: string): void {
		this._store.dispatch(
			this.getCurrentItemPending({
				id,
				controller: this.controller,
			}),
		);
	}

	public dataStateChange(state: DataStateChangeEvent): void {
		this.gridSettings.state = state;
		this._store.dispatch(
			this.getTableDataPending({
				columns: this.columns,
				controller: this.controller,
				filter: this.gridSettings.state,
			}),
		);
	}
}

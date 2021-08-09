/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import { IFilter } from './table.model';
import {
	// CREATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	DUBLICATE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_TABLE_DATA_PENDING,
} from './table.tokens';

@Directive({
	selector: 'advenium-table',
})
export class CustomTableDirective implements OnInit, OnChanges {
	@Input() public controller: string = '';

	@Input() public storePath: string = '';

	@Input() public filter!: IFilter;

	@Input() public idForDelete!: string;

	@Input() public newItem!: any;

	@Input() public changedItem!: any;

	@Input() public duplicatedItem!: any;

	public gridData: { data: any[]; total: number } = { data: [], total: 0 };

	public state: any = { skip: 0, take: 10 };

	public constructor(
		private _store: Store<IAppState>,
		// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
		@Inject(GET_TABLE_DATA_PENDING) private getTableDataPending: any,
		// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
		@Inject(DELETE_ITEM_TABLE_PENDING) private deleteItemTablePending: any,
		// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
		// @Inject(CREATE_ITEM_TABLE_PENDING) private createItemTablePending: any,
		// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
		@Inject(EDIT_ITEM_TABLE_PENDING) private editItemTablePending: any,
		// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
		@Inject(DUBLICATE_ITEM_TABLE_PENDING) private dublicateItemTablePending: any,
	) {}

	public ngOnInit(): void {
		this._store.dispatch(
			this.getTableDataPending({ controller: this.controller, filter: this.state }),
		);
		this._store
			.select((state: any) => state[this.storePath])
			.subscribe((tableData: any) => {
				console.log('im in table: ', this.storePath, tableData);
				this.gridData = tableData;
			});
	}

	public dataStateChange(state: any): void {
		this._store.dispatch(this.getTableDataPending({ controller: this.controller, filter: state }));
		console.log(state);
	}

	private checkForChanges(allValue: any, value: any): boolean {
		const currentValue: any = allValue[value];
		const cur: string = JSON.stringify(currentValue.currentValue);
		const prev: string = JSON.stringify(currentValue.previousValue);
		return cur !== prev;
	}

	public ngOnChanges(changes: any): void {
		Object.keys(changes).forEach((key: string) => {
			if (key === 'filter') {
				if (this.checkForChanges(changes, key)) {
					console.log('change filter');
					this.getPortionData();
				}
			}
			if (key === 'idForDelete') {
				if (this.checkForChanges(changes, key)) {
					console.log('change idForDelete');
					this.deleteItem();
				}
			}
			if (key === 'newItem') {
				if (this.checkForChanges(changes, key)) {
					console.log('change newItem');
					this.createItem();
				}
			}
			if (key === 'changedItem') {
				if (this.checkForChanges(changes, key)) {
					console.log('change changedItem');
					this.editItem();
				}
			}
			if (key === 'dublicateItem') {
				if (this.checkForChanges(changes, key)) {
					console.log('change dublicateItem');
					this.dublicateItem();
				}
			}
		});
	}

	private createItem(): void {
		// this._store.dispatch(
		// 	this.createItemTablePending({
		// 		id: this.idForDelete,
		// 		controller: this.controller,
		// 		filter: this.filter,
		// 	}),
		// );
	}

	private editItem(): void {
		this._store.dispatch(
			this.editItemTablePending({
				id: this.idForDelete,
				controller: this.controller,
				filter: this.filter,
			}),
		);
	}

	private dublicateItem(): void {
		this._store.dispatch(
			this.dublicateItemTablePending({
				id: this.idForDelete,
				controller: this.controller,
				filter: this.filter,
			}),
		);
	}

	private deleteItem(): void {
		this._store.dispatch(
			this.deleteItemTablePending({
				id: this.idForDelete,
				controller: this.controller,
				filter: this.filter,
			}),
		);
	}

	private getPortionData(): void {
		this._store.dispatch(
			this.getTableDataPending({
				controller: this.controller,
				filter: this.filter,
			}),
		);
	}
}

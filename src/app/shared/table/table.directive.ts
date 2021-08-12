/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { filter, takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import {
	// CREATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_PENDING,
} from './table.tokens';

@Directive({
	selector: 'advenium-table',
})
export class CustomTableDirective extends UnSubscriber implements OnInit {
	@Input() public controller: string = '';

	@Input() public storePath: string = '';

	@Input() public columns!: any[];

	@Input() public group!: string | null;

	public model!: any;

	public myForm!: FormGroup;

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
		public _store: Store<any>,
		@Inject(GET_TABLE_DATA_PENDING) private getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) public getCurrentItemPending: any,
		// @Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) private deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) public editDataPending: any,
	) {
		super();
	}

	public ngOnInit(): void {
		this._store.dispatch(
			this.getTableDataPending({ controller: this.controller, filter: this.gridSettings.state }),
		);
		this._store
			.select((state: any) => state[this.storePath])
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((tableData: any) => {
				if (this.group && tableData?.data) {
					this.gridData = process(tableData?.data, { group: [{ field: this.group }] });
				} else {
					this.gridData = tableData;
				}
				this.isLoading = tableData.isLoading;
				this.model = tableData.current;
				const group: any = {};
				if (tableData?.current) {
					Object.keys(tableData?.current).forEach((field: string) => {
						group[field] = new FormControl(tableData?.current[field] || '');
					});
				}
				this.myForm = new FormGroup(group);
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

	public openModel(): void {
		this.model = {};
	}

	public create(): void {
		this.model = this.getModel();
		// this._store.dispatch(this.createDataPending(this.model));
	}

	public editOrCreate(): void {
		this.model = this.getModel();
		this._store.dispatch(this.editDataPending({ item: this.model, controller: this.controller }));
		this.model = null;
	}

	public getModel(): any {
		const { value } = this.myForm;
		const result: any = {
			...this.model,
			...value,
		};

		return result;
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

	public cancel(): void {
		this.model = null;
	}
}

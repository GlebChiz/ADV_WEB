/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
	ColumnReorderEvent,
	ColumnVisibilityChangeEvent,
	DataStateChangeEvent,
	GridDataResult,
} from '@progress/kendo-angular-grid';
import { GroupDescriptor, process } from '@progress/kendo-data-query';

import { Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { IColumn } from '../interfaces/column.interface';
import { IDropDownGridSettings } from '../interfaces/dropdown.interface';
import {
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_GRID_SETTINGS_PENDING,
	GET_TABLE_DATA_PENDING,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_SETTINGS_PENDING,
} from './table.tokens';

@Directive({
	selector: 'advenium-table',
})
export class CustomTableDirective extends UnSubscriber implements OnInit {
	@Input() public controller: string = '';

	@Input() public storePath: string = '';

	@Input() public gridId!: string;

	@Input() public columns!: any[];

	@Input() public group!: GroupDescriptor[];

	public myForm!: FormGroup;

	public gridData: GridDataResult = { data: [], total: 0 };

	public gridDataWithoutGroup: GridDataResult = { data: [], total: 0 };

	public state: DataStateChangeEvent = { skip: 0, take: 10 };

	public isLoading: boolean = false;

	public selectedItems: any[] = [];

	public gridSettings$: Observable<IDropDownGridSettings[]> = this._store.select(
		'dropdown' as any,
		'gridSettings',
	);

	public gridSettingsControl: FormControl = new FormControl();

	public idGridSettings: string = '';

	public dropdownnGridSettings: IDropDownGridSettings | undefined;

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
		public _store: Store<IStore>,
		@Inject(GET_TABLE_DATA_PENDING) public getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) public getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) private deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) public editDataPending: any,
		@Inject(SAVE_GRID_SETTINGS_PENDING) private saveNewGridSettingsPending: any,
		@Inject(SAVE_GRID_CHANGES_PENDING) private saveGridChangesPending: any,
		@Inject(GET_GRID_SETTINGS_PENDING) private getGridSettingsPending: any,
	) {
		super();
	}

	public ngOnInit(): void {
		this.gridSettings$
			.pipe(
				filter<IDropDownGridSettings[]>(Boolean),
				map((item: IDropDownGridSettings[]) => {
					return item.find((dr: IDropDownGridSettings) => dr.isDefault);
				}),
				takeUntil(this.unsubscribe$$),
			)
			.subscribe((data: IDropDownGridSettings | undefined) => {
				this.dropdownnGridSettings = data;
				this.gridSettingsControl.setValue(data?.id);
			});
		this.gridSettingsControl.valueChanges
			.pipe(filter<string>(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((id: string) => {
				this.idGridSettings = id;
				this._store.dispatch(this.getGridSettingsPending({ id, controller: this.controller }));
			});
		this._store
			.select(this.storePath as any, 'table', 'columns')
			.pipe(filter<IColumn[]>(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((column: IColumn[]) => {
				this.columns = column;
			});
		if (!this.idGridSettings) {
			this._store.dispatch(
				this.getTableDataPending({
					controller: this.controller,
					filter: this.gridSettings.state,
					gridId: this.gridId,
					columns: this.columns,
				}),
			);
		}

		this._store.dispatch(DropdownActions.GetGridSettingsPending({ gridId: this.gridId }));
		this.selectState();
	}

	public selectState(): void {
		this._store
			.select((state: any) => state[this.storePath].table)
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((tableData: any) => {
				if (this.group && tableData?.data) {
					this.gridData = process(tableData?.data, { group: this.group });
					this.gridData.total = tableData?.total;
				}

				this.gridDataWithoutGroup = tableData;

				this.isLoading = tableData.isLoading;
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

	public dataStateChange(state: DataStateChangeEvent): void {
		this.gridSettings.state = state;
		this._store.dispatch(
			this.getTableDataPending({
				columns: this.columns,
				controller: this.controller,
				filter: this.gridSettings.state,
				gridId: this.gridId,
			}),
		);
	}

	public columnReorder(state: ColumnReorderEvent): void {
		this.columns.splice(state.newIndex, 0, this.columns.splice(state.oldIndex, 1)[0]);
	}

	public columnVisibilityChange(state: ColumnVisibilityChangeEvent): void {
		const currentColumn: any = this.columns.find(
			(column: any) => column.title === state.columns[0]?.title,
		);
		currentColumn.hidden = state.columns[0]?.hidden;
	}

	public saveNewGrid(): void {
		this._store.dispatch(
			this.saveNewGridSettingsPending({
				gridId: this.gridId,
				gridSettings: this.gridSettings,
				columns: this.columns,
			}),
		);
	}

	public saveGridChanges(): void {
		this._store.dispatch(
			this.saveGridChangesPending({
				id: this.idGridSettings,
				gridId: this.gridId,
				gridSettings: this.gridSettings,
				columns: this.columns,
			}),
		);
	}

	public renameGrid(): void {
		// this._store.dispatch(
		// 	this.saveNewGridSettingsPending({
		// 		gridId: this.gridId,
		// 		gridSettings: this.gridSettings,
		// 		columns: this.columns,
		// 	}),
		// );
		// /gridsettings/{id}
		// const dialog: DialogRef = this.dialogService.open({
		// 	title: 'Rename',
		// 	content: LanguageForGroupPopupComponent,
		// 	width: 600,
		// 	height: 500,
		// 	minWidth: 250,
		// });
		// dialog.result.subscribe((result: any) => {
		// 	if (!(result instanceof DialogCloseResult)) {
		// 	}
		// });
	}

	public toggle(a: any): void {
		const selectedItem: number = this.selectedItems.findIndex((item: any) => {
			return item === a;
		});
		if (selectedItem !== -1) {
			this.selectedItems.splice(selectedItem, 1);
		} else {
			this.selectedItems.push(a);
		}
	}

	public actions(): { title: string; cmd: string }[] {
		let list: { title: string; cmd: string }[] = [];
		if (this.idGridSettings) {
			list = [
				{
					title: 'Rename',
					cmd: 'rename',
				},
				{
					title: 'Save',
					cmd: 'save',
				},
				{
					title: 'Save as New',
					cmd: 'create',
				},
				{
					title: 'Copy Link',
					cmd: 'copyLink',
				},
			];
			if (this.idGridSettings !== this.dropdownnGridSettings?.id) {
				list.push({
					title: 'Make Default',
					cmd: 'default',
				});
			}
		} else {
			list = [
				{
					title: 'Save as Default',
					cmd: 'create',
				},
			];
		}
		return list;
	}

	public onAction(e: any): void {
		switch (e.cmd) {
			case 'save':
				this.saveGridChanges();
				break;
			case 'create':
				this.saveNewGrid();
				break;
			case 'rename':
				this.renameGrid();
				break;
			case 'default':
				// this.renameGrid();
				break;
			case 'copyLink':
				// this.renameGrid();
				break;
			default:
				break;
		}
	}
}

import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { IntlService } from '@progress/kendo-angular-intl';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GridDirective } from 'src/app/core/directives/grid.directive';
import {
	IColumnFilterDataType,
	ColumnFilterType,
	IColumnSort,
	IDateSubFilter,
	IIntervalSubFilter,
	IStringSubFilter,
} from 'src/app/core/models/filters/column-filter.model';
import { IUser } from 'src/app/core/models/user.model';
import { CommonGridService } from 'src/app/core/services/grid.service';
import { FilterActions } from 'src/app/core/store/filter/filter.actions';
import { selectFilterData } from 'src/app/core/store/filter/filter.selectors';
import { GridActions } from 'src/app/core/store/grid/grid.actions';
import {
	selectCheckedAll,
	selectCheckedRows,
	selectGridData,
	selectGridInfo,
	selectGridUpdate,
} from 'src/app/core/store/grid/grid.selectors';
import { IGridButtonInfo, IGridColumnInfo, IGridInfo } from 'src/app/core/store/grid/grid.state';

import { IAppState } from 'src/app/core/store/state/app.state';
import { selectUser } from 'src/app/core/store/user/user.selectors';

@Component({
	providers: [],
	selector: 'advenium-data-list',
	templateUrl: './data-list.component.html',
	styleUrls: ['./data-list.component.scss'],
})
export class DataListComponent implements OnInit, OnDestroy {
	constructor(
		public store: Store<IAppState>,
		public intl: IntlService,
		private router: Router,
		private service: CommonGridService,
	) {}

	@Input() isReadOnly = false;

	@Input() gridId!: string;

	@Input() filterId!: string;

	@Input() gridSettingsId!: Guid | null;

	@Input() controller!: string;

	@Input() showModify!: boolean;

	@Input() showDuplicate!: boolean;

	@Input() showRemove!: boolean;

	@Input() createButton!: any;

	@Input() columns!: IGridColumnInfo[];

	@Input() showCheck!: boolean;

	@Input() showFilterButton!: boolean;

	@Input() groupable!: boolean;

	@Input() group: any;

	leftButtons: IGridButtonInfo[] | null = null;

	rightButtons: IGridButtonInfo[] | null = null;

	@Input() set buttons(list: IGridButtonInfo[]) {
		const left = list.filter((x) => x.position === 'left');
		const right = list.filter((x) => x.position === 'right');
		if (left.length > 0) {
			this.leftButtons = left;
		}
		if (right.length > 0) {
			this.rightButtons = right;
		}
	}

	@Input() displayItem!: (column: IGridColumnInfo, item: any) => string;

	@Input() clickItem!: (column: IGridColumnInfo, item: any) => void;

	@Input() clickLookupItem!: (column: IGridColumnInfo, item: any, subItem: any) => void;

	@Input() linkArray!: (column: IGridColumnInfo, item: any) => any;

	@Output() editItem = new EventEmitter<any>();

	@Output() duplicateItem = new EventEmitter<any>();

	@Output() removeItem = new EventEmitter<any>();

	@Output() createItem = new EventEmitter<any>();

	@Output() buttonClicked = new EventEmitter<any>();

	private _destroy$ = new Subject();

	list$: any;

	gridInfo$: any;

	gridInfo: IGridInfo | null = null;

	reload$: any;

	filter$: any;

	user!: IUser;

	showGrid = false;

	isEditMode = true;

	filterModel!: any;

	gridDirective!: GridDirective;

	state!: DataStateChangeEvent;

	checkedLines: any;

	selectedAll = false;

	checkedLines$: any;

	selectedAll$: any;

	click(column: IGridColumnInfo, item: any) {
		if (this.clickItem) {
			this.clickItem(column, item);
		}
		return false;
	}

	clickLookup(column: IGridColumnInfo, item: any, subType: any) {
		if (this.clickLookupItem) {
			this.clickLookupItem(column, item, subType);
		}
		return false;
	}

	visibleColumns(): IGridColumnInfo[] {
		if (!this.gridInfo?.columns) {
			return [];
		}
		const vc = Object.values(this.gridInfo.columns).filter((x) => x.visible !== false);
		return vc;
	}

	clickButton(btn: any) {
		console.log(btn);
		this.buttonClicked.emit(btn);
	}

	user$: any;

	ngOnInit(): void {
		this.user$ = this.store.pipe(select(selectUser), takeUntil(this._destroy$));
		if (this.columns) {
			let gridInfo = this.service.getGridInfo(this.columns, this.gridId);
			if (this.gridSettingsId) {
				this.service.getIGridSettings(this.gridSettingsId).subscribe((x) => {
					if (x) {
						gridInfo = this.service.mergeGridInfo(gridInfo, x);
						this.store.dispatch(GridActions.SetGridInfo({ gridId: this.gridId, grid: gridInfo }));
					}
				});
			} else {
				this.service.getDefaultIGridSettings(this.gridId).subscribe((x) => {
					gridInfo = this.service.mergeGridInfo(gridInfo, x);
					this.store.dispatch(GridActions.SetGridInfo({ gridId: this.gridId, grid: gridInfo }));
				});
			}
		}

		this.gridInfo$ = this.store.pipe(
			select(selectGridInfo, { gridId: this.gridId }),
			takeUntil(this._destroy$),
		);
		this.reload$ = this.store.pipe(
			select(selectGridUpdate, { gridId: this.gridId }),
			takeUntil(this._destroy$),
		);
		this.checkedLines$ = this.store.pipe(
			select(selectCheckedRows, { gridId: this.gridId }),
			takeUntil(this._destroy$),
		);
		this.selectedAll$ = this.store.pipe(
			select(selectCheckedAll, { gridId: this.gridId }),
			takeUntil(this._destroy$),
		);
		this.checkedLines$.subscribe((x: any) => {
			this.checkedLines = x;
		});
		this.selectedAll$.subscribe((x: boolean) => {
			this.selectedAll = x === true;
		});
		if (this.filterId) {
			this.filter$ = this.store.pipe(
				select(selectFilterData, this.filterId),
				takeUntil(this._destroy$),
			);
			this.filter$.subscribe((f: any) => {
				this.setFilter(f);
			});
		}
		this.user$.subscribe((user: any) => (user ? (this.user = user) : null));

		this.gridInfo$.subscribe((gi: IGridInfo | null) => {
			if (gi!.columns) {
				this.gridInfo = gi;
				if (this.showGrid === false) {
					this.list$ = this.store.pipe(
						select(selectGridData, { gridId: this.gridId }),
						takeUntil(this._destroy$),
					);
				}
				this.showGrid = true;
			}
		});

		this.reload$.subscribe((x: any) => {
			if (x) {
				this.reset();
			}
		});
	}

	ngOnDestroy(): void {
		this._destroy$.next(null);
		this.store.dispatch(GridActions.ResetList({ gridId: this.gridId }));
	}

	onAfterInit(gridDirective: GridDirective): void {
		this.gridDirective = gridDirective;
		gridDirective.load();
	}

	isRowChecked(item: any) {
		return this.checkedLines[item['grid-uid']] === true;
	}

	selectAll() {
		this.store.dispatch(GridActions.CheckAll({ gridId: this.gridId, checked: !this.selectedAll }));
	}

	rowCheck(item: any) {
		const checked = this.isRowChecked(item);
		this.store.dispatch(
			GridActions.CheckRow({
				gridId: this.gridId,
				gridUID: item['grid-uid'],
				checked: !checked,
			}),
		);
	}

	onDataStateChange(state: DataStateChangeEvent): void {
		this.filterModel = this.filterModel ? { ...this.filterModel } : {};
		this.addColumnFilters();
		this.addColumnSorting();

		this.store.dispatch(
			GridActions.GetList({
				gridId: this.gridId,
				controller: this.controller,
				state,
				filter: this.filterModel,
			}),
		);

		this.state = state;
	}

	onCreate() {
		if (this.createButton) {
			if (this.createButton.navigate) {
				this.router.navigate(this.createButton.navigate);
			} else {
				this.createItem.emit(this.createButton);
			}
		}
		return false;
	}

	reset(): void {
		this.showGrid = false;
		setTimeout(() => (this.showGrid = true));
		if (this.gridDirective) {
			this.gridDirective.load();
		}
	}

	private addColumnSorting() {
		const list: (IColumnSort | undefined)[] = [];
		if (this.gridInfo?.sorting && this.gridInfo?.columns) {
			Object.keys(this.gridInfo.sorting).forEach((_value: string, key: number) => {
				if (this.gridInfo!.sorting[key]) {
					const column = this.gridInfo!.columns[key];
					const sorting = this.gridInfo!.sorting[key];
					if (column?.sortDirection && sorting!.direction > 0) {
						list.push(sorting);
					}
				}
			});
			// for (const key in this.gridInfo.sorting) {
			// 	if (this.gridInfo.sorting[key]) {
			// 		const column = this.gridInfo.columns[key];
			// 		const sorting = this.gridInfo.sorting[key];
			// 		if (column?.sortDirection && sorting!.direction > 0) {
			// 			list.push(sorting);
			// 		}
			// 	}
			// }
		}
		this.filterModel.sorting = list.sort((a, b) => (a!.order || 0) - (b!.order || 0));
	}

	private addColumnFilters() {
		if (this.gridInfo?.filters && this.gridInfo?.columns) {
			Object.keys(this.gridInfo.filters).forEach((_value: string, key: number) => {
				if (this.gridInfo!.filters[key]) {
					const column = this.gridInfo!.columns[key];
					const filter = this.gridInfo!.filters[key];
					if (column?.filter?.field && filter) {
						let filterData = {};
						const type = filter.type > 0 ? filter.type : -filter.type;
						const isNegative = filter.type < 0;
						switch (filter.dataType) {
							case IColumnFilterDataType.String:
								filterData = {
									type,
									isNegative,
									value: filter.data,
								} as IStringSubFilter;
								break;
							case IColumnFilterDataType.Date:
								if (filter.type === ColumnFilterType.Between) {
									filterData = {
										type,
										isNegative,
										from: filter.data[0],
										to: filter.data[1],
									} as IIntervalSubFilter;
								} else {
									filterData = {
										type,
										isNegative,
										date: filter.data,
									} as IDateSubFilter;
								}
								break;
							default:
								break;
						}
						this.filterModel[column.filter.field] = filterData;
					}
				}
			});
			// for (const key in this.gridInfo.filters) {
			// 	if (this.gridInfo.filters[key]) {
			// 		const column = this.gridInfo.columns[key];
			// 		const filter = this.gridInfo.filters[key];
			// 		if (column?.filter?.field && filter) {
			// 			let filterData = {};
			// 			const type = filter.type > 0 ? filter.type : -filter.type;
			// 			const isNegative = filter.type < 0;
			// 			switch (filter.dataType) {
			// 				case ColumnFilterDataType.String:
			// 					filterData = {
			// 						type,
			// 						isNegative,
			// 						value: filter.data,
			// 					} as IStringSubFilter;
			// 					break;
			// 				case ColumnFilterDataType.Date:
			// 					if (filter.type === ColumnFilterType.Between) {
			// 						filterData = {
			// 							type,
			// 							isNegative,
			// 							from: filter.data[0],
			// 							to: filter.data[1],
			// 						} as IIntervalSubFilter;
			// 					} else {
			// 						filterData = {
			// 							type,
			// 							isNegative,
			// 							date: filter.data,
			// 						} as IDateSubFilter;
			// 					}
			// 					break;
			// 			}
			// 			this.filterModel[column.filter.field] = filterData;
			// 		}
			// 	}
			// }
		}
	}

	test() {
		console.log('test');
	}

	isSortable(column: IGridColumnInfo) {
		return column.sortDirection! >= 0;
	}

	isFilterable(column: IGridColumnInfo) {
		return column.filter?.field;
	}

	setFilter(filterModel: any): void {
		this.filterModel = _.clone(filterModel);
		if (this.gridDirective) {
			this.gridDirective.load();
		}
	}

	canModify(): boolean {
		return this.isReadOnly !== true;
	}

	canRemove(): boolean {
		return this.isReadOnly !== true;
	}

	canDuplicate(): boolean {
		return this.isReadOnly !== true;
	}

	closeEditor() {}

	edit(model: any) {
		this.editItem.emit(model);
	}

	duplicate(model: any) {
		this.duplicateItem.emit(model);
	}

	remove(model: any) {
		this.removeItem.emit(model);
	}

	display(column: IGridColumnInfo, item: any) {
		if (column.dataType === 'datetime') {
			const date = item[column.name];
			return date == null ? '' : formatDate(item[column.name], 'MM/dd/yyyy hh:mm a', 'en-US');
		}
		if (column.dataType === 'date') {
			const date = item[column.name];
			return date == null ? '' : formatDate(item[column.name], 'MM/dd/yyyy', 'en-US');
		}
		if (this.displayItem != null) {
			return this.displayItem(column, item);
		}
		return item[column.name];
	}

	openFilter() {
		if (this.filterId) {
			this.store.dispatch(FilterActions.OpenFilter({ id: this.filterId }));
		}
	}
}

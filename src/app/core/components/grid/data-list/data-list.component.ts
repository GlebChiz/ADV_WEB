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
	public constructor(
		public store: Store<IAppState>,
		public intl: IntlService,
		private router: Router,
		private service: CommonGridService,
	) {}

	@Input() public isReadOnly = false;

	@Input() public gridId!: string;

	@Input() public filterId!: string;

	@Input() public gridSettingsId!: Guid | null;

	@Input() public controller!: string;

	@Input() public showModify!: boolean;

	@Input() public showDuplicate!: boolean;

	@Input() public showRemove!: boolean;

	@Input() public createButton!: any;

	@Input() public columns!: IGridColumnInfo[];

	@Input() public showCheck!: boolean;

	@Input() public showFilterButton!: boolean;

	@Input() public groupable!: boolean;

	@Input() public group: any;

	public leftButtons: IGridButtonInfo[] | null = null;

	public rightButtons: IGridButtonInfo[] | null = null;

	@Input() public set buttons(list: IGridButtonInfo[]) {
		const left: IGridButtonInfo[] = list.filter((x) => x.position === 'left');
		const right: IGridButtonInfo[] = list.filter((x) => x.position === 'right');
		if (left.length > 0) {
			this.leftButtons = left;
		}
		if (right.length > 0) {
			this.rightButtons = right;
		}
	}

	@Input() public displayItem!: (column: IGridColumnInfo, item: any) => string;

	@Input() public clickItem!: (column: IGridColumnInfo, item: any) => void;

	@Input() public linkArray!: (column: IGridColumnInfo, item: any) => any;

	@Output() public editItem = new EventEmitter<any>();

	@Output() public duplicateItem = new EventEmitter<any>();

	@Output() public removeItem = new EventEmitter<any>();

	@Output() public createItem = new EventEmitter<any>();

	@Output() public buttonClicked = new EventEmitter<any>();

	private _destroy$ = new Subject();

	public list$: any;

	public gridInfo$: any;

	public gridInfo: IGridInfo | null = null;

	public reload$: any;

	public filter$: any;

	public user!: IUser;

	public showGrid = false;

	public isEditMode = true;

	public filterModel!: any;

	public gridDirective!: GridDirective;

	public state!: DataStateChangeEvent;

	public checkedLines: any;

	public selectedAll = false;

	public checkedLines$: any;

	public selectedAll$: any;

	public click(column: IGridColumnInfo, item: any): boolean {
		if (this.clickItem) {
			this.clickItem(column, item);
		}
		return false;
	}

	public visibleColumns(): IGridColumnInfo[] {
		const visCols : IGridColumnInfo[] = [];
		if (!this.gridInfo?.columns) {
			return visCols;
		}

		const vc = Object.values(this.gridInfo.columns)
			.filter((x: IGridColumnInfo) => x.visible !== false)
			.map(x => x as IGridColumnInfo);
		return vc;
	}

	public clickButton(btn: any): void {
		console.log(btn);
		this.buttonClicked.emit(btn);
	}

	public user$: any;

	public ngOnInit(): void {
		this.user$ = this.store.pipe(select(selectUser), takeUntil(this._destroy$));
		if (this.columns) {
			let gridInfo: IGridInfo = this.service.getGridInfo(this.columns, this.gridId);
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

	public ngOnDestroy(): void {
		this._destroy$.next(null);
		this.store.dispatch(GridActions.ResetList({ gridId: this.gridId }));
	}

	public onAfterInit(gridDirective: GridDirective): void {
		this.gridDirective = gridDirective;
		gridDirective.load();
	}

	public isRowChecked(item: any): boolean {
		return this.checkedLines[item['grid-uid']] === true;
	}

	public selectAll(): void {
		this.store.dispatch(GridActions.CheckAll({ gridId: this.gridId, checked: !this.selectedAll }));
	}

	public rowCheck(item: any): void {
		const checked: boolean = this.isRowChecked(item);
		this.store.dispatch(
			GridActions.CheckRow({
				gridId: this.gridId,
				gridUID: item['grid-uid'],
				checked: !checked,
			}),
		);
	}

	public onDataStateChange(state: DataStateChangeEvent): void {
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

	public onCreate(): boolean {
		if (this.createButton) {
			if (this.createButton.navigate) {
				this.router.navigate(this.createButton.navigate);
			} else {
				this.createItem.emit(this.createButton);
			}
		}
		return false;
	}

	public reset(): void {
		this.showGrid = false;
		setTimeout(() => (this.showGrid = true));
		if (this.gridDirective) {
			this.gridDirective.load();
		}
	}

	private addColumnSorting(): void {
		const list: (IColumnSort | undefined)[] = [];
		if (this.gridInfo?.sorting && this.gridInfo?.columns) {
			Object.keys(this.gridInfo.sorting).forEach((key: string) => {
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

	private addColumnFilters(): void {
		if (this.gridInfo?.filters && this.gridInfo?.columns) {
			Object.keys(this.gridInfo.filters).forEach((key: string) => {
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

	public isSortable(column: IGridColumnInfo): boolean {
		return column.sortDirection! >= 0;
	}

	public isFilterable(column: IGridColumnInfo) {
		return column.filter?.field;
	}

	public setFilter(filterModel: any): void {
		this.filterModel = _.clone(filterModel);
		if (this.gridDirective) {
			this.gridDirective.load();
		}
	}

	public canModify(): boolean {
		return this.isReadOnly !== true;
	}

	public canRemove(): boolean {
		return this.isReadOnly !== true;
	}

	public canDuplicate(): boolean {
		return this.isReadOnly !== true;
	}

	public edit(model: any): void {
		this.editItem.emit(model);
	}

	public duplicate(model: any): void {
		this.duplicateItem.emit(model);
	}

	public remove(model: any): void {
		this.removeItem.emit(model);
	}

	public display(column: IGridColumnInfo, item: any): string {
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

	public openFilter(): void {
		if (this.filterId) {
			this.store.dispatch(FilterActions.OpenFilter({ id: this.filterId }));
		}
	}
}

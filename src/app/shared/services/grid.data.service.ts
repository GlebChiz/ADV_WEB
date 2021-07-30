import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { IGridColumnInfo, IGridInfo, IGridSettings } from 'src/app/core/store/grid/grid.state';
import { Guid } from 'guid-typescript';
import {
	IColumnFilter,
	IColumnFilterDataType,
	ColumnFilterType,
	IColumnSort,
} from 'src/app/core/models/filters/column-filter.model';
import { AuthenticationService } from './authentification.service';
import { DataService } from './data.service';

export abstract class GridDataService extends DataService {
	constructor(http: HttpClient, public auth: AuthenticationService, controller: string) {
		super(http, controller);
	}

	readonly uidField = 'grid-uid';

	private getDefaultFilter(column: IGridColumnInfo): IColumnFilter {
		const filter = {
			column: column.name,
			dataType: IColumnFilterDataType.String,
			data: '',
			type: column.filter?.type || ColumnFilterType.Contains,
		} as IColumnFilter;

		if (column.dataType === 'datetime' || column.dataType === 'date') {
			filter.dataType = IColumnFilterDataType.Date;
		}
		return filter;
	}

	getGridInfo(columns: IGridColumnInfo[], gridId: string): IGridInfo {
		return {
			gridId,
			columns: this.createColumns(columns),
			filters: this.createFilters(columns),
			sorting: this.createSorting(columns),
		} as IGridInfo;
	}

	mergeGridInfo(info: IGridInfo, settings: IGridSettings): IGridInfo {
		if (settings) {
			info.title = settings.title;
			info.id = settings.id;
			if (settings.columns) {
				const cols = JSON.parse(settings.columns);
				Object.keys(info.columns).forEach((_value: string, key: number) => {
					if (info.columns[key] && cols[key]) {
						info.columns[key]!.visible = cols[key].visible !== false;
					}
				});
				// for (const key in info.columns) {
				// 	if (info.columns[key] && cols[key]) {
				// 		info.columns[key]!.visible = cols[key].visible !== false;
				// 	}
				// }
			}
			if (settings.filters) {
				const filters = JSON.parse(settings.filters);
				Object.keys(info.filters).forEach((_value: string, key: number) => {
					if (info.columns[key] && filters[key]) {
						info.filters[key] = filters[key];
					}
				});
				// for (const key in info.filters) {
				// 	if (info.columns[key] && filters[key]) {
				// 		info.filters[key] = filters[key];
				// 	}
				// }
			}
			if (settings.sorting) {
				const sort = JSON.parse(settings.sorting);
				Object.keys(info.sorting).forEach((_value: string, key: number) => {
					if (info.columns[key] && sort[key] && info.columns[key]!.sortDirection! >= 0) {
						info.sorting[key] = sort[key];
					}
				});
				// for (const key in info.sorting) {
				// 	if (info.columns[key] && sort[key] && info.columns[key]!.sortDirection! >= 0) {
				// 		info.sorting[key] = sort[key];
				// 	}
				// }
			}
		}
		return info;
	}

	private createFilters(columns: IGridColumnInfo[]) {
		const list: any = {};
		const filters = columns.filter((c) => c.filter?.field);
		filters.forEach((c) => {
			list[c.name] = this.getDefaultFilter(c);
		});
		return list;
	}

	private createColumns(columns: IGridColumnInfo[]) {
		const list: any = {};
		columns.forEach((c) => {
			list[c.name] = c;
		});
		return list;
	}

	private createSorting(columns: IGridColumnInfo[]) {
		const list: any = {};
		const sorting = columns.filter((c) => c.sortDirection! >= 0);
		sorting.forEach((c) => {
			list[c.name] = {
				order: c.sortOrder,
				column: c.name,
				direction: c.sortDirection,
			} as IColumnSort;
		});
		return list;
	}

	getGridItemsWithoutPaging(
		action: string,
		sortDescriptor: SortDescriptor[],
		filterModel?: any,
	): Observable<GridDataResult> {
		return this.post(action, {
			Filter: filterModel || {},
			sortExpression: sortDescriptor && sortDescriptor[0] ? sortDescriptor[0].field : null,
			sortDirection:
				sortDescriptor && sortDescriptor[0] && sortDescriptor[0].dir === 'desc'
					? 'Descending'
					: 'Ascending',
		}).pipe(
			map(
				(response) =>
					({
						data: response.items,
						total: parseInt(response.total, 10),
					} as GridDataResult),
			),
			tap(),
		);
	}

	protected getGridParams(state: DataStateChangeEvent): any {
		return {
			Skip: state.skip ? state.skip : 0,
			PageSize: state.take ? state.take : 10,
			SortExpression:
				state.sort && state.sort[0]
					? state.sort[0].field.charAt(0).toUpperCase() + state.sort[0].field.slice(1)
					: null,
			SortDirection:
				state.sort && state.sort[0] && state.sort[0].dir === 'desc' ? 'Descending' : 'Ascending',
		};
	}

	protected saveFilterWithController(
		controller: string,
		action: string,
		filterId: Guid,
		state: DataStateChangeEvent,
		filterModel?: any,
		gridId: string | null = null,
	): Observable<any> {
		const gridParams = this.getGridParams(state);
		const data = {
			Filter: filterModel || {},
			...gridParams,
			...{ gridId, sorting: filterModel?.sorting || [] },
		};
		data.Filter.FilterId = filterId.toString();
		return this.postWithController(controller, action, data);
	}

	protected saveFilter(
		action: string,
		filterId: Guid,
		state: DataStateChangeEvent,
		filterModel?: any,
		gridId: string | null = null,
	): Observable<any> {
		return this.saveFilterWithController(
			this.controller,
			action,
			filterId,
			state,
			filterModel,
			gridId!,
		);
	}

	protected getGrid(action: string, filterId: Guid): Observable<GridDataResult> {
		return this.getGridWithController(this.controller, action, filterId);
	}

	private generateUIDs(data: any[]): any[] {
		if (data) {
			data.forEach((d) => (d[this.uidField] = Guid.create().toString()));
		}
		return data;
	}

	protected getGridWithController(
		controller: string,
		action: string,
		filterId: Guid,
	): Observable<GridDataResult> {
		return this.getWithController(controller, `${filterId}/${action}`).pipe(
			map((response) => {
				const result = {
					data: this.generateUIDs(response.data),
					total: parseInt(response.total, 10),
				} as GridDataResult;
				return result;
			}),
		);
	}

	protected getGridVisibleColumns(
		action: string,
		gridId: string | null = null,
	): Observable<string[]> {
		const data = {
			gridId,
		};
		return this.post(action, data).pipe(
			map((response) => {
				return response as string[];
			}),
		);
	}

	protected getModelWithController(
		// controller: string,
		action: string,
		model: any,
		gridId: string,
	): Observable<any> {
		// const data = {};
		return this.postWithController(action, model, gridId).pipe(
			map((response) => {
				return response;
			}),
		);
	}
	/*
  protected getModel(
    action: string,
    model: any,
    gridId: string
  ): Observable<any> {
    return this.getModelWithController(this.controller, action, model, gridId)
  } */
}

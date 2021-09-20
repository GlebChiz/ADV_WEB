import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
	DateOperationFilter,
	IGridFilter,
	IGridFilterModel,
	IGridFilterType,
	StringOperationFilter,
} from '../interfaces/filter.interface';
import { IGridSort } from '../interfaces/sort.interface';

@Injectable({ providedIn: 'root' })
export class TableService {
	public constructor(private http: HttpClient) {}

	public handleError$(stream: Observable<any>): Observable<any> {
		return stream.pipe(
			switchMap((data: any) => {
				if (data && data.isSuccess === false) {
					return throwError(data.error);
				}
				return of(data);
			}),
		);
	}

	public delete(controller: string, id: string): Observable<any> {
		return this.handleError$(this.http.delete(`${controller}/${id}/delete`));
	}

	public update(controller: string, body: any): Observable<any> {
		return this.handleError$(this.http.put(`${controller}/update`, body));
	}

	public create(controller: string, body: any): Observable<any> {
		return this.handleError$(this.http.post(`${controller}/create`, body));
	}

	public getOne(controller: string, id: string): Observable<any> {
		return this.handleError$(this.http.get(`${controller}/${id}`));
	}

	public saveNewGridSettings(
		gridId: string,
		gridSettings: {
			state: DataStateChangeEvent;
		},
		columns: any[],
	): Observable<any> {
		return this.handleError$(
			this.http.post(`gridsettings/create`, {
				skip: gridSettings.state.skip,
				take: gridSettings.state.take,
				gridId,
				filters: gridSettings.state.filter?.filters,
				columns: [...columns.filter((column: any) => !column.hidden).map((c: any) => c.field)],
				sorting: this.getSorting(gridSettings.state),
			}),
		);
	}

	public saveGridChanges(
		gridId: string,
		gridSettings: {
			state: DataStateChangeEvent;
		},
		columns: any[],
	): Observable<any> {
		return this.handleError$(
			this.http.post(`gridsettings/update`, {
				skip: gridSettings.state.skip,
				take: gridSettings.state.take,
				gridId,
				filters: gridSettings.state.filter?.filters,
				columns: [...columns.filter((column: any) => !column.hidden).map((c: any) => c.field)],
				sorting: this.getSorting(gridSettings.state),
			}),
		);
	}

	public saveFilter<T>(
		controller: string,
		state: DataStateChangeEvent,
		filterId: string,
		columns: any[],
		gridId: string,
	): Observable<T> {
		console.log(columns);
		const filter: IGridFilterModel | undefined = this.getFilterModel(state);
		const gridFilterParams: IGridFilter = this.getGridFilterParams(state);
		return this.http.post<T>(`${controller}/grid-filter`, {
			Filter: {
				FilterId: filterId,
				...filter,
			},
			...gridFilterParams,
			gridId,
			sorting: this.getSorting(state),
		});
	}

	private getFilterModel(state: DataStateChangeEvent): IGridFilterModel | undefined {
		return state.filter?.filters.reduce((prev: IGridFilterModel, curr: any) => {
			let formatTypes: IGridFilterType;
			let isDate!: boolean;
			try {
				isDate = this.checkDate(curr.value.toISOString());
			} catch (e) {
				isDate = false;
			}

			if (isDate) {
				formatTypes = this.formatDateTypes(curr.operator);
				prev[curr.field as string] = {
					...formatTypes,
					date: curr.value,
				};
				return prev;
			}
			if (curr.operator === 'custom') {
				prev[curr.field] = curr.value;
				return prev;
			}

			formatTypes = this.formatStringTypes(curr.operator);
			prev[curr.field as string] = {
				...formatTypes,
				value: curr.value,
			};
			return prev;
		}, {});
	}

	private getSorting(state: DataStateChangeEvent): IGridSort[] | undefined {
		return state.sort?.map((sortItem: SortDescriptor) => {
			return {
				column: sortItem.field,
				direction: sortItem.dir === 'desc' ? 0 : 1,
			};
		});
	}

	public getData<T>(controller: string, filterId: string): Observable<T> {
		return this.http.get<T>(`${controller}/${filterId}/grid-data`);
	}

	protected getGridFilterParams(state: DataStateChangeEvent): IGridFilter {
		return {
			Skip: state.skip ? state.skip : 0,
			PageSize: state.take ? state.take : 10,
		};
	}

	private formatStringTypes(type: string): IGridFilterType {
		let res: IGridFilterType;
		switch (type) {
			case StringOperationFilter.Equal:
			case StringOperationFilter.NotEqual:
				res = {
					type: 1,
					isNegative: type !== StringOperationFilter.Equal,
				};
				break;
			case StringOperationFilter.Contains:
			case StringOperationFilter.DoesNotContain:
				res = {
					type: 2,
					isNegative: type !== StringOperationFilter.Contains,
				};
				break;
			case StringOperationFilter.Startswith:
				res = {
					type: 3,
					isNegative: false,
				};
				break;
			case StringOperationFilter.Endswith:
				res = {
					type: 4,
					isNegative: false,
				};
				break;
			case StringOperationFilter.IsEmpty:
			case StringOperationFilter.IsNotEmpty:
				res = {
					type: 10,
					isNegative: type !== StringOperationFilter.IsEmpty,
				};
				break;
			default:
				res = {
					type: 2,
					isNegative: false,
				};
				break;
		}
		return res;
	}

	private formatDateTypes(type: string): IGridFilterType {
		let res: IGridFilterType;
		switch (type) {
			case DateOperationFilter.Equal:
			case DateOperationFilter.NotEqual:
				res = {
					type: 1,
					isNegative: type !== DateOperationFilter.Equal,
				};
				break;
			case DateOperationFilter.After:
				res = {
					type: 2,
					isNegative: false,
				};
				break;
			case DateOperationFilter.Before:
				res = {
					type: 3,
					isNegative: false,
				};
				break;
			case DateOperationFilter.AfterOrEqual:
				res = {
					type: 4,
					isNegative: false,
				};
				break;
			case DateOperationFilter.BeforeOrEqual:
				res = {
					type: 5,
					isNegative: false,
				};
				break;
			default:
				res = {
					type: 1,
					isNegative: false,
				};
				break;
		}
		return res;
	}

	private checkDate(value: string): boolean {
		try {
			return new Date(value).toISOString().includes(value);
		} catch (e) {
			return false;
		}
	}
}

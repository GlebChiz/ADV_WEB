import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IGridFilter, IGridFilterModel, IGridFilterType } from '../interfaces/filter.interface';
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
		return this.handleError$(this.http.post(`${controller}/update`, body));
		// return this.http.post(`${controller}/update`, body);
	}

	public create(controller: string, body: any): Observable<any> {
		return this.handleError$(this.http.put(`${controller}/create`, body));
	}

	public getOne(controller: string, id: string): Observable<any> {
		return this.handleError$(this.http.get(`${controller}/${id}`));
		// return this.http.get(`${controller}/${id}`);
	}

	public saveFilter<T>(
		controller: string,
		state: DataStateChangeEvent,
		filterId: string,
		columns: any[],
	): Observable<T> {
		const filter: IGridFilterModel | undefined = this.getFilterModel(state);
		const gridFilterParams: IGridFilter = this.getGridFilterParams(state);

		return this.http.post<T>(`${controller}/grid-filter`, {
			Filter: { FilterId: filterId, ...filter },
			...gridFilterParams,
			gridId: `${controller}-manager-grid`,
			sorting: this.getSorting(columns, state),
		});
	}

	private getFilterModel(state: DataStateChangeEvent): IGridFilterModel | undefined {
		return state.filter?.filters.reduce((prev: IGridFilterModel, curr: any) => {
			const formatTypes: IGridFilterType = this.formatTypes(curr.operator);
			prev[curr.field as string] = {
				...formatTypes,
				value: curr.value,
			};

			return prev;
		}, {});
	}

	private getSorting(columns: any[], state: DataStateChangeEvent): IGridSort[] {
		return columns
			? columns.map((column: any) => {
					return {
						column: column.field,
						direction: state.sort && state.sort[0] && state.sort[0].dir === 'desc' ? 0 : 1,
					};
			  })
			: [];
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

	private formatTypes(type: string): IGridFilterType {
		let res: IGridFilterType;
		switch (type) {
			case 'eq':
			case 'neq':
				res = {
					type: 1,
					isNegative: type !== 'eq',
				};
				break;
			case 'contains':
			case 'doesnotcontain':
				res = {
					type: 2,
					isNegative: type !== 'contains',
				};
				break;
			case 'startswith':
				res = {
					type: 3,
					isNegative: false,
				};
				break;
			case 'endswith':
				res = {
					type: 4,
					isNegative: false,
				};
				break;
			case 'isempty':
			case 'isnotempty':
				res = {
					type: 10,
					isNegative: type !== 'isempty',
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
}

export const ColumnFilterTypeNames: string[] = [
	'',
	'Equals',
	'Contains',
	'Starts With',
	'Ends With',
	'More Than',
	'Less',
	'More Than or Equals',
	'Less Than or Equals',
	'Between',
	'Empty',
];

export enum ColumnFilterType {
	None = 0,
	Equal = 1,
	Contains = 2,
	StartsWith = 3,
	EndsWith = 4,
	More = 5,
	Less = 6,
	MoreEqual = 7,
	LessEqual = 8,
	Between = 9,
	Empty = 10,
}

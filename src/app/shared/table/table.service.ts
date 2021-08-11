import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IGridFilter, IGridFilterModel } from '../interfaces/filter.interface';
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
				console.log('data:', data);
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
			prev[curr.field as string] = {
				type: this.formatTypes(curr.operator),
				isNegative: false,
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

	private formatTypes(type: string): number {
		const typesList: string[] = [
			'none',
			'eq',
			'contains',
			'startswith',
			'endswith',
			'more',
			'less',
			'moreequal',
			'lessequal',
			'between',
			'empty',
		];
		return typesList.includes(type) ? typesList.indexOf(type) : 2;
	}
}

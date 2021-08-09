/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { CommonGridService } from 'src/app/core/services/grid.service';
import { IAppState } from 'src/app/core/store/state/app.state';
import { environment } from 'src/environments/environment';
import { IFilter } from './table.model';
// import { DataService } from '../services/data.service';
import {
	CREATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	DUBLICATE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_TABLE_DATA_PENDING,
	UPDATE_TABLE_STATE,
} from './table.tokens';

@Injectable()
export class TableEffects {
	public constructor(
		private actions$: Actions,
		@Inject(GET_TABLE_DATA_PENDING) private getTableDataPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) private deleteItemTablePending: any,
		@Inject(UPDATE_TABLE_STATE) private updateTableState: any,
		@Inject(DUBLICATE_ITEM_TABLE_PENDING) private dublicateItemTablePending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) private editItemTablePending: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createItemTablePending: any,
		private _dataService: CommonGridService, // private http: HttpClient,
		public _store: Store<IAppState>,
		private http: HttpClient,
	) {}

	public getTableData$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.getTableDataPending),
			switchMap(({ controller, filter }: { controller: string; filter: any }) => {
				return this._dataService.getGridList(`${controller}-manager-grid`, controller, filter).pipe(
					map((result: any) => {
						return this.updateTableState({ data: result });
					}),
				);
			}),
		);
	});

	public deleteItemTable$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.deleteItemTablePending),
			switchMap(
				({ controller, filter, id }: { controller: string; filter: IFilter; id: string }) => {
					return this.http.delete<any>(`${environment.apiUrl}/${controller}/${id}/delete`).pipe(
						map(() => {
							return this.getTableDataPending({ controller, filter });
							// return this.updateTableState({ data: result });
						}),
					);
				},
			),
		);
	});

	public dublicateItemTable$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.dublicateItemTablePending),
			switchMap(
				({ controller, filter, id }: { controller: string; filter: IFilter; id: string }) => {
					return this.http.delete<any>(`${environment.apiUrl}/${controller}/${id}/delete`).pipe(
						map(() => {
							return this.getTableDataPending({ controller, filter });
							// return this.updateTableState({ data: result });
						}),
					);
				},
			),
		);
	});

	public createItemTable$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.createItemTablePending),
			switchMap(
				({ controller, filter, model }: { controller: string; filter: IFilter; model: any }) => {
					return this.http.put(`${environment.apiUrl}/${controller}`, model).pipe(
						map(() => {
							return this.getTableDataPending({ controller, filter });
							// return this.updateTableState({ data: result });
						}),
					);
				},
			),
		);
	});

	public editItemTable$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.editItemTablePending),
			switchMap(
				({ controller, filter, id }: { controller: string; filter: IFilter; id: string }) => {
					return this.http.delete<any>(`${environment.apiUrl}/${controller}/${id}/delete`).pipe(
						map(() => {
							return this.getTableDataPending({ controller, filter });
							// return this.updateTableState({ data: result });
						}),
					);
				},
			),
		);
	});
}

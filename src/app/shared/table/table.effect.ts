/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Guid } from 'guid-typescript';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { TableService } from './table.service';
import {
	CREATE_ITEM_TABLE_ERROR,
	CREATE_ITEM_TABLE_PENDING,
	CREATE_ITEM_TABLE_SUCCESS,
	DELETE_ITEM_TABLE_ERROR,
	DELETE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_SUCCESS,
	EDIT_ITEM_TABLE_ERROR,
	EDIT_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_SUCCESS,
	GET_CURRENT_ITEM_ERROR,
	GET_CURRENT_ITEM_PENDING,
	GET_CURRENT_ITEM_SUCCESS,
	GET_TABLE_DATA_ERROR,
	GET_TABLE_DATA_PENDING,
	GET_TABLE_DATA_SUCCESS,
	UPDATE_TABLE_STATE,
} from './table.tokens';

@Injectable()
export class TableEffects {
	public constructor(
		private actions$: Actions,
		@Inject(GET_TABLE_DATA_PENDING) private getTableDataPending: any,
		@Inject(GET_TABLE_DATA_SUCCESS) private getTableDataSuccess: any,
		@Inject(GET_TABLE_DATA_ERROR) private getTableDataError: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) private deleteItemTablePending: any,
		@Inject(DELETE_ITEM_TABLE_SUCCESS) private deleteItemTableSuccess: any,
		@Inject(DELETE_ITEM_TABLE_ERROR) private deleteItemTableError: any,
		@Inject(UPDATE_TABLE_STATE) private updateTableState: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) private editItemTablePending: any,
		@Inject(EDIT_ITEM_TABLE_ERROR) private editItemTableError: any,
		@Inject(EDIT_ITEM_TABLE_SUCCESS) private editItemTableSuccess: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createItemTablePending: any,
		@Inject(CREATE_ITEM_TABLE_SUCCESS) private createItemTableSuccess: any,
		@Inject(CREATE_ITEM_TABLE_ERROR) private createItemTableError: any,
		@Inject(GET_CURRENT_ITEM_PENDING) private getCurrentItemPending: any,
		@Inject(GET_CURRENT_ITEM_SUCCESS) private getCurrentItemSuccess: any,
		@Inject(GET_CURRENT_ITEM_ERROR) private getCurrentItemError: any,
		private _tableService: TableService,
		private _store: Store<any>,
	) {}

	public getTableData$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.getTableDataPending),
			switchMap(
				({
					controller,
					filter,
					columns,
				}: {
					controller: string;
					filter: DataStateChangeEvent;
					columns: any[];
				}) => {
					const filterId: Guid = Guid.create();
					return this._tableService
						.saveFilter(controller, filter, filterId.toString(), columns)
						.pipe(
							switchMap(() => {
								return this._tableService.getData(controller, filterId.toString()).pipe(
									map((result: any) => {
										this._store.dispatch(this.getTableDataSuccess());
										return this.updateTableState({ data: { ...result, isLoading: false } });
									}),
									catchError((error: string) => {
										return of(this.getTableDataError(error));
									}),
								);
							}),
							catchError((error: any) => {
								return of(this.getTableDataError(error));
							}),
						);
				},
			),
		);
	});

	public deleteItemTable$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.deleteItemTablePending),
			switchMap(({ id, controller }: { controller: string; id: string }) => {
				return of(1).pipe(
					withLatestFrom(this._store.select(`${controller}Table` as any)),
					switchMap(([, latest]: [any, any]) => {
						return this._tableService.delete(controller, id).pipe(
							mergeMap(() => {
								return [
									this.deleteItemTableSuccess(),
									this.getTableDataPending({ controller, filter: latest.filter }),
								];
							}),
							catchError((error: string) => {
								return of(this.deleteItemTableError(error));
							}),
						);
					}),
				);
			}),
		);
	});

	public createItemTable$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.createItemTablePending),
			switchMap(({ item, controller }: { controller: string; item: any }) => {
				return of(1).pipe(
					withLatestFrom(this._store.select(`${controller}Table` as any)),
					switchMap(([, latest]: [any, any]) => {
						return this._tableService.create(controller, item).pipe(
							map(() => {
								this._store.dispatch(this.createItemTableSuccess());
								return this.getTableDataPending({ controller, filter: latest.filter });
							}),
							catchError((error: string) => {
								return of(this.createItemTableError(error));
							}),
						);
					}),
				);
			}),
		);
	});

	public editItemTable$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.editItemTablePending),
			switchMap(({ item, controller }: { controller: string; item: any }) => {
				return of(1).pipe(
					withLatestFrom(this._store.select(`${controller}Table` as any)),
					switchMap(([, latest]: [any, any]) => {
						return this._tableService.update(controller, item).pipe(
							map(() => {
								this._store.dispatch(this.editItemTableSuccess());
								return this.getTableDataPending({ controller, filter: latest.filter });
							}),
							catchError((error: string) => {
								console.log(error);

								return of(this.editItemTableError(error));
							}),
						);
					}),
				);
			}),
		);
	});

	public getOne$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.getCurrentItemPending),
			switchMap(({ id, controller }: { controller: string; id: string }) => {
				return of(1).pipe(
					withLatestFrom(this._store.select(`${controller}Table` as any)),
					switchMap(([, latest]: [any, any]) => {
						return this._tableService.getOne(controller, id).pipe(
							map((item: any) => {
								this._store.dispatch(this.getCurrentItemSuccess({ item }));
								return this.getTableDataPending({ controller, filter: latest.filter });
							}),
							catchError((error: string) => {
								return of(this.getCurrentItemError(error));
							}),
						);
					}),
				);
			}),
		);
	});
}

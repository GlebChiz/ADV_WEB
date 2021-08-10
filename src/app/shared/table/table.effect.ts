/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Guid } from 'guid-typescript';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { IAppState } from 'src/app/core/store/state/app.state';
import { TableService } from './table.service';
import {
	CREATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_ERROR,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_PENDING,
	UPDATE_TABLE_STATE,
} from './table.tokens';

@Injectable()
export class TableEffects {
	public constructor(
		private actions$: Actions,
		@Inject(GET_TABLE_DATA_PENDING) private getTableDataPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) private deleteItemTablePending: any,
		@Inject(DELETE_ITEM_TABLE_ERROR) private deleteItemTableError: any,
		@Inject(UPDATE_TABLE_STATE) private updateTableState: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) private editItemTablePending: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createItemTablePending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) private getCurrentItemPending: any,
		private _tableService: TableService,
		private _store: Store<IAppState>,
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
										return this.updateTableState({ data: { ...result, isLoading: false } });
									}),
								);
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
							map(() => {
								return this.getTableDataPending({ controller, filter: latest.filter });
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
								return this.getTableDataPending({ controller, filter: latest.filter });
							}),
							// catchError((error: string) => {
							// 	return of(this.deleteItemTableError(error)); //CREATE ERROR
							// }),
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
								return this.getTableDataPending({ controller, filter: latest.filter });
							}),
							// catchError((error: string) => {
							// 	return of(this.deleteItemTableError(error)); //UPDATE ERROR
							// }),
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
							map(() => {
								return this.getTableDataPending({ controller, filter: latest.filter });
							}),
							// catchError((error: string) => {
							// 	return of(this.deleteItemTableError(error)); //GET ONE ERROR
							// }),
						);
					}),
				);
			}),
		);
	});
}

import { ITableState } from 'src/app/shared/table/table.reducer';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Guid } from 'guid-typescript';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { LocationActions } from 'src/app/store/actions/location.actions';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
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
	GET_GRID_SETTINGS_ERROR,
	GET_GRID_SETTINGS_PENDING,
	GET_GRID_SETTINGS_SUCCESS,
	GET_TABLE_DATA_ERROR,
	GET_TABLE_DATA_PENDING,
	GET_TABLE_DATA_SUCCESS,
	SAVE_GRID_CHANGES_ERROR,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_CHANGES_SUCCESS,
	SAVE_GRID_SETTINGS_ERROR,
	SAVE_GRID_SETTINGS_PENDING,
	SAVE_GRID_SETTINGS_SUCCESS,
	UPDATE_TABLE_STATE,
} from './table.tokens';

@Injectable()
export class TableEffects {
	public constructor(
		public actions$: Actions,
		@Inject(GET_TABLE_DATA_PENDING) public getTableDataPending: any,
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
		@Inject(SAVE_GRID_SETTINGS_PENDING) private saveNewGridSettingsPending: any,
		@Inject(SAVE_GRID_SETTINGS_SUCCESS) private saveNewGridSettingsSuccess: any,
		@Inject(SAVE_GRID_SETTINGS_ERROR) private saveNewGridSettingsError: any,
		@Inject(SAVE_GRID_CHANGES_PENDING) private saveGridChangesPending: any,
		@Inject(SAVE_GRID_CHANGES_SUCCESS) private saveGridChangesSuccess: any,
		@Inject(SAVE_GRID_CHANGES_ERROR) private saveGridChangesError: any,
		@Inject(GET_GRID_SETTINGS_PENDING) private getGridSettingsPending: any,
		@Inject(GET_GRID_SETTINGS_SUCCESS) private getGridSettingsSuccess: any,
		@Inject(GET_GRID_SETTINGS_ERROR) private getGridSettingsError: any,

		public _tableService: TableService,
		public _store: Store<any>,
		public readonly _toasterService: ToastrService,
	) {}

	public getTableData$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.getTableDataPending),
			switchMap(
				({
					controller,
					filter,
					columns,
					gridId,
				}: {
					controller: string;
					filter: DataStateChangeEvent;
					columns: IColumn[];
					gridId: string;
				}) => {
					const filterId: Guid = Guid.create();
					return this._tableService
						.saveFilter(controller, filter, filterId.toString(), columns, gridId)
						.pipe(
							switchMap(() => {
								return this._tableService.getData(controller, filterId.toString()).pipe(
									mergeMap((result: any) => {
										return [
											this.getTableDataSuccess(),
											this.updateTableState({ data: { ...result, isLoading: false } }),
										];
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
					withLatestFrom(this._store.select(`${controller}`, 'table')),
					switchMap(([, latest]: [number, ITableState<any, any>]) => {
						return this._tableService.delete(controller, id).pipe(
							mergeMap(() => {
								this._toasterService.success('Item has been successfully deleted');
								return [
									this.deleteItemTableSuccess(),
									this.getTableDataPending({
										controller,
										filter: latest.filter,
										columns: latest.columns,
									}),
								];
							}),
							catchError((error: string) => {
								this._toasterService.error(`Delete item error: ${error}`);
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
					withLatestFrom(this._store.select(`${controller}` as any, 'table')),
					switchMap(([, latest]: [number, ITableState<any, any>]) => {
						return this._tableService.create(controller, item).pipe(
							mergeMap(() => {
								this._toasterService.success('Item has been successfully created');
								return [
									this.createItemTableSuccess(),
									this.getTableDataPending({
										controller,
										filter: latest.filter,
										columns: latest.columns,
									}),
								];
							}),
							catchError((error: string) => {
								this._toasterService.error(`Create item error: ${error}`);
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
					withLatestFrom(this._store.select(`${controller}` as any, 'table')),
					switchMap(([, latest]: [number, ITableState<any, any>]) => {
						return this._tableService.update(controller, item).pipe(
							mergeMap(() => {
								if (controller === 'location') {
									this._store.dispatch(
										LocationActions.GetSelectedLocationPending({
											id: item.id,
										}),
									);
								}
								this._toasterService.success('Item has been successfully updated');
								return [
									this.editItemTableSuccess(),
									this.getTableDataPending({
										controller,
										filter: latest.filter,
										columns: latest.columns,
									}),
								];
							}),
							catchError((error: string) => {
								console.log(error);
								this._toasterService.error(`update item error: ${error}`);
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
				return this._tableService.getOne(controller, id).pipe(
					map((item: any) => {
						return this.getCurrentItemSuccess({ item });
					}),
					catchError((error: string) => {
						return of(this.getCurrentItemError(error));
					}),
				);
			}),
		);
	});

	public getGridSettings$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.getGridSettingsPending),
			switchMap(({ id }: { id: string }) => {
				return this._tableService.getGridSettings(id).pipe(
					map((gridSettings: any) => {
						return this.getGridSettingsSuccess({ gridSettings });
					}),
					catchError((error: string) => {
						return of(this.getGridSettingsError(error));
					}),
				);
			}),
		);
	});

	public saveNewGridSettings$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.saveNewGridSettingsPending),
			switchMap(
				({
					gridId,
					gridSettings,
					columns,
				}: {
					gridId: string;
					gridSettings: {
						state: DataStateChangeEvent;
					};
					columns: any[];
				}) => {
					return this._tableService.saveNewGridSettings(gridId, gridSettings, columns).pipe(
						mergeMap(() => {
							this._toasterService.success('Grid settings has been successfully created');
							return [
								this.saveNewGridSettingsSuccess(),
								DropdownActions.GetGridSettingsPending({ gridId }),
							];
						}),
						catchError((error: string) => {
							this._toasterService.error(`create grid settings error: ${error}`);
							return of(this.saveNewGridSettingsError(error));
						}),
					);
				},
			),
		);
	});

	public saveGridChanges$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.saveGridChangesPending),
			switchMap(
				({
					id,
					gridId,
					gridSettings,
					columns,
				}: {
					id: string;
					gridId: string;
					gridSettings: {
						state: DataStateChangeEvent;
					};
					columns: any[];
				}) => {
					return this._tableService.saveGridChanges(id, gridId, gridSettings, columns).pipe(
						map(() => {
							this._toasterService.success('Grid settings has been successfully updated');
							return this.saveGridChangesSuccess();
						}),
						catchError((error: string) => {
							this._toasterService.error(`update grid settings error: ${error}`);
							return of(this.saveGridChangesError(error));
						}),
					);
				},
			),
		);
	});
}

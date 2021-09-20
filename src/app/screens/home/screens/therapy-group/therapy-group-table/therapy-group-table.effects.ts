/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { ITherapyGroup } from 'src/app/shared/interfaces/therapy-group.interface';
import { TableEffects } from 'src/app/shared/table/table.effect';
import { ITableGroupState } from 'src/app/shared/table/table.reducer';
import { TableService } from 'src/app/shared/table/table.service';
import {
	GET_TABLE_DATA_PENDING,
	GET_TABLE_DATA_SUCCESS,
	GET_TABLE_DATA_ERROR,
	DELETE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_SUCCESS,
	DELETE_ITEM_TABLE_ERROR,
	UPDATE_TABLE_STATE,
	EDIT_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_ERROR,
	EDIT_ITEM_TABLE_SUCCESS,
	CREATE_ITEM_TABLE_PENDING,
	CREATE_ITEM_TABLE_SUCCESS,
	CREATE_ITEM_TABLE_ERROR,
	GET_CURRENT_ITEM_PENDING,
	GET_CURRENT_ITEM_SUCCESS,
	GET_CURRENT_ITEM_ERROR,
	SAVE_GRID_SETTINGS_PENDING,
	SAVE_GRID_SETTINGS_SUCCESS,
	SAVE_GRID_SETTINGS_ERROR,
	SAVE_GRID_CHANGES_ERROR,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_CHANGES_SUCCESS,
	GET_GRID_SETTINGS_ERROR,
	GET_GRID_SETTINGS_PENDING,
	GET_GRID_SETTINGS_SUCCESS,
} from 'src/app/shared/table/table.tokens';
import { ITherapyGroupCurrent } from './therapy-group-popup/therapy-group-popup.component';
import { TherapyGroupTableActions } from './therapy-group-table.actions';
import { TherapyGroupService } from './therapy-group-table.service';

@Injectable()
export class TherapyGroupEffects extends TableEffects {
	public constructor(
		actions$: Actions,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_TABLE_DATA_SUCCESS) getTableDataSuccess: any,
		@Inject(GET_TABLE_DATA_ERROR) getTableDataError: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteItemTablePending: any,
		@Inject(DELETE_ITEM_TABLE_SUCCESS) deleteItemTableSuccess: any,
		@Inject(DELETE_ITEM_TABLE_ERROR) deleteItemTableError: any,
		@Inject(UPDATE_TABLE_STATE) updateTableState: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editItemTablePending: any,
		@Inject(EDIT_ITEM_TABLE_ERROR) editItemTableError: any,
		@Inject(EDIT_ITEM_TABLE_SUCCESS) editItemTableSuccess: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) createItemTablePending: any,
		@Inject(CREATE_ITEM_TABLE_SUCCESS) createItemTableSuccess: any,
		@Inject(CREATE_ITEM_TABLE_ERROR) createItemTableError: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(GET_CURRENT_ITEM_SUCCESS) getCurrentItemSuccess: any,
		@Inject(GET_CURRENT_ITEM_ERROR) getCurrentItemError: any,
		@Inject(SAVE_GRID_SETTINGS_PENDING) saveNewGridSettingsPending: any,
		@Inject(SAVE_GRID_SETTINGS_SUCCESS) saveNewGridSettingsSuccess: any,
		@Inject(SAVE_GRID_SETTINGS_ERROR) saveNewGridSettingsError: any,
		@Inject(SAVE_GRID_CHANGES_PENDING) saveGridChangesPending: any,
		@Inject(SAVE_GRID_CHANGES_SUCCESS) saveGridChangesSuccess: any,
		@Inject(SAVE_GRID_CHANGES_ERROR) saveGridChangesError: any,
		@Inject(GET_GRID_SETTINGS_PENDING) getGridSettingsPending: any,
		@Inject(GET_GRID_SETTINGS_SUCCESS) getGridSettingsSuccess: any,
		@Inject(GET_GRID_SETTINGS_ERROR) getGridSettingsError: any,
		_tableService: TableService,
		_store: Store<any>,
		_toasterService: ToastrService,
		private _service: TherapyGroupService,
	) {
		super(
			actions$,
			getTableDataPending,
			getTableDataSuccess,
			getTableDataError,
			deleteItemTablePending,
			deleteItemTableSuccess,
			deleteItemTableError,
			updateTableState,
			editItemTablePending,
			editItemTableError,
			editItemTableSuccess,
			createItemTablePending,
			createItemTableSuccess,
			createItemTableError,
			getCurrentItemPending,
			getCurrentItemSuccess,
			getCurrentItemError,
			saveNewGridSettingsPending,
			saveNewGridSettingsSuccess,
			saveNewGridSettingsError,
			saveGridChangesPending,
			saveGridChangesSuccess,
			saveGridChangesError,
			getGridSettingsPending,
			getGridSettingsSuccess,
			getGridSettingsError,
			_tableService,
			_store,
			_toasterService,
		);
	}

	public getRooms$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(TherapyGroupTableActions.GetRoomsPending),
			switchMap(
				({
					controller,
					filter,
					gridId,
				}: {
					controller: string;
					filter: DataStateChangeEvent;
					gridId: string;
				}) => {
					const filterId: Guid = Guid.create();
					return this._tableService
						.saveFilter(controller, filter, filterId.toString(), [], gridId)
						.pipe(
							switchMap(() => {
								return this._tableService.getData(controller, filterId.toString()).pipe(
									map((rooms: any) => {
										return TherapyGroupTableActions.GetRoomsSuccess({
											rooms,
										});
									}),
									catchError(() => {
										return of(TherapyGroupTableActions.GetRoomsError());
									}),
								);
							}),
							catchError(() => {
								return of(TherapyGroupTableActions.GetRoomsError());
							}),
						);
				},
			),
		);
	});

	public updateFieldTherapyGroup$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(TherapyGroupTableActions.UpdateFiledTherapyGroupPending),
			switchMap(
				({
					ids,
					value,
					entity,
					controller,
				}: {
					ids: string[];
					value: any;
					entity: string;
					controller: string;
				}) => {
					return of(1).pipe(
						withLatestFrom(this._store.select(`${controller}Table`)),
						switchMap(
							([, latest]: [number, ITableGroupState<ITherapyGroup, ITherapyGroupCurrent>]) => {
								return this._service.updateFieldTherapyGroup(ids, value, entity).pipe(
									mergeMap(() => {
										return [
											TherapyGroupTableActions.UpdateFiledTherapyGroupSuccess(),
											this.getTableDataPending({
												controller,
												filter: latest.table.filter,
												columns: latest.table.columns,
											}),
										];
									}),
									catchError(() => of(TherapyGroupTableActions.UpdateFiledTherapyGroupError())),
								);
							},
						),
					);
				},
			),
		);
	});
}

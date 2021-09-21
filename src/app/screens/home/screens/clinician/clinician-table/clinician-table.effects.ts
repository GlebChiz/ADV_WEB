/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { TableEffects } from 'src/app/shared/table/table.effect';
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
import { ClinicianTableActions } from './clinician-table.actions';
import { IClinicianGeneralInfo } from './clinician-table.component';
import { ClinicianService } from './clinician-table.service';

@Injectable()
export class ClinicianEffect extends TableEffects {
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
		private _service: ClinicianService,
		_toasterService: ToastrService,
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

	public getClinicianGeneralInfo$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ClinicianTableActions.GetClinicianGeneralInfoPending),
			switchMap(({ id }: { id: string }) => {
				return this._service.getClinicianGeneralInfo(id).pipe(
					map((clinicianInfo: any) => {
						return ClinicianTableActions.GetClinicianGeneralInfoSuccess({ clinicianInfo });
					}),
					catchError(() => of(ClinicianTableActions.GetClinicianGeneralInfoError())),
				);
			}),
		);
	});

	public updateClinicianGeneralInfo$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ClinicianTableActions.UpdateClinicianGeneralInfoPending),
			switchMap(({ id, clinicianInfo }: { id: string; clinicianInfo: IClinicianGeneralInfo }) => {
				return this._service.updateClinicianGeneralInfo(id, clinicianInfo).pipe(
					map(() => ClinicianTableActions.UpdateClinicianGeneralInfoSuccess()),
					catchError(() => of(ClinicianTableActions.UpdateClinicianGeneralInfoError())),
				);
			}),
		);
	});
}

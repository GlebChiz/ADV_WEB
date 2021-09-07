/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { IPatientGeneralInfo } from 'src/app/shared/components/patient-general-info/patient-general-info.component';
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
} from 'src/app/shared/table/table.tokens';
import { PatientTableActions } from './patient-table.actions';
import { PatientService } from './patient-table.service';

@Injectable()
export class PatientEffect extends TableEffects {
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
		_tableService: TableService,
		_store: Store<any>,
		private _service: PatientService,
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
			_tableService,
			_store,
			_toasterService,
		);
	}

	public getPatientGeneralInfo$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PatientTableActions.GetPatientGeneralInfoPending),
			switchMap(({ id }: { id: string }) => {
				return this._service.getPatientGeneralInfo(id).pipe(
					map((patientInfo: any) =>
						PatientTableActions.GetPatientGeneralInfoSuccess({ patientInfo }),
					),
					catchError(() => of(PatientTableActions.GetPatientGeneralInfoError())),
				);
			}),
		);
	});

	public updatePatientGeneralInfo$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PatientTableActions.UpdatePatientGeneralInfoPending),
			switchMap(({ id, patientInfo }: { id: string; patientInfo: IPatientGeneralInfo }) => {
				return this._service.updatePatientGeneralInfo(id, patientInfo).pipe(
					map(() => PatientTableActions.UpdatePatientGeneralInfoSuccess()),
					catchError(() => of(PatientTableActions.UpdatePatientGeneralInfoError())),
				);
			}),
		);
	});
}

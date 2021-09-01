/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { IPatientDistribution } from 'src/app/shared/interfaces/patient-distribution.interface';
import { TableEffects } from 'src/app/shared/table/table.effect';
import { ITableGroupState } from 'src/app/shared/table/table.reducer';
import { TableService } from 'src/app/shared/table/table.service';
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
} from 'src/app/shared/table/table.tokens';
import { IPatientDistributionCurrent } from './patient-distribution-popup/patient-distribution-popup.component';
import { PatientDistributionTableActions } from './patient-distribution-table.actions';
import { PatientDistributionService } from './patient-distribution-table.service';

@Injectable()
export class PatientDistributionEffects extends TableEffects {
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
		_toasterService: ToastrService,
		private _service: PatientDistributionService,
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

	public updateFieldPatientDistribution$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PatientDistributionTableActions.UpdateFiledPatientDistributionPending),
			switchMap(
				({
					patientIds,
					supervisorId,
					startDate,
					controller,
				}: {
					patientIds: string[];
					supervisorId: string;
					startDate: Date;
					controller: string;
				}) => {
					return of(1).pipe(
						withLatestFrom(this._store.select(`${controller}Table`)),
						switchMap(
							([, latest]: [
								number,
								ITableGroupState<IPatientDistribution, IPatientDistributionCurrent>,
							]) => {
								return this._service
									.updateFieldPatientDistribution(patientIds, supervisorId, startDate)
									.pipe(
										mergeMap(() => {
											return [
												PatientDistributionTableActions.UpdateFiledPatientDistributionSuccess(),
												this.getTableDataPending({
													controller,
													filter: latest.table.filter,
													columns: latest.table.columns,
												}),
											];
										}),
										catchError(() =>
											of(PatientDistributionTableActions.UpdateFiledPatientDistributionError()),
										),
									);
							},
						),
					);
				},
			),
		);
	});
}

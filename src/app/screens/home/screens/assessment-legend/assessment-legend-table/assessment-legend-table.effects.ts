/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
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
import { ISessionPlan } from 'src/app/shared/interfaces/session-plan.interface';
import { ITable } from 'src/app/shared/table/table.reducer';
import { ToastrService } from 'ngx-toastr';
import { ISessionPlanCurrent } from '../../session-plan/session-plan-table/session-plan-popup/session-plan-popup.component';
import { AssessmentLegendTableActions } from './assessment-legend-table.actions';
import { AssessmentLegendService } from './assessment-legend-table.service';

@Injectable()
export class AssessmentLegendEffect extends TableEffects {
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
		private _service: AssessmentLegendService,
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

	public getTranslation$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AssessmentLegendTableActions.GetTranslationPending),
			switchMap(({ legendId, languageId }: { legendId: string; languageId: string }) => {
				return this._service.getAssessmentLegend(legendId, languageId).pipe(
					map((tranlsated: any) =>
						AssessmentLegendTableActions.GetTranslationSuccess({ tranlsated }),
					),
					catchError(() => of(AssessmentLegendTableActions.GetTranslationError())),
				);
			}),
		);
	});

	public setTranslation$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AssessmentLegendTableActions.SetTranslationPending),
			switchMap(({ type, controller, ...data }: { type: string; controller: string }) => {
				return of(1).pipe(
					withLatestFrom(this._store.select(controller)),
					switchMap(([, latest]: [number, ITable<ISessionPlan, ISessionPlanCurrent>]) => {
						return this._service.setAssessmentLegend(data).pipe(
							mergeMap(() => {
								return [
									AssessmentLegendTableActions.SetTranslationSuccess(),
									this.getTableDataPending({
										controller,
										filter: latest.filter,
										columns: latest.columns,
									}),
								];
							}),
							catchError(() => {
								return of(AssessmentLegendTableActions.SetTranslationError());
							}),
						);
					}),
				);
			}),
		);
	});
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ITableState } from 'src/app/shared/table/table.reducer';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, mergeMap, catchError, map } from 'rxjs/operators';
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
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_CHANGES_ERROR,
	SAVE_GRID_CHANGES_SUCCESS,
} from 'src/app/shared/table/table.tokens';
import { SessionPlanTableActions } from './session-plan-table.actions';
import { SessionPlanTableSerivce } from './session-plan-table.service';
import { ISessionPlanCurrent } from './session-plan-popup/session-plan-popup.component';
import { ISessionPlan } from '../../../../../shared/interfaces/session-plan.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SessionPlansEffects extends TableEffects {
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
		_tableService: TableService,
		_store: Store<any>,
		private _service: SessionPlanTableSerivce,
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
			_tableService,
			_store,
			_toasterService,
		);
	}

	public reorderPlan$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(SessionPlanTableActions.ReorderPlanPending),
			switchMap(
				({
					controller,
					sessionPlanId,
					seriesPlanId,
					index,
					storePath,
				}: {
					sessionPlanId: string;
					seriesPlanId: string;
					controller: string;
					index: number;
					storePath: string;
				}) => {
					return of(1).pipe(
						withLatestFrom(this._store.select(storePath)),
						switchMap(([, latest]: [number, ITableState<ISessionPlan, ISessionPlanCurrent>]) => {
							return this._service.reorder(controller, { seriesPlanId, sessionPlanId, index }).pipe(
								mergeMap(() => {
									return [
										SessionPlanTableActions.ReorderPlanSuccess(),
										this.getTableDataPending({
											controller,
											filter: latest.filter,
											columns: latest.columns,
										}),
									];
								}),
								catchError(() => {
									return of(SessionPlanTableActions.ReorderPlanError());
								}),
							);
						}),
					);
				},
			),
		);
	});

	public linkSessionPlans$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(SessionPlanTableActions.LinkSessionPlansPending),
			switchMap(
				({
					controller,
					ids,
					seriesPlanId,
					link,
					storePath,
				}: {
					controller: string;
					ids: string[];
					seriesPlanId: string;
					link: boolean;
					storePath: string;
				}) => {
					return of(1).pipe(
						withLatestFrom(this._store.select(storePath)),
						switchMap(([, latest]: [number, ITableState<ISessionPlan, ISessionPlanCurrent>]) => {
							return this._service.link(ids, seriesPlanId, link).pipe(
								mergeMap(() => {
									return [
										SessionPlanTableActions.LinkSessionPlansSuccess(),
										this.getTableDataPending({
											controller,
											filter: latest.filter,
											columns: latest.columns,
										}),
									];
								}),
								catchError(() => {
									return of(SessionPlanTableActions.LinkSessionPlansError());
								}),
							);
						}),
					);
				},
			),
		);
	});

	public getCurrentTranslation$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(SessionPlanTableActions.GetCurrentTranslationSessionPlanPending),
			switchMap(({ sessionPlanId, languageId }: { sessionPlanId: string; languageId: string }) => {
				return this._service.getCurrentTransletionSessionPlan(sessionPlanId, languageId).pipe(
					map((currentTranslation: any) =>
						SessionPlanTableActions.GetCurrentTranslationSessionPlanSuccess({
							currentTranslation,
						}),
					),
					catchError(() => {
						return of(SessionPlanTableActions.GetCurrentTranslationSessionPlanError());
					}),
				);
			}),
		);
	});

	public setCurrentTranslation$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(SessionPlanTableActions.SetTranslationSessionPlanPending),
			switchMap(({ controller, ...item }: { controller: string }) => {
				return of(1).pipe(
					withLatestFrom(this._store.select(controller, 'table')),
					switchMap(([, latest]: [number, ITableState<ISessionPlan, ISessionPlanCurrent>]) => {
						return this._service.updateCurrentTransletionSessionPlan(item).pipe(
							mergeMap(() => {
								return [
									SessionPlanTableActions.SetTranslationSessionPlanSuccess(),
									this.getTableDataPending({
										controller,
										filter: latest.filter,
										columns: latest.columns,
									}),
								];
							}),
							catchError(() => {
								return of(SessionPlanTableActions.SetTranslationSessionPlanError());
							}),
						);
					}),
				);
			}),
		);
	});
}

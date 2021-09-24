/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IAssessmentQuestion } from 'src/app/shared/interfaces/assessment-question.interface';
import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, mergeMap, catchError, map } from 'rxjs/operators';
import { TableEffects } from 'src/app/shared/table/table.effect';
import { ITable } from 'src/app/shared/table/table.reducer';
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
	MAKE_DEFAULT_GRID_ERROR,
	MAKE_DEFAULT_GRID_PENDING,
	MAKE_DEFAULT_GRID_SUCCESS,
	RENAME_GRID_ERROR,
	RENAME_GRID_PENDING,
	RENAME_GRID_SUCCESS,
} from 'src/app/shared/table/table.tokens';
import { ToastrService } from 'ngx-toastr';
import { AssessmentQuestionTableActions } from './assessment-question-table.actions';
import { AssessmentQuestionTableSerivce } from './assessment-question-table.service';
import { IAssessmentTranslate } from './assessment-question-translate-popup/assessment-question-translate-popup.component';

@Injectable()
export class AssessmentQuestionTableEffects extends TableEffects {
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
		@Inject(MAKE_DEFAULT_GRID_PENDING) makeDefaultGridPending: any,
		@Inject(MAKE_DEFAULT_GRID_SUCCESS) makeDefaultGridSuccess: any,
		@Inject(MAKE_DEFAULT_GRID_ERROR) makeDefaultGridError: any,
		@Inject(RENAME_GRID_PENDING) renameGridPending: any,
		@Inject(RENAME_GRID_SUCCESS) renameGridSuccess: any,
		@Inject(RENAME_GRID_ERROR) renameGridError: any,
		_tableService: TableService,
		_store: Store<ITable<IAssessmentQuestion, IAssessmentQuestion>>,
		private _service: AssessmentQuestionTableSerivce,
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
			makeDefaultGridPending,
			makeDefaultGridSuccess,
			makeDefaultGridError,
			renameGridPending,
			renameGridSuccess,
			renameGridError,
			_tableService,
			_store,
			_toasterService,
		);
	}

	public reorderPlan$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AssessmentQuestionTableActions.ReorderAssessmentQuestionPending),
			switchMap(
				({
					controller,
					index,
					assessmentId,
					questionId,
				}: {
					assessmentId: string;
					questionId: string;
					controller: string;
					index: number;
				}) => {
					return of(1).pipe(
						withLatestFrom(this._store.select(controller, 'table')),
						switchMap(([, latest]: [number, ITable<IAssessmentQuestion, IAssessmentQuestion>]) => {
							return this._service.reorder(controller, { index, questionId, assessmentId }).pipe(
								mergeMap(() => {
									return [
										AssessmentQuestionTableActions.ReorderAssessmentQuestionSuccess(),
										this.getTableDataPending({
											controller,
											filter: latest.filter,
											columns: latest.columns,
										}),
									];
								}),
								catchError((error: string) => {
									return of(
										AssessmentQuestionTableActions.ReorderAssessmentQuestionError({
											error,
										}),
									);
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
			ofType(AssessmentQuestionTableActions.GetCurrentTranslationAssessmentQuestionPending),
			switchMap(({ questionId, languageId }: { questionId: string; languageId: string }) => {
				return this._service.getCurrentTransletion(questionId, languageId).pipe(
					map((currentTranslation: string) =>
						AssessmentQuestionTableActions.GetCurrentTranslationAssessmentQuestionSuccess({
							currentTranslation,
						}),
					),
					catchError(() => {
						return of(
							AssessmentQuestionTableActions.GetCurrentTranslationAssessmentQuestionError(),
						);
					}),
				);
			}),
		);
	});

	public updateCurrentTranslation$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AssessmentQuestionTableActions.UpdateCurrentTranslationAssessmentQuestionPending),
			switchMap(
				({
					questionId,
					languageId,
					currentTranslation,
					controller,
				}: {
					questionId: string;
					languageId: string;
					currentTranslation: IAssessmentTranslate;
					controller: string;
				}) => {
					return of(1).pipe(
						withLatestFrom(this._store.select(controller, 'table')),
						switchMap(([, latest]: [number, ITable<IAssessmentQuestion, IAssessmentQuestion>]) => {
							return this._service
								.updateCurrentTransletion(questionId, languageId, currentTranslation)
								.pipe(
									mergeMap(() => {
										return [
											AssessmentQuestionTableActions.UpdateCurrentTranslationAssessmentQuestionSuccess(),
											this.getTableDataPending({
												controller,
												filter: latest.filter,
												columns: latest.columns,
											}),
										];
									}),
									catchError(() => {
										return of(
											AssessmentQuestionTableActions.UpdateCurrentTranslationAssessmentQuestionError(),
										);
									}),
								);
						}),
					);
				},
			),
		);
	});
}

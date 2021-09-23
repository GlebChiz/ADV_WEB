import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';

import {
	GET_TABLE_DATA_PENDING,
	UPDATE_TABLE_STATE,
	DELETE_ITEM_TABLE_PENDING,
	CREATE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	DUBLICATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_ERROR,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_ERROR,
	GET_TABLE_DATA_SUCCESS,
	DELETE_ITEM_TABLE_SUCCESS,
	GET_CURRENT_ITEM_ERROR,
	GET_CURRENT_ITEM_SUCCESS,
	CREATE_ITEM_TABLE_SUCCESS,
	CREATE_ITEM_TABLE_ERROR,
	EDIT_ITEM_TABLE_SUCCESS,
	EDIT_ITEM_TABLE_ERROR,
	DUBLICATE_ITEM_TABLE_SUCCESS,
	DUBLICATE_ITEM_TABLE_ERROR,
	CLEAR_CURRENT_ITEM,
	SAVE_GRID_SETTINGS_PENDING,
	SAVE_GRID_SETTINGS_ERROR,
	SAVE_GRID_SETTINGS_SUCCESS,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_CHANGES_ERROR,
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

import { AssessmentComponent } from './assessment.component';
import { AssessmentTableComponent } from './assessment-table/assessment-table.component';
import { AssessmentTableActions } from './assessment-table/assessment-table.actions';
import { assessmentReducers } from './assessment-table/assessment-table.reducers';
import { SomeEffect } from './assessment-table/assessment-table.effects';
import { AssessmentTemplatePopupComponent } from './assessment-template/assessment-template-table/assessment-template-popup/assessment-template-popup.component';
import { AssessmentPopupComponent } from './assessment-table/assessment-popup/assessment-popup.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: AssessmentComponent,
			},
			{
				path: ':id',
				loadChildren: (): any =>
					import('./assessment-question/assessment-question.module').then(
						(m: any) => m.AssessmentQuestionModule,
					),
				data: {
					breadcrumb: 'Assessment Qestion',
				},
			},
		]),
		StoreModule.forFeature('assessment', assessmentReducers),
		EffectsModule.forFeature([SomeEffect]),
	],
	declarations: [
		AssessmentComponent,
		AssessmentTableComponent,
		AssessmentPopupComponent,
		AssessmentTemplatePopupComponent,
	],
	entryComponents: [],
	providers: [
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: AssessmentTableActions.GetAssessmentTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: AssessmentTableActions.GetAssessmentTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: AssessmentTableActions.GetAssessmentTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: AssessmentTableActions.UpdateAssessmentTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: AssessmentTableActions.DeleteAssessmentIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: AssessmentTableActions.DeleteAssessmentIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: AssessmentTableActions.DeleteAssessmentIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: AssessmentTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: AssessmentTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: AssessmentTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: AssessmentTableActions.CreateAssessmentIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: AssessmentTableActions.CreateAssessmentIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: AssessmentTableActions.CreateAssessmentIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: AssessmentTableActions.EditAssessmentIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: AssessmentTableActions.EditAssessmentIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: AssessmentTableActions.EditAssessmentIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: AssessmentTableActions.DublicateAssessmentIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: AssessmentTableActions.DublicateAssessmentIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: AssessmentTableActions.DublicateAssessmentIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: AssessmentTableActions.ClearCurrentAssessment,
		},
		{
			provide: SAVE_GRID_SETTINGS_PENDING,
			useValue: AssessmentTableActions.SaveGridSettingsPending,
		},
		{
			provide: SAVE_GRID_SETTINGS_ERROR,
			useValue: AssessmentTableActions.SaveGridSettingsError,
		},
		{
			provide: SAVE_GRID_SETTINGS_SUCCESS,
			useValue: AssessmentTableActions.SaveGridSettingsSuccess,
		},
		{
			provide: SAVE_GRID_CHANGES_PENDING,
			useValue: AssessmentTableActions.SaveGridChnagesPending,
		},
		{
			provide: SAVE_GRID_CHANGES_ERROR,
			useValue: AssessmentTableActions.SaveGridChnagesError,
		},
		{
			provide: SAVE_GRID_CHANGES_SUCCESS,
			useValue: AssessmentTableActions.SaveGridChnagesSuccess,
		},
		{
			provide: GET_GRID_SETTINGS_PENDING,
			useValue: AssessmentTableActions.GetGridSettingsPending,
		},
		{
			provide: GET_GRID_SETTINGS_ERROR,
			useValue: AssessmentTableActions.GetGridSettingsError,
		},
		{
			provide: GET_GRID_SETTINGS_SUCCESS,
			useValue: AssessmentTableActions.GetGridSettingsSuccess,
		},
		{
			provide: MAKE_DEFAULT_GRID_PENDING,
			useValue: AssessmentTableActions.MakeDefaultGridPending,
		},
		{
			provide: MAKE_DEFAULT_GRID_ERROR,
			useValue: AssessmentTableActions.MakeDefaultGridError,
		},
		{
			provide: MAKE_DEFAULT_GRID_SUCCESS,
			useValue: AssessmentTableActions.MakeDefaultGridSuccess,
		},
		{
			provide: RENAME_GRID_PENDING,
			useValue: AssessmentTableActions.RenameGridPending,
		},
		{
			provide: RENAME_GRID_ERROR,
			useValue: AssessmentTableActions.RenameGridError,
		},
		{
			provide: RENAME_GRID_SUCCESS,
			useValue: AssessmentTableActions.RenameGridSuccess,
		},
	],
})
export class AssessmentModule {}

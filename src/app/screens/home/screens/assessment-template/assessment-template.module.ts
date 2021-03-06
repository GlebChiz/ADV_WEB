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
} from 'src/app/shared/table/table.tokens';

import { AssessmentTemplateComponent } from './assessment-template.component';
import { assessmentTemplateTableReducers } from './assessment-template-table/assessment-template-table.reducers';
import { AssessmentTemplateTableComponent } from './assessment-template-table/assessment-template-table.component';
import { SomeEffect } from './assessment-template-table/assessment-template-table.effects';
import { AssessmentTemplateTableActions } from './assessment-template-table/assessment-template-table.actions';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: AssessmentTemplateComponent,
			},
		]),
		StoreModule.forFeature('assessmentTemplateTable', assessmentTemplateTableReducers),
		EffectsModule.forFeature([SomeEffect]),
	],
	declarations: [AssessmentTemplateComponent, AssessmentTemplateTableComponent],
	entryComponents: [],
	providers: [
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: AssessmentTemplateTableActions.GetAssessmentTemplateTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: AssessmentTemplateTableActions.GetAssessmentTemplateTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: AssessmentTemplateTableActions.GetAssessmentTemplateTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: AssessmentTemplateTableActions.UpdateAssessmentTemplateTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: AssessmentTemplateTableActions.DeleteAssessmentTemplateIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: AssessmentTemplateTableActions.DeleteAssessmentTemplateIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: AssessmentTemplateTableActions.DeleteAssessmentTemplateIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: AssessmentTemplateTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: AssessmentTemplateTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: AssessmentTemplateTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: AssessmentTemplateTableActions.CreateAssessmentTemplateIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: AssessmentTemplateTableActions.CreateAssessmentTemplateIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: AssessmentTemplateTableActions.CreateAssessmentTemplateIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: AssessmentTemplateTableActions.EditAssessmentTemplateIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: AssessmentTemplateTableActions.EditAssessmentTemplateIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: AssessmentTemplateTableActions.EditAssessmentTemplateIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: AssessmentTemplateTableActions.DublicateAssessmentTemplateIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: AssessmentTemplateTableActions.DublicateAssessmentTemplateIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: AssessmentTemplateTableActions.DublicateAssessmentTemplateIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: AssessmentTemplateTableActions.ClearCurrentAssessmentTemplate,
		},
	],
})
export class AssessmentTemplateModuleModule {}

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

import { AssessmentQuestionComponent } from './assessment-question.component';
import { assessmentQuestionTableReducers } from './assessment-question-table/assessment-question-table.reducers';
import { AssessmentQuestionTableEffects } from './assessment-question-table/assessment-question-table.effects';
import { AssessmentQuestionTableComponent } from './assessment-question-table/assessment-question-table.component';
import { AssessmentQuestionTableActions } from './assessment-question-table/assessment-question-table.actions';
import { AssessmentQuestionTableSerivce } from './assessment-question-table/assessment-question-table.service';
import { AssessmentQuestionPopupComponent } from './assessment-question-table/assessment-question-popup/assessment-question-popup.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: AssessmentQuestionComponent,
			},
		]),
		StoreModule.forFeature('assessmentquestionTable', assessmentQuestionTableReducers),
		EffectsModule.forFeature([AssessmentQuestionTableEffects]),
	],
	declarations: [
		AssessmentQuestionComponent,
		AssessmentQuestionTableComponent,
		AssessmentQuestionPopupComponent,
	],
	entryComponents: [],
	providers: [
		AssessmentQuestionTableSerivce,
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: AssessmentQuestionTableActions.GetAssessmentQuestionTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: AssessmentQuestionTableActions.GetAssessmentQuestionTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: AssessmentQuestionTableActions.GetAssessmentQuestionTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: AssessmentQuestionTableActions.UpdateAssessmentQuestionTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: AssessmentQuestionTableActions.DeleteAssessmentQuestionIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: AssessmentQuestionTableActions.DeleteAssessmentQuestionIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: AssessmentQuestionTableActions.DeleteAssessmentQuestionIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: AssessmentQuestionTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: AssessmentQuestionTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: AssessmentQuestionTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: AssessmentQuestionTableActions.CreateAssessmentQuestionIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: AssessmentQuestionTableActions.CreateAssessmentQuestionIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: AssessmentQuestionTableActions.CreateAssessmentQuestionIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: AssessmentQuestionTableActions.EditAssessmentQuestionIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: AssessmentQuestionTableActions.EditAssessmentQuestionIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: AssessmentQuestionTableActions.EditAssessmentQuestionIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: AssessmentQuestionTableActions.DublicateAssessmentQuestionIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: AssessmentQuestionTableActions.DublicateAssessmentQuestionIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: AssessmentQuestionTableActions.DublicateAssessmentQuestionIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: AssessmentQuestionTableActions.ClearCurrentAssessmentQuestion,
		},
	],
})
export class AssessmentQuestionModule {}

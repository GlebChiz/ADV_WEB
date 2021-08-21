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

import { AssessmentComponent } from './assessment.component';
import { AssessmentTableComponent } from './assessment-table/assessment-table.component';
import { AssessmentTableActions } from './assessment-table/assessment-table.actions';
import { assessmentTableReducers } from './assessment-table/assessment-table.reducers';
import { SomeEffect } from './assessment-table/assessment-table.effects';
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
		StoreModule.forFeature('assessmentTable', assessmentTableReducers),
		EffectsModule.forFeature([SomeEffect]),
	],
	declarations: [AssessmentComponent, AssessmentTableComponent, AssessmentPopupComponent],
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
	],
})
export class AssessmentModule {}

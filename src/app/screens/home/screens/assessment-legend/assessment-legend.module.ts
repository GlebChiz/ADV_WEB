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
import { AssessmentTranslatedPopupComponent } from './assessment-legend-table/assessmen-translated-popup/assessment-translated-popup.component';
import { AssessmentLegendTableActions } from './assessment-legend-table/assessment-legend-table.actions';
import { AssessmentLegendTableComponent } from './assessment-legend-table/assessment-legend-table.component';
import { AssessmentLegendEffect } from './assessment-legend-table/assessment-legend-table.effects';
import { assessmentLegendReducers } from './assessment-legend-table/assessment-legend-table.reducers';
import { AssessmentLegendService } from './assessment-legend-table/assessment-legend-table.service';
import { AssessmentLegendComponent } from './assessment-legend.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: AssessmentLegendComponent,
			},
		]),
		StoreModule.forFeature('assessmentLegendTable', assessmentLegendReducers),
		EffectsModule.forFeature([AssessmentLegendEffect]),
	],
	declarations: [
		AssessmentLegendComponent,
		AssessmentLegendTableComponent,
		AssessmentTranslatedPopupComponent,
	],
	entryComponents: [],
	providers: [
		AssessmentLegendService,
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: AssessmentLegendTableActions.GetAssessmentLegendTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: AssessmentLegendTableActions.GetAssessmentLegendTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: AssessmentLegendTableActions.GetAssessmentLegendTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: AssessmentLegendTableActions.UpdateAssessmentLegendTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: AssessmentLegendTableActions.DeleteAssessmentLegendIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: AssessmentLegendTableActions.DeleteAssessmentLegendIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: AssessmentLegendTableActions.DeleteAssessmentLegendIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: AssessmentLegendTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: AssessmentLegendTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: AssessmentLegendTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: AssessmentLegendTableActions.CreateAssessmentLegendIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: AssessmentLegendTableActions.CreateAssessmentLegendIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: AssessmentLegendTableActions.CreateAssessmentLegendIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: AssessmentLegendTableActions.EditAssessmentLegendIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: AssessmentLegendTableActions.EditAssessmentLegendIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: AssessmentLegendTableActions.EditAssessmentLegendIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: AssessmentLegendTableActions.DublicateAssessmentLegendIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: AssessmentLegendTableActions.DublicateAssessmentLegendIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: AssessmentLegendTableActions.DublicateAssessmentLegendIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: AssessmentLegendTableActions.ClearCurrentAssessmentLegend,
		},
	],
})
export class AssessmentLegendModuleModule {}

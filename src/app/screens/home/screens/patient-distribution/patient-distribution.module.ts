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
import { SupervisorForGroupPopupComponent } from './patient-distribution-group-popups/supervisor-for-group-popup/supervisor-for-group-popup.component';
import { PatientDistributionPopupComponent } from './patient-distribution-table/patient-distribution-popup/patient-distribution-popup.component';
import { PatientDistributionTableActions } from './patient-distribution-table/patient-distribution-table.actions';
import { PatientDistributionTableComponent } from './patient-distribution-table/patient-distribution-table.component';
import { SomeEffect } from './patient-distribution-table/patient-distribution-table.effects';
import { patientDistributionTableReducers } from './patient-distribution-table/patient-distribution-table.reducers';
import { PatientDistributionComponent } from './patient-distribution.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: PatientDistributionComponent,
			},
		]),
		StoreModule.forFeature('patientSupervisorTable', patientDistributionTableReducers),
		EffectsModule.forFeature([SomeEffect]),
	],
	declarations: [
		PatientDistributionComponent,
		PatientDistributionTableComponent,
		PatientDistributionPopupComponent,
		SupervisorForGroupPopupComponent,
	],
	entryComponents: [],
	providers: [
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: PatientDistributionTableActions.GetPatientDistributionTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: PatientDistributionTableActions.GetPatientDistributionTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: PatientDistributionTableActions.GetPatientDistributionTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: PatientDistributionTableActions.UpdatePatientDistributionTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: PatientDistributionTableActions.DeletePatientDistributionIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: PatientDistributionTableActions.DeletePatientDistributionIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: PatientDistributionTableActions.DeletePatientDistributionIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: PatientDistributionTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: PatientDistributionTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: PatientDistributionTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: PatientDistributionTableActions.CreatePatientDistributionIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: PatientDistributionTableActions.CreatePatientDistributionIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: PatientDistributionTableActions.CreatePatientDistributionIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: PatientDistributionTableActions.EditPatientDistributionIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: PatientDistributionTableActions.EditPatientDistributionIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: PatientDistributionTableActions.EditPatientDistributionIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: PatientDistributionTableActions.DublicatePatientDistributionIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: PatientDistributionTableActions.DublicatePatientDistributionIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: PatientDistributionTableActions.DublicatePatientDistributionIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: PatientDistributionTableActions.ClearCurrentPatientDistribution,
		},
	],
})
export class PatientDistributionModule {}

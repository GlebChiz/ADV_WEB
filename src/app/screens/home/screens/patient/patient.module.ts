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
	SAVE_GRID_SETTINGS_PENDING,
	SAVE_GRID_SETTINGS_ERROR,
	SAVE_GRID_SETTINGS_SUCCESS,
	SAVE_GRID_CHANGES_ERROR,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_CHANGES_SUCCESS,
} from 'src/app/shared/table/table.tokens';

import { PatientTableActions } from './patient-table/patient-table.actions';
import { PatientTableComponent } from './patient-table/patient-table.component';
import { PatientEffect } from './patient-table/patient-table.effects';
import { patientReducers } from './patient-table/patient-table.reducers';
import { PatientService } from './patient-table/patient-table.service';
import { PatientComponent } from './patient.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: PatientComponent,
			},
			{
				path: ':id',
				loadChildren: (): any =>
					import('./patient-details/patient-details.module').then(
						(m: any) => m.PatientDetailsModule,
					),
				data: {
					breadcrumb: 'Single',
				},
			},
			{
				path: ':id/insurances',
				loadChildren: (): any =>
					import('./patient-details/insurance/insurance.module').then(
						(m: any) => m.InsuranceModule,
					),
				data: {
					breadcrumb: 'Insurance',
				},
			},
		]),
		StoreModule.forFeature('patient', patientReducers),
		EffectsModule.forFeature([PatientEffect]),
	],
	declarations: [PatientComponent, PatientTableComponent],
	entryComponents: [],
	providers: [
		PatientService,
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: PatientTableActions.GetPatientTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: PatientTableActions.GetPatientTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: PatientTableActions.GetPatientTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: PatientTableActions.UpdatePatientTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: PatientTableActions.DeletePatientIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: PatientTableActions.DeletePatientIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: PatientTableActions.DeletePatientIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: PatientTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: PatientTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: PatientTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: PatientTableActions.CreatePatientIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: PatientTableActions.CreatePatientIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: PatientTableActions.CreatePatientIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: PatientTableActions.EditPatientIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: PatientTableActions.EditPatientIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: PatientTableActions.EditPatientIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: PatientTableActions.DublicatePatientIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: PatientTableActions.DublicatePatientIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: PatientTableActions.DublicatePatientIemTableError,
		},
		{
			provide: SAVE_GRID_SETTINGS_PENDING,
			useValue: PatientTableActions.SaveGridSettingsPending,
		},
		{
			provide: SAVE_GRID_SETTINGS_ERROR,
			useValue: PatientTableActions.SaveGridSettingsError,
		},
		{
			provide: SAVE_GRID_SETTINGS_SUCCESS,
			useValue: PatientTableActions.SaveGridSettingsSuccess,
		},
		{
			provide: SAVE_GRID_CHANGES_PENDING,
			useValue: PatientTableActions.SaveGridChnagesPending,
		},
		{
			provide: SAVE_GRID_CHANGES_ERROR,
			useValue: PatientTableActions.SaveGridChnagesError,
		},
		{
			provide: SAVE_GRID_CHANGES_SUCCESS,
			useValue: PatientTableActions.SaveGridChnagesSuccess,
		},
	],
})
export class PatientModule {}

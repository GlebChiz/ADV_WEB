import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModel } from 'src/app/shared/shared.module';

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
} from 'src/app/shared/table/table.tokens';
import { ModalityTableActions } from './modality-table/modality-table.actions';
import { ModalityTableComponent } from './modality-table/modality-table.component';
import { SomeEffect } from './modality-table/modality-table.effects';
import { modalityTableReducers } from './modality-table/modality-table.reducers';
import { ModalityComponent } from './modality.component';

@NgModule({
	imports: [
		SharedModel,
		RouterModule.forChild([
			{
				path: '',
				component: ModalityComponent,
			},
		]),
		StoreModule.forFeature('modalityTable', modalityTableReducers),
		EffectsModule.forFeature([SomeEffect]),
	],
	declarations: [ModalityComponent, ModalityTableComponent],
	entryComponents: [],
	providers: [
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: ModalityTableActions.GetModalityTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: ModalityTableActions.GetModalityTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: ModalityTableActions.GetModalityTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: ModalityTableActions.UpdateModalityTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: ModalityTableActions.DeleteModalityIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: ModalityTableActions.DeleteModalityIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: ModalityTableActions.DeleteModalityIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: ModalityTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: ModalityTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: ModalityTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: ModalityTableActions.CreateModalityIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: ModalityTableActions.CreateModalityIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: ModalityTableActions.CreateModalityIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: ModalityTableActions.EditModalityIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: ModalityTableActions.EditModalityIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: ModalityTableActions.EditModalityIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: ModalityTableActions.DublicateModalityIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: ModalityTableActions.DublicateModalityIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: ModalityTableActions.DublicateModalityIemTableError,
		},
	],
})
export class ModalityModule {}

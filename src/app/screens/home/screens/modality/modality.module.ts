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
import { ModalityPopupComponent } from './modality-table/modality-popup/modality-popup.component';
import { ModalityTableActions } from './modality-table/modality-table.actions';
import { ModalityTableComponent } from './modality-table/modality-table.component';
import { SomeEffect } from './modality-table/modality-table.effects';
import { modalityReducers } from './modality-table/modality-table.reducers';
import { ModalityComponent } from './modality.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: ModalityComponent,
			},
		]),
		StoreModule.forFeature('modality', modalityReducers),
		EffectsModule.forFeature([SomeEffect]),
	],
	declarations: [ModalityComponent, ModalityTableComponent, ModalityPopupComponent],
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
			// TODO: seems to not be used. could be deleted therefore.
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
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: ModalityTableActions.ClearCurrentModality,
		},
		{
			provide: SAVE_GRID_SETTINGS_PENDING,
			useValue: ModalityTableActions.SaveGridSettingsPending,
		},
		{
			provide: SAVE_GRID_SETTINGS_ERROR,
			useValue: ModalityTableActions.SaveGridSettingsError,
		},
		{
			provide: SAVE_GRID_SETTINGS_SUCCESS,
			useValue: ModalityTableActions.SaveGridSettingsSuccess,
		},
		{
			provide: SAVE_GRID_CHANGES_PENDING,
			useValue: ModalityTableActions.SaveGridChnagesPending,
		},
		{
			provide: SAVE_GRID_CHANGES_ERROR,
			useValue: ModalityTableActions.SaveGridChnagesError,
		},
		{
			provide: SAVE_GRID_CHANGES_SUCCESS,
			useValue: ModalityTableActions.SaveGridChnagesSuccess,
		},
		{
			provide: GET_GRID_SETTINGS_PENDING,
			useValue: ModalityTableActions.GetGridSettingsPending,
		},
		{
			provide: GET_GRID_SETTINGS_ERROR,
			useValue: ModalityTableActions.GetGridSettingsError,
		},
		{
			provide: GET_GRID_SETTINGS_SUCCESS,
			useValue: ModalityTableActions.GetGridSettingsSuccess,
		},
		{
			provide: MAKE_DEFAULT_GRID_PENDING,
			useValue: ModalityTableActions.MakeDefaultGridPending,
		},
		{
			provide: MAKE_DEFAULT_GRID_ERROR,
			useValue: ModalityTableActions.MakeDefaultGridError,
		},
		{
			provide: MAKE_DEFAULT_GRID_SUCCESS,
			useValue: ModalityTableActions.MakeDefaultGridSuccess,
		},
		{
			provide: RENAME_GRID_PENDING,
			useValue: ModalityTableActions.RenameGridPending,
		},
		{
			provide: RENAME_GRID_ERROR,
			useValue: ModalityTableActions.RenameGridError,
		},
		{
			provide: RENAME_GRID_SUCCESS,
			useValue: ModalityTableActions.RenameGridSuccess,
		},
	],
})
export class ModalityModule {}

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
	SAVE_GRID_CHANGES_SUCCESS,
	SAVE_GRID_CHANGES_ERROR,
	GET_GRID_SETTINGS_PENDING,
	GET_GRID_SETTINGS_SUCCESS,
	GET_GRID_SETTINGS_ERROR
} from 'src/app/shared/table/table.tokens';
import { UsersManagerPopupComponent } from './users-manager-table/users-manager-popup/users-manager-popup.component';
import { UsersManagerTableActions } from './users-manager-table/users-manager-table.actions';
import { UsersManagerTableComponent } from './users-manager-table/users-manager-table.component';
import { SomeEffect } from './users-manager-table/users-manager-table.effects';
import { usersReducers } from './users-manager-table/users-manager-table.reducers';
import { UsersManagerComponent } from './users-manager.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: UsersManagerComponent,
			},
		]),
		StoreModule.forFeature('user', usersReducers),
		EffectsModule.forFeature([SomeEffect]),
	],
	declarations: [UsersManagerComponent, UsersManagerTableComponent, UsersManagerPopupComponent],
	entryComponents: [],
	providers: [
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: UsersManagerTableActions.GetUserTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: UsersManagerTableActions.GetUserTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: UsersManagerTableActions.GetUserTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: UsersManagerTableActions.UpdateUserTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: UsersManagerTableActions.DeleteUserIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: UsersManagerTableActions.DeleteUserIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: UsersManagerTableActions.DeleteUserIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: UsersManagerTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: UsersManagerTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: UsersManagerTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: UsersManagerTableActions.CreateUserIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: UsersManagerTableActions.CreateUserIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: UsersManagerTableActions.CreateUserIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: UsersManagerTableActions.EditUserIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: UsersManagerTableActions.EditUserIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: UsersManagerTableActions.EditUserIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: UsersManagerTableActions.DublicateUserIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: UsersManagerTableActions.DublicateUserIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: UsersManagerTableActions.DublicateUserIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: UsersManagerTableActions.ClearCurrentUser,
		},
		{
			provide: SAVE_GRID_SETTINGS_PENDING,
			useValue: UsersManagerTableActions.SaveGridSettingsPending,
		},
		{
			provide: SAVE_GRID_SETTINGS_ERROR,
			useValue: UsersManagerTableActions.SaveGridSettingsError,
		},
		{
			provide: SAVE_GRID_SETTINGS_SUCCESS,
			useValue: UsersManagerTableActions.SaveGridSettingsSuccess,
		},
		{
			provide: SAVE_GRID_CHANGES_PENDING,
			useValue: UsersManagerTableActions.SaveGridChangesPending,
		},
		{
			provide: SAVE_GRID_CHANGES_SUCCESS,
			useValue: UsersManagerTableActions.SaveGridChangesSuccess,
		},
		{
			provide: SAVE_GRID_CHANGES_ERROR,
			useValue: UsersManagerTableActions.SaveGridChangesError,
		},
		{
			provide: GET_GRID_SETTINGS_PENDING,
			useValue: UsersManagerTableActions.GetGridSettingsPending,
		},
		{
			provide: GET_GRID_SETTINGS_ERROR,
			useValue: UsersManagerTableActions.GetGridSettingsError,
		},
		{
			provide: GET_GRID_SETTINGS_SUCCESS,
			useValue: UsersManagerTableActions.GetGridSettingsSuccess,
		},
	],
})
export class UsersManagerModule {}

import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import {
	CLEAR_CURRENT_ITEM,
	CREATE_ITEM_TABLE_ERROR,
	CREATE_ITEM_TABLE_PENDING,
	CREATE_ITEM_TABLE_SUCCESS,
	DELETE_ITEM_TABLE_ERROR,
	DELETE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_SUCCESS,
	DUBLICATE_ITEM_TABLE_ERROR,
	DUBLICATE_ITEM_TABLE_PENDING,
	DUBLICATE_ITEM_TABLE_SUCCESS,
	EDIT_ITEM_TABLE_ERROR,
	EDIT_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_SUCCESS,
	GET_CURRENT_ITEM_ERROR,
	GET_CURRENT_ITEM_PENDING,
	GET_CURRENT_ITEM_SUCCESS,
	GET_TABLE_DATA_ERROR,
	GET_TABLE_DATA_PENDING,
	GET_TABLE_DATA_SUCCESS,
	SAVE_GRID_CHANGES_ERROR,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_CHANGES_SUCCESS,
	SAVE_GRID_SETTINGS_ERROR,
	SAVE_GRID_SETTINGS_PENDING,
	SAVE_GRID_SETTINGS_SUCCESS,
	UPDATE_TABLE_STATE,
} from 'src/app/shared/table/table.tokens';

import { LocationDetailsComponent } from './location-details.component';
import { RoomTableActions } from './room-table/room-table.actions';
import { RoomTableComponent } from './room-table/room-table.component';
import { SomeEffect } from './room-table/room-table.effects';

import { roomReducers } from './room-table/room-table.reducers';
import { RoomPopupComponent } from './room-table/room-popup/room-popup.component';

@NgModule({
	imports: [
		SharedModule,
		StoreModule.forFeature('room', roomReducers),
		EffectsModule.forFeature([SomeEffect]),
		RouterModule.forChild([
			{
				path: '',
				component: LocationDetailsComponent,
			},
		]),
	],
	declarations: [LocationDetailsComponent, RoomTableComponent, RoomPopupComponent],
	providers: [
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: RoomTableActions.GetRoomTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: RoomTableActions.GetRoomTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: RoomTableActions.GetRoomTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: RoomTableActions.UpdateRoomTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: RoomTableActions.DeleteRoomIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: RoomTableActions.DeleteRoomIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: RoomTableActions.DeleteRoomIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: RoomTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: RoomTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: RoomTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: RoomTableActions.CreateRoomIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: RoomTableActions.CreateRoomIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: RoomTableActions.CreateRoomIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: RoomTableActions.EditRoomIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: RoomTableActions.EditRoomIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: RoomTableActions.EditRoomIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: RoomTableActions.DublicateRoomIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: RoomTableActions.DublicateRoomIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: RoomTableActions.DublicateRoomIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: RoomTableActions.ClearCurrentRoom,
		},
		{
			provide: SAVE_GRID_SETTINGS_PENDING,
			useValue: RoomTableActions.SaveGridSettingsPending,
		},
		{
			provide: SAVE_GRID_SETTINGS_ERROR,
			useValue: RoomTableActions.SaveGridSettingsError,
		},
		{
			provide: SAVE_GRID_SETTINGS_SUCCESS,
			useValue: RoomTableActions.SaveGridSettingsSuccess,
		},
		{
			provide: SAVE_GRID_CHANGES_PENDING,
			useValue: RoomTableActions.SaveGridChnagesPending,
		},
		{
			provide: SAVE_GRID_CHANGES_ERROR,
			useValue: RoomTableActions.SaveGridChnagesError,
		},
		{
			provide: SAVE_GRID_CHANGES_SUCCESS,
			useValue: RoomTableActions.SaveGridChnagesSuccess,
		},
	],
})
export class LocationDetailsModule {}

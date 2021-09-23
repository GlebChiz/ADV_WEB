import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import {
	GET_TABLE_DATA_PENDING,
	UPDATE_TABLE_STATE,
	DELETE_ITEM_TABLE_PENDING,
	CREATE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	DUBLICATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_ERROR,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_SUCCESS,
	GET_TABLE_DATA_ERROR,
	DELETE_ITEM_TABLE_SUCCESS,
	GET_CURRENT_ITEM_ERROR,
	GET_CURRENT_ITEM_SUCCESS,
	CREATE_ITEM_TABLE_ERROR,
	CREATE_ITEM_TABLE_SUCCESS,
	EDIT_ITEM_TABLE_ERROR,
	EDIT_ITEM_TABLE_SUCCESS,
	DUBLICATE_ITEM_TABLE_ERROR,
	DUBLICATE_ITEM_TABLE_SUCCESS,
	CLEAR_CURRENT_ITEM,
	SAVE_GRID_SETTINGS_PENDING,
	SAVE_GRID_SETTINGS_ERROR,
	SAVE_GRID_SETTINGS_SUCCESS,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_CHANGES_ERROR,
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
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationComponent } from './location.component';
import { locationReducers } from './location-table/location-table.reducers';
import { LocationPopupComponent } from './location-table/location-popup/location-popup.component';
import { LocationTableComponent } from './location-table/location-table.component';
import { LocationTableActions } from './location-table/location-table.actions';
import { LocationEffects } from './location-table/location-table.effects';
import { LocationService } from './location-table/location-table.service';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: LocationComponent,
			},
			{
				path: ':id',
				loadChildren: (): any =>
					import('./location-details/location-details.module').then(
						(m: any) => m.LocationDetailsModule,
					),
				data: {
					breadcrumb: 'Single',
				},
			},
		]),
		StoreModule.forFeature('location', locationReducers),
		EffectsModule.forFeature([LocationEffects]),
	],
	declarations: [LocationComponent, LocationTableComponent, LocationPopupComponent],
	entryComponents: [],
	providers: [
		LocationService,
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: LocationTableActions.GetLocationTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: LocationTableActions.GetLocationTableDataSuccess,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: LocationTableActions.GetLocationTableDataError,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: LocationTableActions.UpdateLocationTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: LocationTableActions.DeleteLocationIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: LocationTableActions.DeleteLocationIemTablePending,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: LocationTableActions.DeleteLocationIemTableSuccess,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: LocationTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: LocationTableActions.GetCurrentItemSuccess,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: LocationTableActions.GetCurrentItemError,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: LocationTableActions.CreateLocationIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: LocationTableActions.CreateLocationIemTableError,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: LocationTableActions.CreateLocationIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: LocationTableActions.EditLocationIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: LocationTableActions.EditLocationIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: LocationTableActions.EditLocationIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: LocationTableActions.DublicateLocationIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: LocationTableActions.DublicateLocationIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: LocationTableActions.DublicateLocationIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: LocationTableActions.ClearCurrentLocation,
		},
		{
			provide: SAVE_GRID_SETTINGS_PENDING,
			useValue: LocationTableActions.SaveGridSettingsPending,
		},
		{
			provide: SAVE_GRID_SETTINGS_ERROR,
			useValue: LocationTableActions.SaveGridSettingsError,
		},
		{
			provide: SAVE_GRID_SETTINGS_SUCCESS,
			useValue: LocationTableActions.SaveGridSettingsSuccess,
		},
		{
			provide: SAVE_GRID_CHANGES_PENDING,
			useValue: LocationTableActions.SaveGridChnagesPending,
		},
		{
			provide: SAVE_GRID_CHANGES_ERROR,
			useValue: LocationTableActions.SaveGridChnagesError,
		},
		{
			provide: SAVE_GRID_CHANGES_SUCCESS,
			useValue: LocationTableActions.SaveGridChnagesSuccess,
		},
		{
			provide: GET_GRID_SETTINGS_PENDING,
			useValue: LocationTableActions.GetGridSettingsPending,
		},
		{
			provide: GET_GRID_SETTINGS_ERROR,
			useValue: LocationTableActions.GetGridSettingsError,
		},
		{
			provide: GET_GRID_SETTINGS_SUCCESS,
			useValue: LocationTableActions.GetGridSettingsSuccess,
		},
		{
			provide: MAKE_DEFAULT_GRID_PENDING,
			useValue: LocationTableActions.MakeDefaultGridPending,
		},
		{
			provide: MAKE_DEFAULT_GRID_ERROR,
			useValue: LocationTableActions.MakeDefaultGridError,
		},
		{
			provide: MAKE_DEFAULT_GRID_SUCCESS,
			useValue: LocationTableActions.MakeDefaultGridSuccess,
		},
		{
			provide: RENAME_GRID_PENDING,
			useValue: LocationTableActions.RenameGridPending,
		},
		{
			provide: RENAME_GRID_ERROR,
			useValue: LocationTableActions.RenameGridError,
		},
		{
			provide: RENAME_GRID_SUCCESS,
			useValue: LocationTableActions.RenameGridSuccess,
		},
	],
})
export class LocationModule {}

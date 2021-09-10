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
} from 'src/app/shared/table/table.tokens';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationComponent } from './location.component';
import { locationReducers } from './location-table/location-table.reducers';
import { LocationPopupComponent } from './location-table/location-popup/location-popup.component';
import { LocationTableComponent } from './location-table/location-table.component';
import { LocationTableActions } from './location-table/location-table.actions';
import { SomeEffect } from './location-table/location-table.effects';

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
		EffectsModule.forFeature([SomeEffect]),
	],
	declarations: [LocationComponent, LocationTableComponent, LocationPopupComponent],
	entryComponents: [],
	providers: [
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
	],
})
export class LocationModule {}

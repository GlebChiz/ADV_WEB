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
import { PublicSnipitComponent } from './public-snipit.component';
import { PublicSnipitTableActions } from './public-snipit-table/public-snipit-table.actions';
import { PublicSnipitTableComponent } from './public-snipit-table/public-snipit-table.component';
import { SomeEffect } from './public-snipit-table/public-snipit-table.effects';
import { publicSnipitTableReducers } from './public-snipit-table/public-snipit-table.reducers';
import { PublicSnipitPopupComponent } from './public-snipit-table/public-snipit-popup/public-snipit-popup.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: PublicSnipitComponent,
			},
			{
				path: ':id',
				loadChildren: (): any =>
					import('./public-snipit-details/public-snipit-details.module').then(
						(m: any) => m.PublicSnipitDetailsModule,
					),
				data: {
					breadcrumb: 'Singleasdasd',
				},
			},
		]),
		StoreModule.forFeature('publicsnipitTable', publicSnipitTableReducers),
		EffectsModule.forFeature([SomeEffect]),
	],
	declarations: [PublicSnipitComponent, PublicSnipitTableComponent, PublicSnipitPopupComponent],
	entryComponents: [],
	providers: [
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: PublicSnipitTableActions.GetPublicSnipitTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: PublicSnipitTableActions.GetPublicSnipitTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: PublicSnipitTableActions.GetPublicSnipitTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: PublicSnipitTableActions.UpdatePublicSnipitTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: PublicSnipitTableActions.DeletePublicSnipitIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: PublicSnipitTableActions.DeletePublicSnipitIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: PublicSnipitTableActions.DeletePublicSnipitIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: PublicSnipitTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: PublicSnipitTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: PublicSnipitTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: PublicSnipitTableActions.CreatePublicSnipitIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: PublicSnipitTableActions.CreatePublicSnipitIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: PublicSnipitTableActions.CreatePublicSnipitIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: PublicSnipitTableActions.EditPublicSnipitIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: PublicSnipitTableActions.EditPublicSnipitIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: PublicSnipitTableActions.EditPublicSnipitIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: PublicSnipitTableActions.DublicatePublicSnipitIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: PublicSnipitTableActions.DublicatePublicSnipitIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: PublicSnipitTableActions.DublicatePublicSnipitIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: PublicSnipitTableActions.ClearCurrentPublicSnipit,
		},
	],
})
export class PublicSnipitModule {}

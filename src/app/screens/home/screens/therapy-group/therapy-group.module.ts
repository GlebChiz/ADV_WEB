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
import { TherapyGroupTableActions } from './therapy-group-table/therapy-group-table.actions';
import { TherapyGroupTableComponent } from './therapy-group-table/therapy-group-table.component';
import { SomeEffect } from './therapy-group-table/therapy-group-table.effects';
import { therapyGroupTableReducers } from './therapy-group-table/therapy-group-table.reducers';
import { TherapyGroupComponent } from './therapy-group.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: TherapyGroupComponent,
			},
		]),
		StoreModule.forFeature('therapyGroupTable', therapyGroupTableReducers),
		EffectsModule.forFeature([SomeEffect]),
	],
	declarations: [TherapyGroupComponent, TherapyGroupTableComponent],
	entryComponents: [],
	providers: [
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: TherapyGroupTableActions.GetTherapyGroupTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: TherapyGroupTableActions.GetTherapyGroupTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: TherapyGroupTableActions.GetTherapyGroupTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: TherapyGroupTableActions.UpdateTherapyGroupTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: TherapyGroupTableActions.DeleteTherapyGroupIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: TherapyGroupTableActions.DeleteTherapyGroupIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: TherapyGroupTableActions.DeleteTherapyGroupIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: TherapyGroupTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: TherapyGroupTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: TherapyGroupTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: TherapyGroupTableActions.CreateTherapyGroupIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: TherapyGroupTableActions.CreateTherapyGroupIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: TherapyGroupTableActions.CreateTherapyGroupIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: TherapyGroupTableActions.EditTherapyGroupIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: TherapyGroupTableActions.EditTherapyGroupIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: TherapyGroupTableActions.EditTherapyGroupIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: TherapyGroupTableActions.DublicateTherapyGroupIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: TherapyGroupTableActions.DublicateTherapyGroupIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: TherapyGroupTableActions.DublicateTherapyGroupIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: TherapyGroupTableActions.ClearCurrentTherapyGroup,
		},
	],
})
export class TherapyGroupModule {}

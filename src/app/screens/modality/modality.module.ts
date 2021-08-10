import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/modules/core.module';
import { KendoModule } from 'src/app/core/modules/kendo/kendo.module';

import { TableEffects } from 'src/app/shared/table/table.effect';
import {
	GET_TABLE_DATA_PENDING,
	UPDATE_TABLE_STATE,
	DELETE_ITEM_TABLE_PENDING,
	CREATE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	DUBLICATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_ERROR,
	GET_CURRENT_ITEM_PENDING,
} from 'src/app/shared/table/table.tokens';
import { ModalityDetailsComponent } from './modality-details/modality-details.component';
import { ModalityManagerComponent } from './modality-manager/modality-manager.component';
import {
	getModalityTableDataPending,
	updateModalityTableState,
	deleteModalityIemTablePending,
	createModalityIemTablePending,
	editModalityIemTablePending,
	dublicateModalityIemTablePending,
	deleteModalityIemTableError,
	getCurrentItemPending,
} from './modality-table/modality-table.actions';
import { ModalityTableComponent } from './modality-table/modality-table.component';
import { modalityTableReducers } from './modality-table/modality-table.reducers';

@NgModule({
	imports: [
		CommonModule,
		KendoModule,
		// FormsModule,
		ReactiveFormsModule,
		CoreModule,
		RouterModule,
		StoreModule.forFeature('modalityTable', modalityTableReducers),
		EffectsModule.forFeature([TableEffects]),
	],
	declarations: [
		ModalityManagerComponent,
		// ModalityDetailsComponent,
		ModalityDetailsComponent,
		ModalityTableComponent,
	],
	entryComponents: [],
	providers: [
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: getModalityTableDataPending,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: updateModalityTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: deleteModalityIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: deleteModalityIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: getCurrentItemPending,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: createModalityIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: editModalityIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: dublicateModalityIemTablePending,
		},
	],
})
export class ModalityModule {}

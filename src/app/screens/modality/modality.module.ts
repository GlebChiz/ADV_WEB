import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TableEffects } from 'src/app/shared/table/table.effect';
import { GET_TABLE_DATA_PENDING, UPDATE_TABLE_STATE } from 'src/app/shared/table/table.tokens';
import { ModalityManagerComponent } from './modality-manager/modality-manager.component';
import {
	getModalityTableDataPending,
	updateModalityTableState,
} from './modality-table/modality-table.actions';
import { ModalityTableComponent } from './modality-table/modality-table.component';
import { modalityTableReducers } from './modality-table/modality-table.reducers';

@NgModule({
	imports: [
		CommonModule,
		// KendoModule,
		// FormsModule,
		// ReactiveFormsModule,
		// CoreModule,
		RouterModule,
		StoreModule.forFeature('modalityTable', modalityTableReducers),
		EffectsModule.forFeature([TableEffects]),
	],
	declarations: [
		ModalityManagerComponent,
		// ModalityDetailsComponent,
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
	],
})
export class ModalityModule {}

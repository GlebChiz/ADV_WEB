import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/modules/core.module';
import { KendoModule } from 'src/app/core/modules/kendo/kendo.module';
import { ModalityDetailsComponent } from './modality-details/modality-details.component';
import { ModalityManagerComponent } from './modality-manager/modality-manager.component';

@NgModule({
	imports: [CommonModule, KendoModule, FormsModule, ReactiveFormsModule, CoreModule, RouterModule],
	declarations: [ModalityManagerComponent, ModalityDetailsComponent],
	entryComponents: [],
	providers: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalityModule {}

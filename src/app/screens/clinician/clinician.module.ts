import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KendoModule } from 'src/app/core/modules/kendo/kendo.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/modules/core.module';
import { RouterModule } from '@angular/router';
import { ClinicianManagerComponent } from './clinician-manager/clinician-manager.component';
import { ClinicianFilterComponent } from './clinician-filter/clinician-filter.component';
import { ClinicianDetailsComponent } from './clinician-details/clinician-details.component';
import { ClinicianViewComponent } from './clinician-view/clinician-view.component';
import { ClinicianServiceSchedulerComponent } from './clinician-service-scheduler/clinician.service.scheduler.component';
import { PersonModule } from '../person/person.module';

@NgModule({
	imports: [
		CommonModule,
		KendoModule,
		FormsModule,
		ReactiveFormsModule,
		CoreModule,
		RouterModule,
		PersonModule,
	],
	declarations: [
		ClinicianManagerComponent,
		ClinicianFilterComponent,
		ClinicianViewComponent,
		ClinicianServiceSchedulerComponent,
		ClinicianDetailsComponent,
	],
	entryComponents: [],
	providers: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClinicianModule {}

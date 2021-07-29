import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KendoModule } from 'src/app/core/modules/kendo/kendo.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/modules/core.module';
import { RouterModule } from '@angular/router';
import { SplitterModule } from '@progress/kendo-angular-layout';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { PersonViewComponent } from './patient-view/person-view.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { IntakeModule } from '../intake/intake.module';
import { PersonAvailabilityComponent } from './person-availability/person-availability.component';
import { PersonAvailabilityEditorComponent } from './person-availability/person-availability-editor/person-availability-editor.component';

@NgModule({
	imports: [
		CommonModule,
		KendoModule,
		FormsModule,
		ReactiveFormsModule,
		CoreModule,
		RouterModule,
		IntakeModule,
		SplitterModule,
		SchedulerModule,
	],
	declarations: [
		PersonViewComponent,
		PersonDetailsComponent,
		PersonAvailabilityComponent,
		PersonAvailabilityEditorComponent,
	],
	entryComponents: [],
	providers: [],
	exports: [PersonAvailabilityComponent, PersonAvailabilityEditorComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PersonModule {}

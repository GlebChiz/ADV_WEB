import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KendoModule } from 'src/app/core/modules/kendo/kendo.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/modules/core.module';
import { RouterModule } from '@angular/router';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { CallActiveComponent } from './call-active/call-active.component';
import { OpenCallComponent } from './call-open/call-open.component';
import { CallEditorComponent } from './call-editor/call-editor.component';
import { MyCallsListComponent } from './mycalls-list/mycalls-list.component';
import { NewCallComponent } from './call-accept/new-call.component';
import { CheckListModule } from '../checklist/checklist.module';
import { PatientsModule } from '../patients/patients.module';
import { CallManagerComponent } from './call-manager/call-manager.component';
import { CallPatientComponent } from './call-patient/call-patient.component';
import { PersonModule } from '../person/person.module';
import { IntakeModule } from '../intake/intake.module';
import { CRMModule } from '../crm/crm.module';

@NgModule({
	imports: [
		CommonModule,
		KendoModule,
		FormsModule,
		ReactiveFormsModule,
		CoreModule,
		RouterModule,
		CheckListModule,
		PatientsModule,
		PersonModule,
		SchedulerModule,
		IntakeModule,
		CRMModule,
	],
	declarations: [
		CallActiveComponent,
		NewCallComponent,
		OpenCallComponent,
		CallManagerComponent,
		CallPatientComponent,
		CallEditorComponent,
		MyCallsListComponent,
	],
	entryComponents: [],
	providers: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CallModule {}

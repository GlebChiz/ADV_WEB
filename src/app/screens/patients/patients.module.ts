import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KendoModule } from 'src/app/core/modules/kendo/kendo.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/modules/core.module';
import { RouterModule } from '@angular/router';
import { PatientManagerComponent } from './patient-manager/patient-manager.component';
import { PatientFilterComponent } from './patient-filter/patient-filter.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { PatientStatusButtonComponent } from './patient-status-button/patient-status-button.component';
import { IntakeModule } from '../intake/intake.module';
import { PatientContactsComponent } from './patient-details/contacts/patient-contacts.component';
import { PatientDemographicComponent } from './patient-details/demographic/patient-demographic.component';
import { PatientGeneralComponent } from './patient-details/general/patient-general.component';
import { PatientInsuranceComponent } from './patient-details/insurance/patient-insurance.component';
import { PatientModalitySelectionComponent } from './patient-details/modality-selection/patient-modality-selection.component';
import { PatientFormsComponent } from './patient-forms/patient-forms.component';
import { PatientAreaButtonComponent } from './patient-area-button/patient-area-button.component';
import { PatientPersonViewComponent } from './patient-person-view/patient-person-view.component';

@NgModule({
	imports: [
		CommonModule,
		KendoModule,
		FormsModule,
		ReactiveFormsModule,
		CoreModule,
		RouterModule,
		IntakeModule,
	],
	declarations: [
		PatientManagerComponent,
		PatientFilterComponent,
		PatientStatusButtonComponent,
		PatientViewComponent,
		PatientPersonViewComponent,
		PatientDetailsComponent,
		PatientContactsComponent,
		PatientDemographicComponent,
		PatientGeneralComponent,
		PatientInsuranceComponent,
		PatientModalitySelectionComponent,
		PatientFormsComponent,
		PatientAreaButtonComponent,
	],
	exports: [PatientStatusButtonComponent, PatientFormsComponent, PatientAreaButtonComponent],
	entryComponents: [],
	providers: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatientsModule {}

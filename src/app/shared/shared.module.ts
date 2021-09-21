import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, DropDownButtonModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ComboBoxModule, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { CheckBoxModule } from '@progress/kendo-angular-inputs';
import { BreadCrumbModule } from '@progress/kendo-angular-navigation';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { NgxMaskModule } from 'ngx-mask';
import { ButtonSelectorComponent } from './components/button-selector/button-selector.component';
import { PersonaInfoComponent } from './components/persona-info/persona-info.component';
import { DemographicComponent } from './components/demografic/demographic.component';
import { ContactComponent } from './components/contact/contact.component';
import { PhoneComponent } from './components/phone/phone.component';
import { PatientGeneralInfoComponent } from './components/patient-general-info/patient-general-info.component';
import { ClinicianGeneralInfoComponent } from './components/clinician-general-info/clinician-general-info.component';
import { AddressControlComponent } from './components/address-control/address-control.component';
import { PermissionsComponent } from './permission/permission.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		DropDownsModule,
		FormsModule,
		NgxMaskModule.forRoot(),
		DateInputsModule,
	],
	exports: [
		CommonModule,
		NgxMaskModule,
		ReactiveFormsModule,
		FormsModule,
		GridModule,
		BreadCrumbModule,
		DialogModule,
		ComboBoxModule,
		DateInputsModule,
		DropDownButtonModule,
		CheckBoxModule,
		ButtonModule,
		DropDownsModule,
		LayoutModule,
		ButtonSelectorComponent,
		AddressControlComponent,
		DemographicComponent,
		PersonaInfoComponent,
		PatientGeneralInfoComponent,
		ContactComponent,
		PhoneComponent,
		ClinicianGeneralInfoComponent,
		PermissionsComponent,
	],
	declarations: [
		ButtonSelectorComponent,
		ClinicianGeneralInfoComponent,
		AddressControlComponent,
		DemographicComponent,
		PersonaInfoComponent,
		PatientGeneralInfoComponent,
		ContactComponent,
		PhoneComponent,
		PermissionsComponent,
	],
})
export class SharedModule {}

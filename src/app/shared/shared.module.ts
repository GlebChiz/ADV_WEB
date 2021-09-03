import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ComboBoxModule, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { CheckBoxModule } from '@progress/kendo-angular-inputs';
import { BreadCrumbModule } from '@progress/kendo-angular-navigation';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonSelectorComponent } from './components/button-selector/button-selector.component';
import { AddressControlComponent } from '../controls/address-control/address-control.component';
import { PersonaInfoComponent } from './components/persona-info/persona-info.component';
import { DemographicComponent } from './components/demografic/demographic.component';
import { ContactComponent } from './components/contact/contact.component';
import { PhoneComponent } from './components/phone/phone.component';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, DropDownsModule, FormsModule],
	exports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		GridModule,
		BreadCrumbModule,
		DialogModule,
		ComboBoxModule,
		DateInputsModule,
		CheckBoxModule,
		ButtonModule,
		DropDownsModule,
		LayoutModule,
		ButtonSelectorComponent,
		AddressControlComponent,
		DemographicComponent,
		PersonaInfoComponent,
		ContactComponent,
		PhoneComponent,
	],
	declarations: [
		ButtonSelectorComponent,
		AddressControlComponent,
		DemographicComponent,
		PersonaInfoComponent,
		ContactComponent,
		PhoneComponent,
	],
})
export class SharedModule {}

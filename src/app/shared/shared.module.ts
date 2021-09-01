import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { DemographicComponent } from './components/demografic/demographic.component';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, DropDownsModule],
	exports: [
		CommonModule,
		ReactiveFormsModule,
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
	],
	declarations: [ButtonSelectorComponent, AddressControlComponent, DemographicComponent],
})
export class SharedModule {}

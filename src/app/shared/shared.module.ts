import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ComboBoxModule, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { CheckBoxModule } from '@progress/kendo-angular-inputs';
import { BreadCrumbModule } from '@progress/kendo-angular-navigation';

import { LayoutModule } from '@progress/kendo-angular-layout';

@NgModule({
	exports: [
		CommonModule,
		ReactiveFormsModule,
		GridModule,
		BreadCrumbModule,
		DialogModule,
		ComboBoxModule,
		CheckBoxModule,
		ButtonModule,
		DropDownsModule,
		LayoutModule,
	],
})
export class SharedModule {}

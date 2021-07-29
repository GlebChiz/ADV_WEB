import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule, WindowModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { UploadModule } from '@progress/kendo-angular-upload';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { ChartsModule } from '@progress/kendo-angular-charts';

import 'hammerjs';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { KendoWrappersModule } from './kendo-wrappers/kendo-wrappers.module';

@NgModule({
	declarations: [],
	imports: [
		GridModule,
		ExcelModule,
		LayoutModule,
		DropDownsModule,
		ButtonsModule,
		DialogModule,
		WindowModule,
		InputsModule,
		LabelModule,
		UploadModule,
		KendoWrappersModule,
		TooltipModule,
		ChartsModule,
		ToolBarModule,
	],
	exports: [
		GridModule,
		ExcelModule,
		LayoutModule,
		DropDownsModule,
		ButtonsModule,
		DialogModule,
		WindowModule,
		InputsModule,
		LabelModule,
		UploadModule,
		KendoWrappersModule,
		TooltipModule,
		ChartsModule,
		SchedulerModule,
		ToolBarModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class KendoModule {}

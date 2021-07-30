import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { SliderModule } from '@progress/kendo-angular-inputs';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { AddressControlComponent } from '../components/controls/address-control/address-control.component';
import { FormEditorComponent } from '../components/controls/form-editor/form-editor.component';
import { FormUploadComponent } from '../components/controls/form-upload-control/form-upload-control.component';
import { InsuranceControlComponent } from '../components/controls/insurance/insurance-control.component';
import { PersonShortComponent } from '../components/controls/person/short-model/person-short.component';
import { ServiceEditorFormComponent } from '../components/controls/service-editor-form/service.editor.form.component';
import { ServiceSchedulerComponent } from '../components/controls/service-scheduler/service.scheduler.component';
import { ValidationMessageComponent } from '../components/controls/validation-message/validation-message.component';
import { AddCellComponent } from '../components/grid/add-cell/add-cell.component';
import { GridColumnsChooserComponent } from '../components/grid/columns-chooser/columns-chooser.component';
import { DataListComponent } from '../components/grid/data-list/data-list.component';
import { DetailsCellComponent } from '../components/grid/details-cell/details-cell.component';
import { ModifyCellComponent } from '../components/grid/modify-cell/modify-cell.component';
import { RemoveCellComponent } from '../components/grid/remove-cell/remove-cell.component';
import { ViewChartCellComponent } from '../components/grid/view-chart-cell/view-chart-cell.component';
import { LabelComponent } from '../components/label/label.component';
import { GridDirective } from '../directives/grid.directive';
import { ViewPdfFileComponent } from '../components/controls/view-pdffile-control/view.pdffile.component';
import { EditPdfFileComponent } from '../components/controls/edit_pdffile-control/edit.pdffile.component';
import { SignDialogComponent } from '../components/controls/sign-dialog/sign.dialog.component';
import { ButtonSelectorComponent } from '../components/controls/button-selector/button-selector.component';
import { DuplicateCellComponent } from '../components/grid/duplicate-cell/duplicate-cell.component';
import { GridColumnFilterComponent } from '../components/grid/column-filter/column-filter.component';
import { GridValueFilterComponent } from '../components/grid/column-filter/value-filter/value-filter.component';
import { GridDateFilterComponent } from '../components/grid/column-filter/date-filter/date-filter.component';
import { GridIntervalFilterComponent } from '../components/grid/column-filter/interval-filter/interval-filter.component';
import { KendoModule } from './kendo/kendo.module';
import { GridColumnTitleComponent } from '../components/grid/column-title/column-title.component';
import { GridColumnsSortEditorComponent } from '../components/grid/column-sort-editor/column-sort-editor.component';
import { IGridSettingsChooserComponent } from '../components/grid/grid-settings-chooser/grid-settings-chooser.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		ComboBoxModule,
		TabStripModule,
		GridModule,
		DateInputsModule,
		RouterModule,
		SchedulerModule,
		UploadModule,
		ToolBarModule,
		PdfViewerModule,
		SignaturePadModule,
		SliderModule,
		DialogModule,
		ButtonsModule,
		KendoModule,
	],
	declarations: [
		GridColumnsChooserComponent,
		IGridSettingsChooserComponent,
		GridColumnFilterComponent,
		GridColumnsSortEditorComponent,
		GridColumnTitleComponent,
		GridValueFilterComponent,
		GridDateFilterComponent,
		GridIntervalFilterComponent,
		GridDirective,
		AddCellComponent,
		DataListComponent,
		ModifyCellComponent,
		DuplicateCellComponent,
		DetailsCellComponent,
		FormUploadComponent,
		RemoveCellComponent,
		ViewChartCellComponent,
		AddressControlComponent,
		LabelComponent,
		InsuranceControlComponent,
		PersonShortComponent,
		ViewPdfFileComponent,
		ServiceEditorFormComponent,
		ServiceSchedulerComponent,
		ValidationMessageComponent,
		FormEditorComponent,
		EditPdfFileComponent,
		SignDialogComponent,
		ButtonSelectorComponent,
	],
	exports: [
		IGridSettingsChooserComponent,
		GridColumnsChooserComponent,
		GridColumnFilterComponent,
		GridColumnsSortEditorComponent,
		GridColumnTitleComponent,
		GridDirective,
		AddCellComponent,
		ModifyCellComponent,
		DuplicateCellComponent,
		DetailsCellComponent,
		RemoveCellComponent,
		ViewChartCellComponent,
		LabelComponent,
		AddressControlComponent,
		InsuranceControlComponent,
		DataListComponent,
		PersonShortComponent,
		ServiceEditorFormComponent,
		ServiceSchedulerComponent,
		FormUploadComponent,
		ValidationMessageComponent,
		FormEditorComponent,
		ViewPdfFileComponent,
		EditPdfFileComponent,
		SignDialogComponent,
		ButtonSelectorComponent,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule {}

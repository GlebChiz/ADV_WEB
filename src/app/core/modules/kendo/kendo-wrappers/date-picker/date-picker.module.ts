import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DatePickerWrapperComponent } from './date-picker.component';

@NgModule({
	declarations: [DatePickerWrapperComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, DateInputsModule, LabelModule],
	exports: [DateInputsModule, DatePickerWrapperComponent],
})
export class DatePickerWrapperModule {}

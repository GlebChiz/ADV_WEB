import { NgModule } from '@angular/core';
import { DatePickerWrapperModule } from './date-picker/date-picker.module';

@NgModule({
	imports: [DatePickerWrapperModule],
	exports: [DatePickerWrapperModule],
})
export class KendoWrappersModule {}

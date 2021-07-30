import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/modules/core.module';
import { KendoModule } from 'src/app/core/modules/kendo/kendo.module';
import { IIntakeSchedulerFilterComponent } from './intake.scheduler.filter/intake.scheduler.filter.component';
import { IntakeSchedulerComponent } from './intake.scheduler/intake.scheduler.component';

@NgModule({
	imports: [CommonModule, KendoModule, FormsModule, ReactiveFormsModule, CoreModule, RouterModule],
	declarations: [IntakeSchedulerComponent, IIntakeSchedulerFilterComponent],
	exports: [IntakeSchedulerComponent, IIntakeSchedulerFilterComponent],
	entryComponents: [],
	providers: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntakeModule {}

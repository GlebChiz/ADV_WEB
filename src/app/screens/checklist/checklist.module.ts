import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/modules/core.module';
import { KendoModule } from 'src/app/core/modules/kendo/kendo.module';
import { ChecklistButtonComponent } from './checklist-button/checklist-button.component';
import { ChecklistReviewComponent } from './checklist-review/checklist-review.component';

@NgModule({
	imports: [CommonModule, KendoModule, FormsModule, ReactiveFormsModule, CoreModule, RouterModule],
	declarations: [ChecklistButtonComponent, ChecklistReviewComponent],
	exports: [ChecklistButtonComponent, ChecklistReviewComponent],
	entryComponents: [],
	providers: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckListModule {}

import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssessmentQuestionDetailsComponent } from './assessment-question-details.component';
import { AssessmentQuestionDetailsEffects } from './store/effects/assessment-question-details.effects';
import { AssessmentQuestionDetailsService } from './services/assessment-question-details.service';
import { assessmentQuestionDetailsReducers } from './store/reducers/assessment-question-details.reducers';

@NgModule({
	imports: [
		SharedModule,
		StoreModule.forFeature('assessmentQuestionDetails', assessmentQuestionDetailsReducers),
		EffectsModule.forFeature([AssessmentQuestionDetailsEffects]),
		RouterModule.forChild([
			{
				path: '',
				component: AssessmentQuestionDetailsComponent,
			},
		]),
	],
	declarations: [AssessmentQuestionDetailsComponent],
	providers: [AssessmentQuestionDetailsService],
})
export class AssessmentQuestionDetailsModule {}

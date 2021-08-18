import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssessmentQuestionEffects } from './store/effects/assessment-question.effects';
import { AssessmentQuestionComponent } from './assessment-question.component';
import { AssessmentQuestionService } from './services/assessment-question.service';
import { assessmentQuestionReducers } from './store/reducers/assessment-question.reducers';

@NgModule({
	imports: [
		SharedModule,
		StoreModule.forFeature('assesment', assessmentQuestionReducers),
		EffectsModule.forFeature([AssessmentQuestionEffects]),
		RouterModule.forChild([
			{
				path: '',
				component: AssessmentQuestionComponent,
			},
		]),
	],
	declarations: [AssessmentQuestionComponent],
	providers: [AssessmentQuestionService],
})
export class AssessmentQuestionModule {}

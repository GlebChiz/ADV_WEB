import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { SessionPlanDetailsComponent } from './session-plan-details.component';
import { SessionPlanDetailsService } from './services/session-plan-details.service';
import { SessionPlanDetailsEffects } from './store/effects/session-plan-details.effects';
import { sessionPlanDetailsReducers } from './store/reducers/session-plan-details.reducers';

@NgModule({
	imports: [
		SharedModule,
		StoreModule.forFeature('sessionplans', sessionPlanDetailsReducers),
		EffectsModule.forFeature([SessionPlanDetailsEffects]),
		RouterModule.forChild([
			{
				path: '',
				component: SessionPlanDetailsComponent,
			},
		]),
	],
	declarations: [SessionPlanDetailsComponent],
	providers: [SessionPlanDetailsService],
})
export class SessionPlanDetailsModule {}

import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { TherapyGroupDetailsComponent } from './therapy-group-details.component';
import { TherapyGroupDetailsService } from './services/therapy-group-details.service';
import { TherapyGroupDetailsEffects } from './store/effects/therapy-group-details.effects';
import { therapyGroupDetailsReducers } from './store/reducers/therapy-group-details.reducers';

@NgModule({
	imports: [
		SharedModule,
		StoreModule.forFeature('therapygroup', therapyGroupDetailsReducers),
		EffectsModule.forFeature([TherapyGroupDetailsEffects]),
		RouterModule.forChild([
			{
				path: '',
				component: TherapyGroupDetailsComponent,
			},
		]),
	],
	declarations: [TherapyGroupDetailsComponent],
	providers: [TherapyGroupDetailsService],
})
export class TherapyGroupDetailsModule {}

import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { clinicianDetailsReducers } from './store/reducers/clinician-details.reducers';
import { ClinicianDetailsComponent } from './clinician-details.component';
import { ClinicianDetailsService } from './services/clinican-details.service';
import { ClinicianDetailsEffects } from './store/effects/clinician-details.effects';

@NgModule({
	imports: [
		SharedModule,
		StoreModule.forFeature('clinicianCurrent', clinicianDetailsReducers),
		EffectsModule.forFeature([ClinicianDetailsEffects]),
		RouterModule.forChild([
			{
				path: '',
				component: ClinicianDetailsComponent,
			},
		]),
	],
	declarations: [ClinicianDetailsComponent],
	providers: [ClinicianDetailsService],
})
export class ClinicianDetailsModule {}

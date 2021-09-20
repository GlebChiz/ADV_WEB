import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientDetailsEffects } from './store/effects/patient-details.effects';
import { PatientDetailsComponent } from './patient-details.component';
import { PatientDetailsService } from './services/patient-details.service';
import { patientDetailsReducers } from './store/reducers/patient-details.reducers';
import { InsuranceModule } from './insurance/insurance.module';
// import { InsuranceModule } from './insurance/insurance.module';

@NgModule({
	imports: [
		SharedModule,
		StoreModule.forFeature('patientCurrent', patientDetailsReducers),
		EffectsModule.forFeature([PatientDetailsEffects]),
		InsuranceModule,
		RouterModule.forChild([
			{
				path: '',
				component: PatientDetailsComponent,
			},
		]),
	],
	declarations: [PatientDetailsComponent],
	providers: [PatientDetailsService],
})
export class PatientDetailsModule {}

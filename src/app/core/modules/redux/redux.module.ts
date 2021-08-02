import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { DefaultRouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { CallEffects } from '../../store/call/call.effects';
import { ClinicianEffects } from '../../store/clinician/clinician.effects';
import { GridEffects } from '../../store/grid/grid.effects';
import { PatientEffects } from '../../store/patient/patient.effects';
import { PersonEffects } from '../../store/person/person.effects';
import { appReducers } from '../../store/reducers/app.reducers';

@NgModule({
	declarations: [],
	imports: [
		StoreModule.forRoot(appReducers, {
			runtimeChecks: {
				strictStateImmutability: false,
				strictActionImmutability: false,
			},
		}),
		EffectsModule.forRoot([
			PatientEffects,
			GridEffects,
			CallEffects,
			PersonEffects,
			ClinicianEffects,
		]),
		StoreRouterConnectingModule.forRoot({
			serializer: DefaultRouterStateSerializer,
			stateKey: 'router',
		}),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
	],
	exports: [],
})
export class ReduxModule {}

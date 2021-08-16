import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { PublicSnipitDetailsComponent } from './public-snipit-details.component';
import { PublicSnipitDetailsService } from './services/public-snipit-details.service';
import { publicSnipitDetailsReducers } from './store/reducers/public-snipit-details.reducers';
import { PublicSnipitDetailsEffects } from './store/effects/public-snipit-details.effects';

@NgModule({
	imports: [
		SharedModule,
		StoreModule.forFeature('public-snipit', publicSnipitDetailsReducers),
		EffectsModule.forFeature([PublicSnipitDetailsEffects]),
		RouterModule.forChild([
			{
				path: '',
				component: PublicSnipitDetailsComponent,
			},
		]),
	],
	declarations: [PublicSnipitDetailsComponent],
	providers: [PublicSnipitDetailsService],
})
export class PublicSnipitDetailsModule {}

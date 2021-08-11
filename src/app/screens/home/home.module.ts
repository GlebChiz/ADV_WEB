import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModel } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
	imports: [
		SharedModel,
		RouterModule.forChild([
			{
				path: '',
				component: HomeComponent,
				children: [
					{ path: '', redirectTo: 'payers' },
					{
						path: 'modalities',
						loadChildren: (): any =>
							import('./screens/modality/modality.module').then((m: any) => m.ModalityModule),
					},
					{
						path: 'payers',
						loadChildren: (): any =>
							import('./screens/payer/payer.module').then((m: any) => m.PayerModule),
					},
				],
			},
		]),
	],
	declarations: [HomeComponent],
})
export class HomeModule {}

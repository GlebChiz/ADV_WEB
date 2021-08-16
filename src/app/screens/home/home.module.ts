import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeBreadcrumbComponent } from './home-breadcrumb/home-breadcrumb.component';
import { HomeComponent } from './home.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: HomeComponent,
				children: [
					{ path: '', redirectTo: 'payers' },
					{
						path: 'seriesplans',
						loadChildren: (): any =>
							import('./screens/seriesplans/seriesplans.module').then(
								(m: any) => m.SeriesplansModule,
							),
						data: {
							breadcrumb: 'Clinicians',
						},
					},
					{
						path: 'clinicians',
						loadChildren: (): any =>
							import('./screens/clinician/clinician.module').then((m: any) => m.ClinicianModule),
						data: {
							breadcrumb: 'Clinicians',
						},
					},
					{
						path: 'patients',
						loadChildren: (): any =>
							import('./screens/patient/patient.module').then((m: any) => m.PatientModule),
						data: {
							breadcrumb: 'Patients',
						},
					},

					{
						path: 'modalities',
						loadChildren: (): any =>
							import('./screens/modality/modality.module').then((m: any) => m.ModalityModule),
						data: {
							breadcrumb: 'Modalities',
						},
					},
					{
						path: 'payers',
						loadChildren: (): any =>
							import('./screens/payer/payer.module').then((m: any) => m.PayerModule),
						data: {
							breadcrumb: 'Payers',
						},
					},
				],
			},
		]),
	],
	declarations: [HomeComponent, HomeBreadcrumbComponent],
})
export class HomeModule {}

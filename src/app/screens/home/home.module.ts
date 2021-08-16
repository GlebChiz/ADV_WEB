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
					{
						path: 'supercred',
						loadChildren: (): any =>
							import('./screens/supervisor-license/supervisor-license.module').then(
								(m: any) => m.SupervisorLicenseModuleModule,
							),
						data: {
							breadcrumb: 'Supervisor license',
						},
					},
					{
						path: 'snipits',
						loadChildren: (): any =>
							import('./screens/public-snipit/public-snipit.module').then(
								(m: any) => m.PublicSnipitModule,
							),
						data: {
							breadcrumb: 'Public snipit',
						},
					},
					{
						path: 'sessionplans',
						loadChildren: (): any =>
							import('./screens/session-plan/session-plan.module').then(
								(m: any) => m.SessionPlanModuleModule,
							),
						data: {
							breadcrumb: 'Session Plan',
						},
					},
					{
						path: 'assessmentlegend',
						loadChildren: (): any =>
							import('./screens/assessment-legend/assessment-legend.module').then(
								(m: any) => m.AssessmentLegendModuleModule,
							),
						data: {
							breadcrumb: 'Assessment Legend',
						},
					},
					{
						path: 'seriesplans',
						loadChildren: (): any =>
							import('./screens/series-plan/series-plan.module').then(
								(m: any) => m.SeriesplansModule,
							),
						data: {
							breadcrumb: 'Series-plans',
						},
					},
					{
						path: 'assessments',
						loadChildren: (): any =>
							import('./screens/assessment/assessment.module').then((m: any) => m.AssessmentModule),
						data: {
							breadcrumb: 'Assessments',
						},
					},
				],
			},
		]),
	],
	declarations: [HomeComponent, HomeBreadcrumbComponent],
})
export class HomeModule {}

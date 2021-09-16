import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/shared/helpers/permission.guard';
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
						canActivate: [PermissionGuard],
					},
					{
						path: 'patients',
						loadChildren: (): any =>
							import('./screens/patient/patient.module').then((m: any) => m.PatientModule),
						data: {
							breadcrumb: 'Patients',
						},
						canActivate: [PermissionGuard],
					},
					{
						path: 'modalities',
						loadChildren: (): any =>
							import('./screens/modality/modality.module').then((m: any) => m.ModalityModule),
						data: {
							breadcrumb: 'Modalities',
						},
						canActivate: [PermissionGuard],
					},

					{
						path: 'payers',
						loadChildren: (): any =>
							import('./screens/payer/payer.module').then((m: any) => m.PayerModule),
						data: {
							breadcrumb: 'Payers',
						},
						canActivate: [PermissionGuard],
					},
					{
						path: 'supercred',
						loadChildren: (): any =>
							import('./screens/supervisor-license/supervisor-license.module').then(
								(m: any) => m.SupervisorLicenseModule,
							),
						data: {
							breadcrumb: 'Supervisor license',
						},
						canActivate: [PermissionGuard],
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
						canActivate: [PermissionGuard],
					},
					{
						path: 'seriesplans',
						loadChildren: (): any =>
							import('./screens/series-plan/series-plan.module').then(
								(m: any) => m.SeriesplansModule,
							),
						data: {
							breadcrumb: 'Series Plan',
						},
						canActivate: [PermissionGuard],
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
						canActivate: [PermissionGuard],
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
						canActivate: [PermissionGuard],
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
						canActivate: [PermissionGuard],
					},
					{
						path: 'assessments',
						loadChildren: (): any =>
							import('./screens/assessment/assessment.module').then((m: any) => m.AssessmentModule),
						data: {
							breadcrumb: 'Assessments',
						},
						canActivate: [PermissionGuard],
					},
					{
						path: 'patientdistribution',
						loadChildren: (): any =>
							import('./screens/patient-distribution/patient-distribution.module').then(
								(m: any) => m.PatientDistributionModule,
							),
						data: {
							breadcrumb: 'Patient Distribution',
						},
						canActivate: [PermissionGuard],
					},
					{
						path: 'unsupervisedservices',
						loadChildren: (): any =>
							import('./screens/unsupervised-services/unsupervised-services.module').then(
								(m: any) => m.UnsupervisedServicesModule,
							),
						data: {
							breadcrumb: 'Unsupervised Services',
						},
						canActivate: [PermissionGuard],
					},
					{
						path: 'groups',
						loadChildren: (): any =>
							import('./screens/therapy-group/therapy-group.module').then(
								(m: any) => m.TherapyGroupModule,
							),
						data: {
							breadcrumb: 'Therapy Group',
						},
						canActivate: [PermissionGuard],
					},
					{
						path: 'locations',
						loadChildren: (): any =>
							import('./screens/location/location.module').then((m: any) => m.LocationModule),
						data: {
							breadcrumb: 'Location',
						},
						canActivate: [PermissionGuard],
					},
					{
						path: 'download',
						loadChildren: (): any =>
							import('./screens/download/download.module').then((m: any) => m.DownloadModule),
						data: {
							breadcrumb: 'download',
						},
						canActivate: [PermissionGuard],
					},
				],
			},
		]),
	],
	declarations: [HomeComponent, HomeBreadcrumbComponent],
})
export class HomeModule {}

export enum ROUTES {
	payers = 'payers',
	clinicians = 'clinicians',
	patients = 'patients',
	modalities = 'modalities',
	supercred = 'supercred',
	snipits = 'snipits',
	seriesplans = 'seriesplans',
	sessionplans = 'sessionplans',
	assessmentlegend = 'assessmentlegend',
	assessments = 'assessments',
	patientdistribution = 'patientdistribution',
	unsupervisedservices = 'unsupervisedservices',
	groups = 'groups',
	locations = 'locations',
	download = 'download',
}

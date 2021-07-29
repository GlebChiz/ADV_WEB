import { Routes, RouterModule } from '@angular/router';
import { OpenCallComponent } from './screens/call/call-open/call-open.component';
import { CallActiveComponent } from './screens/call/call-active/call-active.component';
import { MyCallsListComponent } from './screens/call/mycalls-list/mycalls-list.component';

import { HomeComponent } from './screens/home';
import { LoginComponent } from './screens/login';
import { PatientManagerComponent } from './screens/patients/patient-manager/patient-manager.component';
import { PatientViewComponent } from './screens/patients/patient-view/patient-view.component';
import { PayerManagerComponent } from './screens/payer/payer-manager/payer-manager.component';
import { AuthGuard } from './shared/helpers';
import { NewCallComponent } from './screens/call/call-accept/new-call.component';
import { PersonViewComponent } from './screens/person/patient-view/person-view.component';
import { ClinicianManagerComponent } from './screens/clinician/clinician-manager/clinician-manager.component';
import { ClinicianViewComponent } from './screens/clinician/clinician-view/clinician-view.component';
import { FormViewComponent } from './screens/form/form-view/form-view.component';
import { ResetCacheComponent } from './screens/reset-cache/reset-cache.component';
import { SharedCallHomeComponent } from './screens/shared-call/shared-call-home/shared-call-home.component';
import { SharedCallLoginComponent } from './screens/shared-call/shared-call-login/shared-call-login.component';
import { SharedCallAuthGuard } from './shared/helpers/shared-call-auth.guard';
import { PatientPersonViewComponent } from './screens/patients/patient-person-view/patient-person-view.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'patients', component: PatientManagerComponent, canActivate: [AuthGuard] },
	{ path: 'clinicians', component: ClinicianManagerComponent, canActivate: [AuthGuard] },
	{ path: 'payers', component: PayerManagerComponent, canActivate: [AuthGuard] },
	{ path: 'patient-person/:id', component: PatientPersonViewComponent, canActivate: [AuthGuard] },
	{ path: 'patient/:id', component: PatientViewComponent, canActivate: [AuthGuard] },
	{ path: 'clinician/:id', component: ClinicianViewComponent, canActivate: [AuthGuard] },
	{ path: 'new-call', component: NewCallComponent, canActivate: [AuthGuard] },
	{ path: 'active-call', component: CallActiveComponent, canActivate: [AuthGuard] },
	{ path: 'my-calls', component: MyCallsListComponent, canActivate: [AuthGuard] },
	{ path: 'call/:id', component: OpenCallComponent, canActivate: [AuthGuard] },
	{ path: 'person/:id', component: PersonViewComponent, canActivate: [AuthGuard] },
	{ path: 'form/:id', component: FormViewComponent, canActivate: [AuthGuard] },
	{ path: 'reset', component: ResetCacheComponent, canActivate: [AuthGuard] },
	{ path: 'reset/:section', component: ResetCacheComponent, canActivate: [AuthGuard] },

	{ path: 'sharedcalllogin/:id', component: SharedCallLoginComponent },
	{ path: 'sharedcall', component: SharedCallHomeComponent, canActivate: [SharedCallAuthGuard] },
	// otherwise redirect to home
	{ path: '*', redirectTo: '' },
];

export const AppRoutingModule = RouterModule.forRoot(routes);

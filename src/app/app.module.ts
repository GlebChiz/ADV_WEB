import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenusModule } from '@progress/kendo-angular-menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './shared/interceptors';
import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home';
import { LoginComponent } from './screens/login';
import { RegisterComponent } from './screens/register';
import { AlertComponent } from './shared/components';
import { HeaderComponent } from './shared/layout/header/header.component';
import { MenuComponent } from './shared/layout/menu/menu.component';
import { PatientsModule } from './screens/patients/patients.module';
import { DropdownMenuComponent } from './shared/layout/dropdown-menu/dropdown-menu.component';
import { PageTitleComponent } from './shared/layout/page-title/page-title.component';
import { ReduxModule } from './core/modules/redux/redux.module';
import { PayersModule } from './screens/payer/payer.module';
import { CoreModule } from './core/modules/core.module';
import { CallModule } from './screens/call/call.module';
import { CheckListModule } from './screens/checklist/checklist.module';
import { PersonModule } from './screens/person/person.module';
import { ClinicianModule } from './screens/clinician/clinician.module';
import { IntakeModule } from './screens/intake/intake.module';
import { AdveniumFormModule } from './screens/form/form.module';
import { SharedCallModule } from './screens/shared-call/shared-call.module';
import { ModalityModule } from './screens/modality/modality.module';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		AlertComponent,
		HeaderComponent,
		MenuComponent,
		DropdownMenuComponent,
		PageTitleComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		CommonModule,
		HttpClientModule,
		PatientsModule,
		PersonModule,
		PayersModule,
		ModalityModule,
		MenusModule,
		BrowserAnimationsModule,
		CallModule,
		CoreModule,
		ClinicianModule,
		ReduxModule,
		CheckListModule,
		IntakeModule,
		AdveniumFormModule,
		SharedCallModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

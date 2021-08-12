import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthUserActions } from './store/actions/user.actions';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { appReducers } from './store';
import { UserEffects } from './store/effects/user.effects';
import { PayerEffects } from './store/effects/payer.effects';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function initApp(store: Store<any>): any {
	return (): void => store.dispatch(AuthUserActions.CheckToken());
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		StoreModule.forRoot(appReducers, {
			runtimeChecks: {
				strictStateImmutability: false,
				strictActionImmutability: false,
			},
		}),
		StoreDevtoolsModule.instrument(),
		EffectsModule.forRoot([UserEffects, PayerEffects]),
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{
			provide: APP_INITIALIZER,
			deps: [Store],
			useFactory: initApp,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}

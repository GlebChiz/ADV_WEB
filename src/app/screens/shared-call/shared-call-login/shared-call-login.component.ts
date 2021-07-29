import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Store } from '@ngrx/store';
import { AlertService, AuthenticationService } from 'src/app/shared/services';
import { combineLatest } from 'rxjs';

@Component({
	templateUrl: './shared-call-login.component.html',
})
export class SharedCallLoginComponent implements OnInit {
	loginForm!: FormGroup;

	loading = false;

	submitted = false;

	sharedCallId!: string;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService,
		private alertService: AlertService,
		private _store: Store<IAppState>,
	) {}

	ngOnInit() {
		combineLatest([this.route.params]).subscribe(([xParams]) => {
			this.sharedCallId = xParams.id;
			// logout if already logged in
			if (this.authenticationService.getCurrentUser()) {
				this.authenticationService.logout();
				this.router.navigate(['/sharedcalllogin', this.sharedCallId]);
			}
		});

		this.loginForm = this.formBuilder.group({
			code: ['', Validators.required],
		});

		this._store.dispatch(
			PageSettingsActions.SetTitle({ settings: { title: 'Join to Shared Call' } }),
		);
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.loginForm.controls;
	}

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}

		this.loading = true;
		this.authenticationService
			.sharedCalllogin(this.sharedCallId, this.f.code!.value)
			.pipe(first())
			.subscribe(
				(data) => {
					this.router.navigate(['/sharedcall']);
				},
				(error) => {
					this.alertService.error(error);
					this.loading = false;
				},
			);
	}
}

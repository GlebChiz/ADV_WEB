import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Store } from '@ngrx/store';
import { AlertService, AuthenticationService } from '../../shared/services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;

	loading = false;

	submitted = false;

	returnUrl!: string;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService,
		private alertService: AlertService,
		private _store: Store<IAppState>,
	) {
		// redirect to home if already logged in
		if (this.authenticationService.getCurrentUser()) {
			this.router.navigate(['/']);
		}
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

		this._store.dispatch(PageSettingsActions.SetTitle({ settings: { title: 'Login' } }));
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
			.login(this.f.username!.value, this.f.password!.value)
			.pipe(first())
			.subscribe(
				() => {
					window.location.href = this.returnUrl;
				},
				(error) => {
					this.alertService.error(error);
					this.loading = false;
				},
			);
	}
}

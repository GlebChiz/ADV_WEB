import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Store } from '@ngrx/store';
import { AlertService, AuthenticationService } from 'src/app/shared/services';
import { combineLatest } from 'rxjs';
// import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { IUser } from 'src/app/core/models/user.model';

@Component({
	templateUrl: './shared-call-login.component.html',
})
export class SharedCallLoginComponent implements OnInit {
	public loginForm!: FormGroup;

	public loading = false;

	public submitted = false;

	public sharedCallId!: string;

	public constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService,
		private alertService: AlertService,
		private _store: Store<IAppState>,
	) {}

	public ngOnInit(): void {
		combineLatest([this.route.params]).subscribe(([xParams]) => {
			this.sharedCallId = xParams.id;
			// logout if already logged in
			this._store.select('userState', 'user').subscribe((user: IUser | null) => {
				if (user) {
					this.authenticationService.logout();
					this.router.navigate(['/sharedcalllogin', this.sharedCallId]);
				}
			});
			// if (this.authenticationService.getCurrentUser()) {
			// 	this.authenticationService.logout();
			// 	this.router.navigate(['/sharedcalllogin', this.sharedCallId]);
			// }
		});

		this.loginForm = this.formBuilder.group({
			code: ['', Validators.required],
		});

		this._store.dispatch(
			PageSettingsActions.SetTitle({ settings: { title: 'Join to Shared Call' } }),
		);
	}

	// convenience getter for easy access to form fields
	public get f(): {
		[key: string]: AbstractControl;
	} {
		return this.loginForm.controls;
	}

	public onSubmit(): void {
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
				() => {
					this.router.navigate(['/sharedcall']);
				},
				(error: any) => {
					this.alertService.error(error);
					this.loading = false;
				},
			);
	}
}

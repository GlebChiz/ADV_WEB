import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthUserActions, IUser } from 'src/app/store/actions/user.actions';

@Component({ templateUrl: 'login.component.html', styleUrls: ['login.component.scss'] })
export class LoginComponent implements OnInit {
	public loginForm!: FormGroup;

	public loading = false;

	public submitted = false;

	public returnUrl!: string;

	public constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		// private authenticationService: AuthenticationService,
		// private alertService: AlertService,
		private _store: Store<any>,
	) {
		// redirect to home if already logged in
		this._store.select('userState', 'user').subscribe((user: IUser | null) => {
			if (user) {
				this.router.navigate(['/']);
			}
		});
		// if (this.authenticationService.getCurrentUser()) {
		// 	this.router.navigate(['/']);
		// }
	}

	public ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

		// this._store.dispatch(PageSettingsActions.SetTitle({ settings: { title: 'Login' } }));
	}

	// convenience getter for easy access to form fields
	public get f(): {
		[key: string]: AbstractControl;
	} {
		return this.loginForm.controls;
	}

	public onSubmit(): undefined | void {
		this.submitted = true;
		if (this.loginForm.invalid) {
			return;
		}
		this._store.dispatch(
			AuthUserActions.SignIn({ password: this.f.password?.value, login: this.f.username?.value }),
		);
	}
}

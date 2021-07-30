import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PermissionType } from './core/enums/permission.type';
import { IUser } from './core/models/user.model';
import { CallActions } from './core/store/call/call.actions';
import { IAppState } from './core/store/state/app.state';
import { AuthUserActions } from './core/store/user/user.actions';
import { AuthenticationService } from './shared/services';

@Component({
	selector: 'advenium-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'NG';

	currentUser!: IUser | null;

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService,
		private _store: Store<IAppState>,
	) {
		this.authenticationService.currentUser.subscribe((x) => {
			this.currentUser = x;
			this._store.dispatch(AuthUserActions.SetUser({ user: x }));
			if (this.currentUser?.permissions?.includes(PermissionType.CanViewActiveCall)) {
				this._store.dispatch(CallActions.GetActiveCall());
			}
		});
	}

	logout() {
		this.authenticationService.logout();
		this.router.navigate(['/login']);
	}
}

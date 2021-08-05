import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PermissionType } from './core/enums/permission.type';
import { IUser } from './core/models/user.model';
import { CallActions } from './core/store/call/call.actions';
import { IAppState } from './core/store/state/app.state';

@Component({
	selector: 'advenium-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	public title = 'NG';

	public currentUser!: IUser | null;

	public constructor(private _router: Router, private _store: Store<IAppState>) {
		// this.authenticationService.currentUser.subscribe((x) => {
		// 	this.currentUser = x;
		// 	this._store.dispatch(AuthUserActions.SetUser({ user: x }));
		// 	if (this.currentUser?.permissions?.includes(PermissionType.CanViewActiveCall)) {
		// 		this._store.dispatch(CallActions.GetActiveCall());
		// 	}
		// });
	}

	public ngOnInit(): void {
		this._store.select('userState', 'user').subscribe((user: IUser | null) => {
			if (user?.permissions?.includes(PermissionType.CanViewActiveCall)) {
				this._store.dispatch(CallActions.GetActiveCall());
			}
		});
	}

	public logout(): void {
		// this.authenticationService.logout();
		this._router.navigate(['/login']);
	}
}

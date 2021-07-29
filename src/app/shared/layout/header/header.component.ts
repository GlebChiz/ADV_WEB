import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import { selectUser } from 'src/app/core/store/user/user.selectors';
import { AuthenticationService } from '../../services';

@Component({
	selector: 'advenium-layout-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	user$ = this._store.pipe(select(selectUser));

	constructor(
		private _store: Store<IAppState>,
		private authenticationService: AuthenticationService,
	) {}

	ngOnInit(): void {}

	onLogout(): void {
		this.authenticationService.logout();
		window.location.href = '/login';
	}
}

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/user.model';
import { IAppState } from 'src/app/core/store/state/app.state';
import { selectUser } from 'src/app/core/store/user/user.selectors';
import { AuthenticationService } from '../../services';

@Component({
	selector: 'advenium-layout-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	user$: Observable<IUser>;

	constructor(
		private _store: Store<IAppState>,
		private authenticationService: AuthenticationService,
	) {}

	ngOnInit(): void {
		this.user$ = this._store.pipe(select(selectUser));
	}

	onLogout(): void {
		this.authenticationService.logout();
		window.location.href = '/login';
	}
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/user.model';
// import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { IAppState } from 'src/app/core/store/state/app.state';
import { selectUser } from 'src/app/core/store/user/user.selectors';
import { AuthenticationService } from '../../services/authentification.service';

@Component({
	selector: 'advenium-layout-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	public user$!: Observable<IUser | null>;

	public constructor(
		private _store: Store<IAppState>,
		private authenticationService: AuthenticationService,
	) {}

	public ngOnInit(): void {
		this.user$ = this._store.select(selectUser);
	}

	public onLogout(): void {
		this.authenticationService.logout();
		window.location.href = '/login';
	}
}

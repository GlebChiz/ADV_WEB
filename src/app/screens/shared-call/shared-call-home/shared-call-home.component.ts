import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ICall } from 'src/app/core/models/call.model';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Guid } from 'guid-typescript';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { CallActions } from 'src/app/core/store/call/call.actions';
import { selectCall } from 'src/app/core/store/call/call.selectors';

@Component({
	providers: [],
	templateUrl: './shared-call-home.component.html',
})
export class SharedCallHomeComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	call!: ICall;

	show = true;

	constructor(
		private authenticationService: AuthenticationService,
		private _store: Store<IAppState>,
	) {}

	ngOnInit(): void {
		const user = this.authenticationService.getCurrentUser();
		if (user?.sharedCallId && user.sharedCallId.toString() !== Guid.EMPTY) {
			this._store.dispatch(PageSettingsActions.SetTitle({ settings: { title: `Shared Call` } }));

			this._store.dispatch(CallActions.SetCall({ call: null }));
			this._store.dispatch(CallActions.GetCall({ callId: user?.sharedCallId }));
			this._store.select(selectCall).subscribe((xCall) => {
				this.call = xCall!;
			});
		}
	}

	// ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}
}

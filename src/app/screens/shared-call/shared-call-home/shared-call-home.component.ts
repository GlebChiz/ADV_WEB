import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ICall } from 'src/app/core/models/call.model';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Guid } from 'guid-typescript';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { CallActions } from 'src/app/core/store/call/call.actions';
import { selectCall } from 'src/app/core/store/call/call.selectors';
import { IUser } from 'src/app/core/models/user.model';

@Component({
	providers: [],
	templateUrl: './shared-call-home.component.html',
})
export class SharedCallHomeComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	public call!: ICall | null;

	public show = true;

	public constructor(private _store: Store<IAppState>) {}

	public ngOnInit(): void {
		this._store.select('userState', 'user').subscribe((user: IUser | null) => {
			if (user?.sharedCallId && user.sharedCallId.toString() !== Guid.EMPTY) {
				this._store.dispatch(PageSettingsActions.SetTitle({ settings: { title: `Shared Call` } }));

				this._store.dispatch(CallActions.SetCall({ call: null }));
				this._store.dispatch(CallActions.GetCall({ callId: user?.sharedCallId }));
				this._store.select(selectCall).subscribe((xCall: ICall | null) => {
					this.call = xCall;
				});
			}
		});
		// const user = this.authenticationService.getCurrentUser();
		// if (user?.sharedCallId && user.sharedCallId.toString() !== Guid.EMPTY) {
		// 	this._store.dispatch(PageSettingsActions.SetTitle({ settings: { title: `Shared Call` } }));

		// 	this._store.dispatch(CallActions.SetCall({ call: null }));
		// 	this._store.dispatch(CallActions.GetCall({ callId: user?.sharedCallId }));
		// 	this._store.select(selectCall).subscribe((xCall) => {
		// 		this.call = xCall!;
		// 	});
		// }
	}

	// ngOnChanges(): void {}

	public ngOnDestroy(): void {
		this._destroy$.next(null);
	}
}

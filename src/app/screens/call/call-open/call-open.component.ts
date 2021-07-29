import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { Call, CallerType } from 'src/app/core/models/call.model';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { CallActions } from 'src/app/core/store/call/call.actions';
import { selectActiveCall, selectCall } from 'src/app/core/store/call/call.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';
import { AuthenticationService } from 'src/app/shared/services';

@Component({
	templateUrl: './call-open.component.html',
	providers: [],
})
export class OpenCallComponent implements OnInit, OnChanges, OnDestroy {
	private _destroy$ = new Subject();

	call!: Call;

	constructor(
		private route: ActivatedRoute,
		private _store: Store<IAppState>,
		private router: Router,
		private auth: AuthenticationService,
	) {}

	ngOnInit(): void {
		this._store.dispatch(PageSettingsActions.SetTitle({ settings: { title: `Processing Call` } }));
		this.route.params.subscribe((params) => {
			this._store.dispatch(CallActions.SetCall({ call: null }));
			this._store.dispatch(CallActions.GetCall({ callId: params.id }));
			this._store.pipe(select(selectCall)).subscribe((xCall) => {
				this.call = xCall!;
			});
		});
	}

	ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}
}

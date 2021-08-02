import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ICall } from 'src/app/core/models/call.model';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { CallActions } from 'src/app/core/store/call/call.actions';
import { selectCall } from 'src/app/core/store/call/call.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	templateUrl: './call-open.component.html',
	providers: [],
})
export class OpenCallComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	call!: ICall;

	constructor(
		private route: ActivatedRoute,
		private _store: Store<IAppState>, // private router: Router, // private auth: AuthenticationService,
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

	// ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICall } from 'src/app/core/models/call.model';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { CallActions } from 'src/app/core/store/call/call.actions';
import { selectActiveCall } from 'src/app/core/store/call/call.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	providers: [],
	selector: 'advenium-call-active',
	templateUrl: './call-active.component.html',
})
export class CallActiveComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	public call$!: Observable<ICall | null>;

	public constructor(
		// private route: ActivatedRoute,
		private _store: Store<IAppState>,
		private router: Router,
	) {}

	public ngOnInit(): void {
		this.call$ = this._store.select(selectActiveCall).pipe(takeUntil(this._destroy$));
		this._store.dispatch(PageSettingsActions.SetTitle({ settings: { title: `Active Call` } }));
		this._store.dispatch(CallActions.SetActiveCall({ call: null }));
		this._store.dispatch(CallActions.GetActiveCall());
		this._store
			.select(selectActiveCall)
			.pipe(takeUntil(this._destroy$))
			.subscribe((x) => {
				if (x != null) {
					this.router.navigate(['/call', x.id]);
				}
			});
	}

	// ngOnChanges(): void {}

	public ngOnDestroy(): void {
		this._destroy$.next(null);
	}
}

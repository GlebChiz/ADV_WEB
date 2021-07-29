import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { CallActions } from 'src/app/core/store/call/call.actions';
import { selectActiveCall } from 'src/app/core/store/call/call.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	providers: [],
	selector: 'advenium-call-active',
	templateUrl: './call-active.component.html',
})
export class CallActiveComponent implements OnInit, OnChanges, OnDestroy {
	private _destroy$ = new Subject();

	call$ = this._store.pipe(select(selectActiveCall), takeUntil(this._destroy$));

	constructor(
		private route: ActivatedRoute,
		private _store: Store<IAppState>,
		private router: Router,
	) {}

	ngOnInit(): void {
		this._store.dispatch(PageSettingsActions.SetTitle({ settings: { title: `Active Call` } }));
		this._store.dispatch(CallActions.SetActiveCall(null));
		this._store.dispatch(CallActions.GetActiveCall());
		this._store.pipe(select(selectActiveCall), takeUntil(this._destroy$)).subscribe((x) => {
			if (x != null) {
				this.router.navigate(['/call', x.id]);
			}
		});
	}

	ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}
}

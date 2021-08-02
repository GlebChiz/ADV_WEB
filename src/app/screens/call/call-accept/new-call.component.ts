import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICall, CallerType } from 'src/app/core/models/call.model';
import { CallActions } from 'src/app/core/store/call/call.actions';
import { selectActiveCall } from 'src/app/core/store/call/call.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';
import { AuthenticationService } from 'src/app/shared/services';

@Component({
	providers: [],
	selector: 'advenium-call-accept',
	templateUrl: './new-call.component.html',
})
export class NewCallComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	constructor(
		private route: ActivatedRoute,
		private _store: Store<IAppState>,
		private router: Router,
		private auth: AuthenticationService,
	) {}

	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			const call = {
				toPhone: params.toPhone,
				fromPhone: params.fromPhone,
				callTime: new Date(),
				userId: this.auth.getCurrentUser().userId,
				callerType: CallerType.Unknown,
				patients: [],
			} as unknown as ICall;
			this._store.dispatch(CallActions.SetActiveCall({ call: null }));
			this._store.dispatch(CallActions.CreateCall({ call }));
			this._store.pipe(select(selectActiveCall), takeUntil(this._destroy$)).subscribe((x) => {
				if (x != null) {
					this.router.navigate(['/call', x.id]);
				}
			});
		});
	}

	// ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}
}

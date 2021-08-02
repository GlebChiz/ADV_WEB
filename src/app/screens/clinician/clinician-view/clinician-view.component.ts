import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IClinician } from 'src/app/core/models/clinician.model';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { IAppState } from 'src/app/core/store/state/app.state';
import { ClinicianActions } from 'src/app/core/store/clinician/clinician.actions';
import { selectClinicianModel } from 'src/app/core/store/clinician/clinician.selectors';

@Component({
	providers: [],
	selector: 'advenium-clinician-view',
	templateUrl: './clinician-view.component.html',
})
export class ClinicianViewComponent implements OnDestroy {
	private _destroy$ = new Subject();

	clinicianModel$!: Observable<IClinician | null>;

	fragment!: string;

	constructor(private route: ActivatedRoute, private _store: Store<IAppState>) {
		combineLatest([this.route.params, this.route.fragment]).subscribe(([xParams, xFragment]) => {
			this.fragment = xFragment || '';
			const clinicianId = xParams.id;
			if (clinicianId === Guid.EMPTY) {
				this._store.dispatch(ClinicianActions.NewClinicianModel());
			} else {
				this._store.dispatch(ClinicianActions.GetClinicianModel({ id: clinicianId }));
			}
			this.clinicianModel$ = this._store
				.select(selectClinicianModel)
				.pipe(takeUntil(this._destroy$));
			this.clinicianModel$.subscribe((x) => {
				if (x != null) {
					const title =
						!x.id || x.id.toString() === Guid.EMPTY
							? 'New Clinician'
							: `Clinician: ${x.person.lastname}, ${x.person.firstname}`;
					this._store.dispatch(PageSettingsActions.SetTitle({ settings: { title } }));
				}
			});
		});
	}

	// ngOnInit(): void {}

	// ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	closeEditor(): void {}

	reloadData(): void {}
}
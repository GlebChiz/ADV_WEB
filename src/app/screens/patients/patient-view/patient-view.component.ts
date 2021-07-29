import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { combineLatest, Subject } from 'rxjs';
import { PatientGridService } from 'src/app/core/services/patient.service';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	providers: [],
	selector: 'advenium-patient-view',
	templateUrl: './patient-view.component.html',
})
export class PatientViewComponent implements OnInit, OnChanges, OnDestroy {
	private _destroy$ = new Subject();

	fragment = '';

	patientId!: Guid | string;

	personId!: Guid | string;

	showDetails = false;

	constructor(
		private route: ActivatedRoute,
		private _store: Store<IAppState>,
		private gridService: PatientGridService,
	) {
		combineLatest([this.route.params, this.route.fragment]).subscribe(([xParams, xFragment]) => {
			this.fragment = xFragment || '';
			this.patientId = xParams.id;

			this.gridService.getModel(this.patientId).subscribe((x) => {
				this.personId = x.person.id;
				this._store.dispatch(
					PageSettingsActions.SetTitle({
						settings: { title: `Patient: ${x.person.lastname}, ${x.person.firstname}` },
					}),
				);
				this.showDetails = true;
			});
		});
	}

	ngOnInit(): void {}

	ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	closeEditor(): void {}

	reloadData(): void {}
}

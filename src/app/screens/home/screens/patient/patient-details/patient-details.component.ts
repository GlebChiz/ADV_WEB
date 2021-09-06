import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { Observable } from 'rxjs';
import { PatientDetailsActions } from './store/actions/patient-details.actions';

@Component({
	providers: [],
	selector: 'advenium-patient-details',
	templateUrl: './patient-details.component.html',
	styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent extends UnSubscriber implements OnInit {
	public constructor(
		private store: Store<any>,
		private activatedRoute: ActivatedRoute,
		private _router: Router,
	) {
		super();
	}

	public personId$: Observable<string> = this.store
		.select('patient', 'current', 'person', 'id')
		.pipe(takeUntil(this.unsubscribe$$));

	public ngOnInit(): void {
		this.store.dispatch(
			PatientDetailsActions.GetPatientDetailsPending({
				id: this.activatedRoute.snapshot.params.id,
			}),
		);
	}

	public toInsurance(): void {
		this._router.navigate(['patients', this.activatedRoute.snapshot.params.id, 'insurances']);
	}
}

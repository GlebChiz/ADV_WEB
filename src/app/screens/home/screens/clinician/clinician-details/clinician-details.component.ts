import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ClinicanDetailsActions } from './store/actions/clinician-details.actions';

@Component({
	providers: [],
	selector: 'advenium-patient-details',
	templateUrl: './clinician-details.component.html',
})
export class ClinicianDetailsComponent implements OnInit {
	public constructor(private store: Store<any>, private activatedRoute: ActivatedRoute) {}

	public patientDetails$: Observable<any> = this.store.select('clinician');

	public ngOnInit(): void {
		this.store.dispatch(
			ClinicanDetailsActions.GetClinicanDetailsPending({
				id: this.activatedRoute.snapshot.params.id,
			}),
		);
	}
}

import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { PatientDetailsActions } from './store/actions/patient-details.actions';

@Component({
	providers: [],
	selector: 'advenium-patient-details',
	templateUrl: './patient-details.component.html',
})
export class PatientDetailsComponent implements OnInit {
	public constructor(private store: Store<any>, private activatedRoute: ActivatedRoute) {
		console.log(11);
	}

	public patientDetails$: Observable<any> = this.store.select('patient');

	public ngOnInit(): void {
		console.log(222);
		this.store.dispatch(
			PatientDetailsActions.GetPatientDetailsPending({
				id: this.activatedRoute.snapshot.params.id,
			}),
		);
	}
}

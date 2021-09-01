import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PatientDetailsActions } from './store/actions/patient-details.actions';

@Component({
	providers: [],
	selector: 'advenium-patient-details',
	templateUrl: './patient-details.component.html',
})
export class PatientDetailsComponent implements OnInit {
	public constructor(private store: Store<any>, private activatedRoute: ActivatedRoute) {}

	public myForm!: FormGroup;

	public patientDetails$: Observable<any> = this.store.select('patient');

	public canSaveNow = true;

	public initForm(): void {
		this.myForm = new FormGroup({
			demographic: new FormControl(''),
			// name: new FormControl(this.payer?.name || ''),
			// carrierCode: new FormControl(this.payer?.carrierCode || ''),
			// type: new FormControl(this.payer?.type),
			// notes: new FormControl(this.payer?.notes),
			// payerId: new FormControl(this.payer?.payerId),
			// address: new FormControl(this.payer?.address),
		});
	}

	public ngOnInit(): void {
		this.store.dispatch(
			PatientDetailsActions.GetPatientDetailsPending({
				id: this.activatedRoute.snapshot.params.id,
			}),
		);
		this.initForm();
	}
}

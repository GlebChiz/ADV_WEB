import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { PatientDetailsActions } from './store/actions/patient-details.actions';

@Component({
	providers: [],
	selector: 'advenium-patient-details',
	templateUrl: './patient-details.component.html',
	styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
	public constructor(private store: Store<any>, private activatedRoute: ActivatedRoute) {}

	public current!: any;

	public myForm!: FormGroup;

	public patientDetails$: Observable<any> = this.store.select('patient');

	public personGeneral!: FormGroup;

	public initForm(): void {
		this.personGeneral = new FormGroup({
			demographic: new FormControl(''),
			id: new FormControl(this.current?.id || ''),
			address: new FormGroup({
				address1: new FormControl(this.current?.address1 || ''),
				address2: new FormControl(this.current?.address2 || ''),
				zip: new FormControl(this.current?.zip || ''),
				city: new FormControl(this.current?.city || ''),
				state: new FormControl(this.current?.state || ''),
			}),
			firstname: new FormControl(this.current?.firstname || ''),
			lastname: new FormControl(this.current?.lastname || ''),
			dob: new FormControl(this.current?.dob || ''),
			middlename: new FormControl(this.current?.middlename || ''),
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

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

	public personDemographic!: FormGroup;

	public initForm(): void {
		this.personGeneral = new FormGroup({
			general: new FormControl(''),
		});
	}

	public initDemographicForm(): void {
		this.personDemographic = new FormGroup({
			demographic: new FormControl(''),
		});
	}

	public ngOnInit(): void {
		this.store.dispatch(
			PatientDetailsActions.GetPatientDetailsPending({
				id: this.activatedRoute.snapshot.params.id,
			}),
		);
		this.initForm();
		this.initDemographicForm();
	}
}

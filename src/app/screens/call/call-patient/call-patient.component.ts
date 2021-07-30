import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable, Subject, Subscription } from 'rxjs';
import { ICallPatientIndex, MetaData } from 'src/app/core/models/call.model';

import { IAppState } from 'src/app/core/store/state/app.state';
import { CallService } from 'src/app/core/services/call.service';
import { Guid } from 'guid-typescript';
import { IPerson } from 'src/app/core/models/person.model';

@Component({
	providers: [],
	selector: 'advenium-call-patient',
	templateUrl: './call-patient.component.html',
})
export class CallPatientComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() callPatients!: ICallPatientIndex[];

	@Input() title!: string | null;

	@Input() saveEvent!: Observable<void>;

	@Output() confirmSave: EventEmitter<any> = new EventEmitter();

	@Output() deletePatient: EventEmitter<any> = new EventEmitter();

	private saveSubscription!: Subscription;

	suppressMessages = false;

	myForm!: FormGroup;

	metaData: any = {
		...MetaData,
		lastname: 'Lastname',
		firstname: 'Firstname',
		middlename: 'Middlename',
		dob: 'DOB',
	};

	errors: string[] | null = null;

	messages: string[] | null = null;

	constructor(
		public _store: Store<IAppState>,
		// private actions$: Actions,
		// private _dropDownService: DropDownService,
		private _callService: CallService,
		private formBuilder: FormBuilder,
	) {}

	ngOnInit(): void {
		this.initForm();
		this.saveSubscription = this.saveEvent.subscribe(() => this.submit());
	}

	initForm(): void {
		this.myForm = new FormGroup({
			patients: this.formBuilder.array(
				this.callPatients.map(
					(x) =>
						new FormControl({
							id: x.id,
							lastname: x.patient?.person?.lastname || '',
							firstname: x.patient?.person?.firstname || '',
							middlename: x.patient?.person?.middlename || '',
							dob: x.patient?.person?.dob ? new Date(x.patient?.person?.dob) : null,
						}),
				),
			),
		});
	}

	onDeletePatient() {
		// i: number
		this.deletePatient.emit();
	}

	getTitle(i: number) {
		if (this.title) {
			return this.title;
		}
		return `Child ${i + 1}`;
	}

	getPatientControl(_i: number) {
		// return this.myForm.get('patients')!.controls[i];
	}

	ngOnDestroy(): void {
		this.saveSubscription.unsubscribe();
		this._destroy$.next();
	}

	isNew(i: number) {
		return this.callPatients[i]!.id.toString() === Guid.EMPTY;
	}

	submit(): void {
		this.errors = null;
		const list = this.myForm.value.patients
			.map((v: IPerson | null, index: number) => {
				const cp = this.callPatients[index];
				cp!.patient.person = v;
				return cp;
			})
			.filter(
				(x: any) => x.patient.person.lastname?.length > 0 || x.patient.person.firstname?.length > 0,
			);
		this._callService.updatePatientIndexes(list).subscribe((result) => {
			if (result.isValid === false) {
				this.errors = [result.error];
			} else {
				this.messages = ['Saved successfully'];
				setTimeout(() => (this.messages = null), 5000);
				this.confirmSave.emit();
			}
		});

		/*
        const model = this.getModel();
        this._callService.updateCall(model).subscribe(result => {
            console.log(result);
            if (result.isValid === false) {
                this.errors = [result.error];
            } else {
                this.messages = ['Saved successfully'];
                 setTimeout(() => this.messages = null, 5000);
                 this.confirmSave.emit();
            }
        }); */
	}
}

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

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() public callPatients!: ICallPatientIndex[];

	@Input() public title!: string | null;

	@Input() public saveEvent!: Observable<void>;

	@Output() public confirmSave: EventEmitter<any> = new EventEmitter();

	@Output() public deletePatient: EventEmitter<any> = new EventEmitter();

	private saveSubscription!: Subscription;

	public suppressMessages = false;

	public myForm!: FormGroup;

	public metaData: any = {
		...MetaData,
		lastname: 'Lastname',
		firstname: 'Firstname',
		middlename: 'Middlename',
		dob: 'DOB',
	};

	public errors: string[] | null = null;

	public messages: string[] | null = null;

	public constructor(
		public _store: Store<IAppState>,
		// private actions$: Actions,
		// private _dropDownService: DropDownService,
		private _callService: CallService,
		private formBuilder: FormBuilder,
	) {}

	public ngOnInit(): void {
		this.initForm();
		this.saveSubscription = this.saveEvent.subscribe(() => this.submit());
	}

	public initForm(): void {
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

	public onDeletePatient(): void {
		// i: number
		this.deletePatient.emit();
	}

	public getTitle(i: number): string {
		if (this.title) {
			return this.title;
		}
		return `Child ${i + 1}`;
	}

	public getPatientControl(_i: number): void {
		// return this.myForm.get('patients')!.controls[i];
	}

	public ngOnDestroy(): void {
		this.saveSubscription.unsubscribe();
		this._destroy$.next(null);
	}

	public isNew(i: number): boolean {
		return this.callPatients[i]!.id.toString() === Guid.EMPTY;
	}

	public submit(): void {
		this.errors = null;
		const list: any = this.myForm.value.patients
			.map((v: IPerson, index: number) => {
				const cp: ICallPatientIndex | undefined = this.callPatients[index];
				if (cp) {
					cp.patient.person = v;
				}

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

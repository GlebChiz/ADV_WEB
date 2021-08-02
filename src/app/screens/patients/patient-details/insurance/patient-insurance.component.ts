import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Guid } from 'guid-typescript';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import { IInsurance } from 'src/app/core/models/insurance.model';
import { MetaData } from 'src/app/core/models/patient.model';
import { PersonActions } from 'src/app/core/store/person/person.actions';
import { selectPersonInsuranceModel } from 'src/app/core/store/person/person.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	providers: [],
	selector: 'advenium-patient-insurance',
	templateUrl: './patient-insurance.component.html',
})
export class PatientInsuranceComponent
	extends UnsubscriableBaseDirective
	implements OnInit, OnDestroy
{
	readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() personId!: Guid;

	@Input() saveEvent!: Observable<void>;

	insuranceForm!: FormGroup;

	metaData: any = MetaData;

	personInsuranceModel$: Observable<IInsurance[]> | null = null;

	private _destroy$ = new Subject();

	constructor(
		public _store: Store<IAppState>, // private _dropDownService: DropDownService
	) {
		super();
	}

	ngOnInit(): void {
		this._store.dispatch(PersonActions.GetInsurancePersonData({ id: this.personId }));

		this.personInsuranceModel$ = this._store.pipe(
			select<any, any>(selectPersonInsuranceModel),
			takeUntil(this._destroy$),
		);

		this.personInsuranceModel$.subscribe((x) => this.initForm(x));

		this.saveEvent.subscribe(() => {
			this.submitForm();
		});
	}

	initForm(insurances: IInsurance[]): void {
		this.insuranceForm = new FormGroup({
			primaryInsurance: new FormControl(insurances?.filter((x) => x.orderType === 0)),
			secondaryInsurance: new FormControl(insurances?.filter((x) => x.orderType === 1)),
		});
	}

	submitForm() {
		// console.log(this.insuranceForm.value);
		this._store.dispatch(PersonActions.UpdateInsurancePersonData(this.insuranceForm.value));
	}
}

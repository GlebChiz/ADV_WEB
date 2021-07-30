import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import { IAddress } from 'src/app/core/models/address.model';
import { IDropDownData, LookupTypeCodes } from 'src/app/core/models/kendo/dropdown-data.model';
import { MetaData } from 'src/app/core/models/patient.model';
import { IGeneralPersonData } from 'src/app/core/models/person.model';
import { PersonActions } from 'src/app/core/store/person/person.actions';
import { selectGeneralPersonModel } from 'src/app/core/store/person/person.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	providers: [],
	selector: 'advenium-patient-general',
	templateUrl: './patient-general.component.html',
})
export class PatientGeneralComponent
	extends UnsubscriableBaseDirective
	implements OnInit, OnDestroy
{
	@Input() personId!: Guid;

	@Input() saveEvent!: Observable<void>;

	areas = Array<IDropDownData>();

	patientStatuses = Array<IDropDownData>();

	generalForm!: FormGroup;

	metaData: any = MetaData;

	private _destroy$ = new Subject();

	personGeneralModel$: Observable<IGeneralPersonData> | null = null;

	constructor(public _store: Store<IAppState>, private _dropDownService: DropDownService) {
		super();
	}

	ngOnInit(): void {
		this._dropDownService
			.getLookup(LookupTypeCodes.patientStatus)
			.subscribe((x: IDropDownData[]) => (this.patientStatuses = x));
		this._dropDownService.getLookup(LookupTypeCodes.area).subscribe((x: any) => {
			this.areas = x.map((i: any) => ({ ...i, title: `${i.abbreviation} - ${i.name}` }));
		});

		this._store.dispatch(PersonActions.GetGeneralPersonData({ id: this.personId }));

		this.personGeneralModel$ = this._store.pipe(
			select<any, any>(selectGeneralPersonModel),
			takeUntil(this._destroy$),
		);

		this.personGeneralModel$.subscribe((x) => this.initForm(x));

		this.saveEvent.subscribe(() => {
			this.submitForm();
		});
	}

	initForm(personGeneralModel: IGeneralPersonData): void {
		if (personGeneralModel != null) {
			this.generalForm = new FormGroup({
				id: new FormControl(personGeneralModel.id),
				lastname: new FormControl(personGeneralModel.lastname || ''),
				firstname: new FormControl(personGeneralModel.firstname || ''),
				middlename: new FormControl(personGeneralModel.middlename || ''),
				dob: new FormControl({
					value: personGeneralModel.dob ? new Date(personGeneralModel.dob) : null,
					disabled: false,
				}),
				address: new FormControl(personGeneralModel.address as IAddress),
			});

			this.generalForm.valueChanges.subscribe(() => {
				this.submitForm();
			});
		}
	}

	submitForm() {
		this._store.dispatch(PersonActions.UpdateGeneralPersonData(this.generalForm.value));
	}
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Guid } from 'guid-typescript';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import { IDropDownData, LookupTypeCodes } from 'src/app/core/models/kendo/dropdown-data.model';
import { MetaData } from 'src/app/core/models/patient.model';
import { IPersonDemographicData } from 'src/app/core/models/person.model';
import { PersonActions } from 'src/app/core/store/person/person.actions';
import { selectPersonDemographicModel } from 'src/app/core/store/person/person.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	providers: [],
	selector: 'advenium-patient-demographic',
	templateUrl: './patient-demographic.component.html',
})
export class PatientDemographicComponent
	extends UnsubscriableBaseDirective
	implements OnInit, OnDestroy
{
	readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() personId!: string | Guid;

	@Input() saveEvent!: Observable<void>;

	demographicForm!: FormGroup;

	sexLookup = Array<IDropDownData>();

	genderLookup = Array<IDropDownData>();

	raceLookup = Array<IDropDownData>();

	languageLookup = Array<IDropDownData>();

	maritalLookup = Array<IDropDownData>();

	employementLookup = Array<IDropDownData>();

	metaData: any = MetaData;

	private _destroy$ = new Subject();

	personDemographicModel$: Observable<IPersonDemographicData> | null = null;

	constructor(public _store: Store<IAppState>, private _dropDownService: DropDownService) {
		super();
	}

	ngOnInit(): void {
		this._dropDownService
			.getLookup(LookupTypeCodes.sex)
			.subscribe((x: IDropDownData[]) => (this.sexLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.marital)
			.subscribe((x: IDropDownData[]) => (this.maritalLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.gender)
			.subscribe((x: IDropDownData[]) => (this.genderLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.race)
			.subscribe((x: IDropDownData[]) => (this.raceLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.language)
			.subscribe((x: IDropDownData[]) => (this.languageLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.employement)
			.subscribe((x: IDropDownData[]) => (this.employementLookup = x));

		this._store.dispatch(PersonActions.GetPersonDemographicData({ id: this.personId }));

		this.personDemographicModel$ = this._store.pipe(
			select<IAppState, IPersonDemographicData | any>(selectPersonDemographicModel),
			takeUntil(this._destroy$),
		);

		this.personDemographicModel$.subscribe((x) => this.initForm(x));

		this.saveEvent.subscribe(() => {
			this.submitForm();
		});
	}

	initForm(personDemographicModel: IPersonDemographicData): void {
		if (personDemographicModel != null) {
			this.demographicForm = new FormGroup({
				id: new FormControl(this.personId),
				sexId: new FormControl(personDemographicModel.sexId),
				genderId: new FormControl(personDemographicModel.genderId),
				maritalStatusId: new FormControl(personDemographicModel.maritalStatusId),
				employementId: new FormControl(personDemographicModel.employementId),
				raceIds: new FormControl(personDemographicModel.raceIds),
				languageIds: new FormControl(personDemographicModel.languageIds),
			});

			this.demographicForm.valueChanges.subscribe(() => {
				this.submitForm();
			});
		}
	}

	submitForm() {
		this._store.dispatch(PersonActions.UpdatePersonDemographicData(this.demographicForm.value));
	}
}

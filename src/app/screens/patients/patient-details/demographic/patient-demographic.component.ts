import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Guid } from 'guid-typescript';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import { DropDownData, LookupTypeCodes } from 'src/app/core/models/kendo/dropdown-data.model';
import { MetaData } from 'src/app/core/models/patient.model';
import { PersonDemographicData } from 'src/app/core/models/person.model';
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

	@Input() personId!: Guid;

	@Input() saveEvent!: Observable<void>;

	demographicForm!: FormGroup;

	sexLookup = Array<DropDownData>();

	genderLookup = Array<DropDownData>();

	raceLookup = Array<DropDownData>();

	languageLookup = Array<DropDownData>();

	maritalLookup = Array<DropDownData>();

	employementLookup = Array<DropDownData>();

	metaData: any = MetaData;

	private _destroy$ = new Subject();

	personDemographicModel$: Observable<PersonDemographicData> | null = null;

	constructor(public _store: Store<IAppState>, private _dropDownService: DropDownService) {
		super();
	}

	ngOnInit(): void {
		this._dropDownService
			.getLookup(LookupTypeCodes.sex)
			.subscribe((x: DropDownData[]) => (this.sexLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.marital)
			.subscribe((x: DropDownData[]) => (this.maritalLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.gender)
			.subscribe((x: DropDownData[]) => (this.genderLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.race)
			.subscribe((x: DropDownData[]) => (this.raceLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.language)
			.subscribe((x: DropDownData[]) => (this.languageLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.employement)
			.subscribe((x: DropDownData[]) => (this.employementLookup = x));

		this._store.dispatch(PersonActions.GetPersonDemographicData({ id: this.personId }));

		this.personDemographicModel$ = this._store.pipe(
			select(selectPersonDemographicModel),
			takeUntil(this._destroy$),
		);

		this.personDemographicModel$.subscribe((x) => this.initForm(x));

		this.saveEvent.subscribe(() => {
			this.submitForm();
		});
	}

	initForm(personDemographicModel: PersonDemographicData): void {
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

			this.demographicForm.valueChanges.subscribe((x) => {
				this.submitForm();
			});
		}
	}

	submitForm() {
		this._store.dispatch(PersonActions.UpdatePersonDemographicData(this.demographicForm.value));
	}
}

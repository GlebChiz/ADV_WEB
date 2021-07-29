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
import { PersonContactsData } from 'src/app/core/models/person.model';
import { PersonActions } from 'src/app/core/store/person/person.actions';
import { selectPersonContactsModel } from 'src/app/core/store/person/person.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	providers: [],
	selector: 'advenium-patient-contacts',
	templateUrl: './patient-contacts.component.html',
})
export class PatientContactsComponent
	extends UnsubscriableBaseDirective
	implements OnInit, OnDestroy
{
	readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() personId!: Guid;

	@Input() isSelected = false;

	@Input() saveEvent!: Observable<void>;

	phonePolicyLookup = Array<DropDownData>();

	phoneTypeLookup = Array<DropDownData>();

	contactsForm!: FormGroup;

	metaData: any = MetaData;

	phoneMask = '(999) 000-0000';

	private _destroy$ = new Subject();

	personContactsModel$: Observable<PersonContactsData> | null = null;

	constructor(public _store: Store<IAppState>, private _dropDownService: DropDownService) {
		super();
	}

	ngOnInit(): void {
		this._dropDownService
			.getLookup(LookupTypeCodes.phonePolicy)
			.subscribe((x: DropDownData[]) => (this.phonePolicyLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.phoneType)
			.subscribe((x: DropDownData[]) => (this.phoneTypeLookup = x));

		this._store.dispatch(PersonActions.GetPersonContactsData({ id: this.personId }));

		this.personContactsModel$ = this._store.pipe(
			select(selectPersonContactsModel),
			takeUntil(this._destroy$),
		);

		this.personContactsModel$.subscribe((x) => this.initForm(x));

		this.saveEvent.subscribe(() => {
			this.submitForm();
		});
	}

	initForm(personContactsModel: PersonContactsData): void {
		if (personContactsModel != null) {
			this.contactsForm = new FormGroup({
				id: new FormControl(this.personId || ''),
				email: new FormControl(personContactsModel.email || ''),
				mobilePhone: new FormControl(personContactsModel.mobilePhone || ''),
				homePhone: new FormControl(personContactsModel.homePhone),
				workPhone: new FormControl(personContactsModel.workPhone),
				otherPhone: new FormControl(personContactsModel.otherPhone),
				primaryPhoneType: new FormControl(personContactsModel.primaryPhoneType),
				mobilePhonePolicyId: new FormControl(personContactsModel.mobilePhonePolicyId),
				homePhonePolicyId: new FormControl(personContactsModel.homePhonePolicyId),
				workPhonePolicyId: new FormControl(personContactsModel.workPhonePolicyId),
				otherPhonePolicyId: new FormControl(personContactsModel.otherPhonePolicyId),
			});

			this.contactsForm.valueChanges.subscribe((x) => {
				this.submitForm();
			});
		}
	}

	submitForm() {
		this._store.dispatch(PersonActions.UpdatePersonContactsData(this.contactsForm.value));
	}
}

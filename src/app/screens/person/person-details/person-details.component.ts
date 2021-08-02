import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import { IAddress } from 'src/app/core/models/address.model';
import { IDropDownData, LookupTypeCodes } from 'src/app/core/models/kendo/dropdown-data.model';
import { MetaData, IPerson } from 'src/app/core/models/person.model';
import { PersonActions } from 'src/app/core/store/person/person.actions';
import { IAppState } from 'src/app/core/store/state/app.state';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	providers: [],
	selector: 'advenium-person-details',
	templateUrl: './person-details.component.html',
})
export class PersonDetailsComponent
	extends UnsubscriableBaseDirective
	implements OnInit, OnChanges, OnDestroy
{
	private _destroy$ = new Subject();

	readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() isEditMode = true;

	@Input() model!: IPerson;

	@Input() showCancel = false;

	@Input() fragment = '';

	sexLookup = Array<IDropDownData>();

	genderLookup = Array<IDropDownData>();

	raceLookup = Array<IDropDownData>();

	languageLookup = Array<IDropDownData>();

	maritalLookup = Array<IDropDownData>();

	employementLookup = Array<IDropDownData>();

	phonePolicyLookup = Array<IDropDownData>();

	phoneTypeLookup = Array<IDropDownData>();

	@Output() reloadData: EventEmitter<any> = new EventEmitter();

	@Output() cancelEditing: EventEmitter<any> = new EventEmitter();

	myForm!: FormGroup;

	metaData: any = MetaData;

	errors: string[] | null = null;

	messages: string[] | null = null;

	phoneMask = '(999) 000-0000';

	constructor(
		public _store: Store<IAppState>,
		private actions$: Actions,
		private _dropDownService: DropDownService,
	) {
		super();
		this.saveActions();
	}

	ngOnInit(): void {
		console.log(this.model.wardPatientIds);
		this._dropDownService
			.getLookup(LookupTypeCodes.sex)
			.subscribe((x: IDropDownData[]) => (this.sexLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.race)
			.subscribe((x: IDropDownData[]) => (this.raceLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.marital)
			.subscribe((x: IDropDownData[]) => (this.maritalLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.gender)
			.subscribe((x: IDropDownData[]) => (this.genderLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.employement)
			.subscribe((x: IDropDownData[]) => (this.employementLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.language)
			.subscribe((x: IDropDownData[]) => (this.languageLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.phonePolicy)
			.subscribe((x: IDropDownData[]) => (this.phonePolicyLookup = x));
		this._dropDownService
			.getLookup(LookupTypeCodes.phoneType)
			.subscribe((x: IDropDownData[]) => (this.phoneTypeLookup = x));

		this.initForm();
	}

	ngOnChanges(): void {
		this.initForm();
	}

	title(): string {
		if (!this.model) {
			return '';
		}

		if (!this.isEditMode) {
			return 'View Person';
		}

		if (!this.model.id || this.model.id.toString() === Guid.EMPTY) {
			return 'Create New Person';
		}

		return 'Edit Person';
	}

	initForm(): void {
		this.myForm = new FormGroup({
			lastname: new FormControl(this.model.lastname || ''),
			firstname: new FormControl(this.model.firstname || ''),
			middlename: new FormControl(this.model.middlename || ''),
			dob: new FormControl({
				value: this.model.dob ? new Date(this.model.dob) : null,
				disabled: false,
			}),
			address: new FormControl(this.model.address as IAddress),
			sexId: new FormControl(this.model.sexId),
			genderId: new FormControl(this.model.genderId),
			maritalStatusId: new FormControl(this.model.maritalStatusId),
			employementId: new FormControl(this.model.employementId),
			raceIds: new FormControl(this.model.raceIds),
			languageIds: new FormControl(this.model.languageIds),
			email: new FormControl(this.model.email || ''),
			mobilePhone: new FormControl(this.model.mobilePhone || ''),
			homePhone: new FormControl(this.model.homePhone),
			workPhone: new FormControl(this.model.workPhone),
			otherPhone: new FormControl(this.model.otherPhone),
			primaryPhoneType: new FormControl(this.model.primaryPhoneType),
			mobilePhonePolicyId: new FormControl(this.model.mobilePhonePolicyId),
			homePhonePolicyId: new FormControl(this.model.homePhonePolicyId),
			workPhonePolicyId: new FormControl(this.model.workPhonePolicyId),
			otherPhonePolicyId: new FormControl(this.model.otherPhonePolicyId),
			primaryInsurance: new FormControl(this.model.primaryInsurance),
			secondaryInsurance: new FormControl(this.model.secondaryInsurance),
		});

		if (!this.isEditMode) {
			this.myForm.disable();
		}
	}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	submit(): void {
		const model = this.getModel();
		this._store.dispatch(PersonActions.UpdatePerson(model));
	}

	getModel(): any {
		const { value } = this.myForm;
		const result = {
			...this.model,
			...value,
		};

		return result;
	}

	cancel(): void {
		this.cancelEditing.emit();
	}

	saved(): void {
		this.reloadData.emit();
		this.messages = ['Saved successfully'];
		this.errors = null;
		setTimeout(() => (this.messages = null), 5000);
	}

	selectedTab(fragment: string): boolean {
		return this.fragment.length > 0 ? this.fragment === fragment : fragment === 'general';
	}

	saveActions(): void {
		this.actions$
			.pipe(takeUntil(this.unsubscribe), ofType(PersonActions.UpdatePersonComplete))
			.subscribe(() => this.saved());
		this.actions$
			.pipe(takeUntil(this.unsubscribe), ofType(PersonActions.UpdatePersonFail))
			.subscribe((result) => {
				this.errors = [result.errors];
			});
	}
}

import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';

import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { PersonActions } from 'src/app/store/actions/person.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { Address } from '../../interfaces/address.intarface';
import { IButtonSelector } from '../button-selector/button-selector.component';

@Component({
	selector: 'advenium-demographic-info',
	templateUrl: './demographic.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DemographicComponent),
			multi: true,
		},
	],
})
export class DemographicComponent extends UnSubscriber implements OnInit {
	public constructor(private _store: Store<IStore>) {
		super();
	}

	public personId!: string;

	public personDemographicInfo!: IPersonDemographicInfo;

	public sex: IButtonSelector[] = [];

	public maritalStatus: IButtonSelector[] = [];

	public genderIdentity$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'gender' as any,
	);

	public sexualOrientation$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'sexOrientation' as any,
	);

	public race$: Observable<IDropdownData[]> = this._store.select('dropdown', 'race' as any);

	public employement$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'employement' as any,
	);

	public languages$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'languages' as any,
	);

	public myDemographicForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public initForm(): void {
		this.myDemographicForm = new FormGroup({
			sexId: new FormControl(this.personDemographicInfo?.sexId || ''),
			genderId: new FormControl(this.personDemographicInfo?.genderId || ''),
			sexOrientationId: new FormControl(this.personDemographicInfo?.sexOrientationId || ''),
			maritalStatusId: new FormControl(this.personDemographicInfo?.maritalStatusId || ''),
			employementId: new FormControl(this.personDemographicInfo?.employementId || ''),
			languageIds: new FormControl(this.personDemographicInfo?.languageIds || []),
			raceId: new FormControl(this.personDemographicInfo?.raceId || ''),
		});
		this.myDemographicForm.valueChanges?.subscribe((newData: IPersonDemographicInfo) => {
			this._store.dispatch(
				PersonActions.UpdatePersonDemographicInfoPending({
					id: this.personId,
					personDemographicInfo: newData,
				}),
			);
		});
	}

	public ngOnInit(): void {
		this._store
			.select('patient' as any, 'current')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((current: any) => {
				if (current.person?.id) {
					this.personId = current.person?.id;
					this._store.dispatch(
						PersonActions.GetPersonDemographicInfoPending({ id: current.person?.id }),
					);
				}
			});
		this._store
			.select('person' as any, 'personDemographicInfo')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((personDemographicInfo: IPersonDemographicInfo) => {
				this.personDemographicInfo = personDemographicInfo;
				this.initForm();
			});
		this._store.dispatch(DropdownActions.GetLanguagesPending());
		this._store.dispatch(DropdownActions.GetRacePending());
		this._store.dispatch(DropdownActions.GetSexPending());
		this._store.dispatch(DropdownActions.GetSexOrientationPending());
		this._store.dispatch(DropdownActions.GetEmployementPending());
		this._store.dispatch(DropdownActions.GetMaritalStatusPending());
		this._store.dispatch(DropdownActions.GetGenderPending());
		this._store
			.select('dropdown', 'sex' as any)
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((sex: IDropdownData[]) => {
				this.sex = sex?.map((item: IDropdownData) => {
					return {
						name: item.name,
						id: item.id,
					};
				});
			});
		this._store
			.select('dropdown', 'maritalStatus' as any)
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((maritalStatus: IDropdownData[]) => {
				this.maritalStatus = maritalStatus?.map((item: IDropdownData) => {
					return {
						name: item.name,
						id: item.id,
					};
				});
			});
		this.initForm();
	}
}

export interface IPersonDemographicInfo {
	sexId: string | null;
	genderId: string | null;
	sexOrientationId: string | null;
	maritalStatusId: string | null;
	employementId: string | null;
	raceId: string | null;
	languageIds: string[];
}

export interface IPersonInfo {
	id: string | null;
	lastname: string | null;
	address: Address;
	firstname: string | null;
	middlename: string | null;
	dob: string | null;
}

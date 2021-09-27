import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
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
export class DemographicComponent extends UnSubscriber implements OnInit, OnDestroy, OnChanges {
	public constructor(private _store: Store<IStore>, private _fb: FormBuilder) {
		super();
	}

	@Input() public personId: string = '';

	public personDemographicInfo!: IPersonDemographicInfo | undefined;

	public sex: IButtonSelector[] = [];

	public maritalStatus: IButtonSelector[] = [];

	public genderIdentity$: Observable<IDropdownData[]> = this._store.select('dropdown', 'gender');

	public sexualOrientation$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'sexOrientation',
	);

	public race$: Observable<IDropdownData[]> = this._store.select('dropdown', 'race');

	public employement$: Observable<IDropdownData[]> = this._store.select('dropdown', 'employement');

	public languages$: Observable<IDropdownData[]> = this._store.select('dropdown', 'languages');

	public demographicForm: FormGroup = this._fb.group({
		sexId: [],
		genderId: [],
		sexOrientationId: [],
		maritalStatusId: [],
		employementId: [],
		raceId: [],
		languageIds: [],
	});

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public ngOnChanges(): void {
		if (this.personId) {
			this._store.dispatch(PersonActions.GetPersonDemographicInfoPending({ id: this.personId }));
		}
	}

	public ngOnInit(): void {
		this._store
			.select('person', 'personDemographicInfo')
			.pipe(
				filter<{ [key: string]: IPersonDemographicInfo }[]>(Boolean),
				filter<{ [key: string]: IPersonDemographicInfo }[]>((val) => val.length > 0),
				takeUntil(this.unsubscribe$$),
			)
			.subscribe((personDemographicInfo: { [key: string]: IPersonDemographicInfo }[]) => {
				const currentPersonDemographic: { [key: string]: IPersonDemographicInfo } =
					personDemographicInfo.find((item: { [key: string]: IPersonDemographicInfo }) =>
						// eslint-disable-next-line no-prototype-builtins
						item?.hasOwnProperty(this.personId),
					) ?? {};
				if (currentPersonDemographic && currentPersonDemographic[this.personId]) {
					this.personDemographicInfo = currentPersonDemographic[this.personId];
				}

				this.demographicForm.setValue(currentPersonDemographic[this.personId] || {});
			});
		this._store.dispatch(DropdownActions.GetLanguagesPending());
		this._store.dispatch(DropdownActions.GetRacePending());
		this._store.dispatch(DropdownActions.GetSexPending());
		this._store.dispatch(DropdownActions.GetSexOrientationPending());
		this._store.dispatch(DropdownActions.GetEmployementPending());
		this._store.dispatch(DropdownActions.GetMaritalStatusPending());
		this._store.dispatch(DropdownActions.GetGenderPending());
		this._store
			.select('dropdown', 'sex')
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
			.select('dropdown', 'maritalStatus')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((maritalStatus: IDropdownData[]) => {
				this.maritalStatus = maritalStatus?.map((item: IDropdownData) => {
					return {
						name: item.name,
						id: item.id,
					};
				});
			});
		this.demographicForm.valueChanges
			?.pipe(debounceTime(500), distinctUntilChanged())
			.subscribe((newData: IPersonDemographicInfo) => {
				this._store.dispatch(
					PersonActions.UpdatePersonDemographicInfoPending({
						id: this.personId,
						personDemographicInfo: newData,
					}),
				);
			});
	}

	public ngOnDestroy(): void {
		this._store.dispatch(PersonActions.RemovePersonDemographic({ id: this.personId }));
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
	id: string;
	lastname: string | null;
	address: Address;
	firstname: string | null;
	middlename: string | null;
	dob: string | null;
}

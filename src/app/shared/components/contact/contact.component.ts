import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';

import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { PersonActions } from 'src/app/store/actions/person.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

import { IButtonSelector } from '../button-selector/button-selector.component';

@Component({
	selector: 'advenium-contact-info',
	templateUrl: './contact.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ContactComponent),
			multi: true,
		},
	],
})
export class ContactComponent extends UnSubscriber implements OnInit, OnDestroy, OnChanges {
	public constructor(private _store: Store<IStore>, private _fb: FormBuilder) {
		super();
	}

	@Input() public personId: string = '';

	public preferredContact: IButtonSelector[] = [];

	public isInternet: IButtonSelector[] = [
		{ name: 'Yes', id: true },
		{ name: 'No', id: false },
	];

	public contactForm: FormGroup = this._fb.group({
		email: [],
		useInternet: [],
		preferredContactId: [],
		phones: this._fb.array([]),
	});

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public addPhone(): void {
		const form: FormControl = this._fb.control({
			isPreferred: false,
			phone: [''],
			noVoice: false,
			noText: false,
			typeId: '6a9cb657-fd59-469e-a56b-dbf67b41b590',
		});

		this.phones.push(form);
	}

	public removePhone(index: number): void {
		this.phones.removeAt(index);
	}

	public get phones(): FormArray {
		return this.contactForm.get('phones') as FormArray;
	}

	public set phones(value: FormArray) {
		this.contactForm.get('phones')?.setValue(value);
	}

	public ngOnChanges(): void {
		if (this.personId) {
			this._store.dispatch(PersonActions.GetPersonContactInfoPending({ id: this.personId }));
		}
	}

	public ngOnInit(): void {
		this._store
			.select('person', 'personContactInfo')
			.pipe(filter<{ [key: string]: IPersonContactInfo }[]>(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((personContactInfo: { [key: string]: IPersonContactInfo }[]) => {
				const currentPersonContact: { [key: string]: IPersonContactInfo } =
					personContactInfo.find((item: { [key: string]: IPersonContactInfo }) =>
						// eslint-disable-next-line no-prototype-builtins
						item?.hasOwnProperty(this.personId),
					) ?? {};
				if (currentPersonContact && currentPersonContact[this.personId]) {
					this.contactForm.setValue({
						...currentPersonContact[this.personId],
						useInternet: currentPersonContact[this.personId]?.useInternet,
						phones: [],
					});
					currentPersonContact[this.personId]?.phones.forEach((phone: IPhone) => {
						this.phones.push(new FormControl(phone));
					});
				}
			});
		this.contactForm.valueChanges
			?.pipe(
				filter<IPersonContactInfo>(Boolean),
				takeUntil(this.unsubscribe$$),
				debounceTime(500),
				distinctUntilChanged(),
			)
			.subscribe((newData: IPersonContactInfo) => {
				const correctPhone: IPhone[] = newData.phones.filter((value: IPhone) => {
					return new RegExp(/\d{9,9}/).test(value?.phone);
				});
				if (correctPhone?.length !== newData?.phones?.length) {
					newData.phones = correctPhone;
				}

				this._store.dispatch(
					PersonActions.UpdatePersonContactInfoPending({
						id: this.personId,
						personContactInfo: newData,
					}),
				);
			});
		this._store.dispatch(DropdownActions.GetPreferredContactPending());
		this._store
			.select('dropdown', 'preferredContact')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((preferredContact: IDropdownData[]) => {
				this.preferredContact = preferredContact?.map((item: IDropdownData) => {
					return {
						name: item.name,
						id: item.id,
					};
				});
			});
	}

	public ngOnDestroy(): void {
		this._store.dispatch(PersonActions.RemovePersonContact({ id: this.personId }));
	}
}

export interface IPersonContactInfo {
	useInternet: boolean | string;
	email: string;
	preferredContactId: string;
	phones: IPhone[];
}

export interface IPhone {
	isPreferred: boolean;
	phone: string;
	noVoice: boolean;
	noText: boolean;
	typeId: string;
}

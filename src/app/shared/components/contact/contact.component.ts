import { Component, forwardRef, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';

import { takeUntil } from 'rxjs/operators';
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
export class ContactComponent extends UnSubscriber implements OnInit {
	public constructor(private _store: Store<IStore>) {
		super();
	}

	public personContactInfo!: IPersonContactInfo;

	public personId!: string;

	public preferredContact: IButtonSelector[] = [];

	public isInternet: IButtonSelector[] = [
		{ name: 'Yes', id: 'true' },
		{ name: 'No', id: 'false' },
	];

	public myContactForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	// public getPhone(): FormGroup {
	// 	return this.myContactForm.get('phones') as FormGroup;
	// }

	public addPhone(): void {
		this.phones.push(
			new FormGroup({
				isPreferred: new FormControl(true),
				phone: new FormControl(''),
				noVoice: new FormControl(true),
				noText: new FormControl(true),
				typeId: new FormControl(''),
			}),
		);
		this.initForm();
	}

	public phones: FormArray = new FormArray([]);

	public initForm(): void {
		this.phones = new FormArray([
			...this.personContactInfo?.phones?.map((phone: IPhone) => {
				return new FormGroup({
					isPreferred: new FormControl(phone?.isPreferred || true),
					phone: new FormControl(phone?.phone || ''),
					noVoice: new FormControl(phone?.noVoice || true),
					noText: new FormControl(phone?.noText || true),
					typeId: new FormControl(phone?.typeId || ''),
				});
			}),
		]);

		this.myContactForm = new FormGroup({
			email: new FormControl(this.personContactInfo?.email || ''),
			useInternet: new FormControl(this.personContactInfo?.useInternet.toString() || 'true'),
			preferredContactId: new FormControl(this.personContactInfo?.preferredContactId || ''),
			// phones: new FormArray([
			// 	...this.personContactInfo?.phones?.map((phone: IPhone) => {
			// 		return new FormGroup({
			// 			isPreferred: new FormControl(phone?.isPreferred || true),
			// 			phone: new FormControl(phone?.phone || ''),
			// 			noVoice: new FormControl(phone?.noVoice || true),
			// 			noText: new FormControl(phone?.noText || true),
			// 			typeId: new FormControl(phone?.typeId || ''),
			// 		});
			// 	}),
			// ]),
		});

		this.myContactForm.valueChanges?.subscribe((newData: IPersonContactInfo) => {
			newData.useInternet = newData?.useInternet === 'true';

			this._store.dispatch(
				PersonActions.UpdatePersonContactInfoPending({
					id: this.personId,
					personContactInfo: newData,
				}),
			);
		});
	}

	// public phones = (this.myContactForm?.get('phones') as FormArray) ?? [];

	public ngOnInit(): void {
		this._store
			.select('patient' as any, 'current')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((current: any) => {
				if (current.person?.id) {
					this.personId = current.person?.id;
					this._store.dispatch(
						PersonActions.GetPersonContactInfoPending({ id: current.person?.id }),
					);
				}
			});
		this._store
			.select('person' as any, 'personContactInfo')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((personContactInfo: IPersonContactInfo) => {
				this.personContactInfo = personContactInfo;
				this.initForm();
			});
		this._store.dispatch(DropdownActions.GetPreferredContactPending());
		this._store
			.select('dropdown', 'preferredContact' as any)
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((preferredContact: IDropdownData[]) => {
				this.preferredContact = preferredContact?.map((item: IDropdownData) => {
					return {
						name: item.name,
						id: item.id,
					};
				});
			});

		this.initForm();
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

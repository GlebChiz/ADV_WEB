import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
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

@Component({
	selector: 'advenium-person-info',
	templateUrl: './persona-info.component.html',
	styleUrls: ['./persona-info.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PersonaInfoComponent),
			multi: true,
		},
	],
})
export class PersonaInfoComponent extends UnSubscriber implements OnInit, OnDestroy {
	public constructor(private _store: Store<IStore>) {
		super();
	}

	@Input() public personId!: string;

	public personInfo!: IPersonInfo | undefined;

	public stateCity$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'CityState' as any,
	);

	public myPersonaInfoForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public initForm(): void {
		this.myPersonaInfoForm = new FormGroup({
			id: new FormControl(this.personInfo?.id || ''),
			firstname: new FormControl(this.personInfo?.firstname || ''),
			middlename: new FormControl(this.personInfo?.middlename || ''),
			lastname: new FormControl(this.personInfo?.lastname || ''),
			dob: new FormControl(new Date() || ''),
			address: new FormGroup({
				id: new FormControl(this.personInfo?.address?.id || ''),
				address1: new FormControl(this.personInfo?.address?.address1 || ''),
				address2: new FormControl(this.personInfo?.address?.address2 || ''),
				zip: new FormControl(this.personInfo?.address?.zip || ''),
				city: new FormControl(this.personInfo?.address?.city || ''),
				state: new FormControl(this.personInfo?.address?.state || ''),
			}),
		});

		this.myPersonaInfoForm.valueChanges?.subscribe((newData: IPersonInfo) => {
			this._store.dispatch(
				PersonActions.UpdatePersonInfoPending({
					id: this.personId,
					personInfo: newData,
				}),
			);
		});
	}

	public getAddress(): FormGroup {
		return this.myPersonaInfoForm.get('address') as FormGroup;
	}

	public ngOnInit(): void {
		this._store.dispatch(PersonActions.GetPersonInfoPending({ id: this.personId }));
		this._store
			.select('person' as any, 'personInfo')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((personInfo: { [key: string]: IPersonInfo }[]) => {
				const currentPersonInfo: { [key: string]: IPersonInfo } =
					personInfo.find((item: { [key: string]: IPersonInfo }) =>
						// eslint-disable-next-line no-prototype-builtins
						item.hasOwnProperty(this.personId),
					) ?? {};
				if (currentPersonInfo && currentPersonInfo[this.personId]) {
					this.personInfo = currentPersonInfo[this.personId];
				}

				this.initForm();
			});
		this._store.dispatch(DropdownActions.GetCityStatePending());

		this.initForm();
	}

	public ngOnDestroy(): void {
		this._store.dispatch(PersonActions.RemovePersonInfo({ id: this.personId }));
	}
}

export interface IPersonInfo {
	id: string;
	lastname: string;
	address: Address;
	firstname: string;
	middlename: string;
	dob: string;
}

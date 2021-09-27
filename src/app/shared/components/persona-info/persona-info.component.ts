import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';

import { takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { PersonActions } from 'src/app/store/actions/person.actions';
import { addTimezone, removeTimezone } from 'src/app/utils/timezone';
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
export class PersonaInfoComponent extends UnSubscriber implements OnInit, OnDestroy, OnChanges {
	public constructor(private _store: Store<IStore>, private _fb: FormBuilder) {
		super();
	}

	@Input() public personId!: string;

	public personaInfoForm: FormGroup = this._fb.group({
		firstname: [],
		middlename: [],
		lastname: [],
		dob: [],
		address: [],
	});

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public getAddress(): FormGroup {
		return this.personaInfoForm.get('address') as FormGroup;
	}

	public ngOnChanges(): void {
		if (this.personId) {
			this._store.dispatch(PersonActions.GetPersonInfoPending({ id: this.personId }));
		}
	}

	public ngOnInit(): void {
		this._store
			.select('person' as any, 'personInfo')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((personInfo: { [key: string]: IPersonInfo }[]) => {
				const currentPersonInfo: { [key: string]: IPersonInfo } =
					personInfo.find((item: { [key: string]: IPersonInfo }) =>
						// eslint-disable-next-line no-prototype-builtins
						item?.hasOwnProperty(this.personId),
					) ?? {};
				if (currentPersonInfo && currentPersonInfo[this.personId]) {
					this.personaInfoForm.setValue({
						...currentPersonInfo[this.personId],
						dob: currentPersonInfo[this.personId]?.dob
							? addTimezone(new Date(currentPersonInfo[this.personId]?.dob || ''))
							: '',
					});
				}
			});
		this.personaInfoForm.valueChanges?.subscribe((newData: any) => {
			this._store.dispatch(
				PersonActions.UpdatePersonInfoPending({
					id: this.personId,
					personInfo: {
						...newData,
						dob: removeTimezone(new Date(newData?.dob || '')),
					},
				}),
			);
		});
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
	dob: null | string;
}

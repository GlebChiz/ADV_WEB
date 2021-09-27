import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { IDropdownData } from '../../interfaces/dropdown.interface';
import { IPhone } from '../contact/contact.component';

@Component({
	selector: 'advenium-phone',
	templateUrl: './phone.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PhoneComponent),
			multi: true,
		},
	],
})
export class PhoneComponent implements OnInit, ControlValueAccessor {
	public constructor(private _store: Store<IStore>, private _fb: FormBuilder) {}

	public change: any = () => {};

	public phoneForm: FormGroup = this._fb.group({
		isPreferred: [],
		phone: [],
		noVoice: [],
		noText: [],
		typeId: [],
	});

	public get value(): IPhone {
		return this.phoneForm.value;
	}

	public set value(value: IPhone) {
		this.phoneForm.setValue(value);
	}

	public phoneType$: Observable<IDropdownData[]> = this._store.select('dropdown', 'phoneType');

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetPhoneTypePending());
		this.phoneForm.valueChanges.subscribe((value: IPhone) => {
			this.change(value);
		});
	}

	public writeValue(phone: IPhone): void {
		this.value = phone;
	}

	public registerOnChange(fn: any): void {
		this.change = fn;
	}

	public registerOnTouched(_fn: any): void {}
}

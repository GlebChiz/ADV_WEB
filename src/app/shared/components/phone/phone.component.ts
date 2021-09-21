import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
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
	public constructor(private _store: Store<IStore>) {}

	public phone!: IPhone;

	public change: any = () => {};

	public myPhoneForm!: FormGroup;

	public phoneType$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'phoneType' as any,
	);

	public initForm(): void {
		this.myPhoneForm = new FormGroup({
			isPreferred: new FormControl(this.phone?.isPreferred),
			phone: new FormControl(this.phone?.phone || ''),
			noVoice: new FormControl(this.phone?.noVoice),
			noText: new FormControl(this.phone?.noText),
			typeId: new FormControl(this.phone?.typeId || ''),
		});
		this.myPhoneForm.valueChanges.subscribe((value: IPhone) => {
			this.change(value);
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetPhoneTypePending());
		this.initForm();
	}

	public writeValue(phone: IPhone): void {
		this.phone = phone;
		this.initForm();
	}

	public registerOnChange(fn: any): void {
		this.change = fn;
	}

	public registerOnTouched(_fn: any): void {}
}

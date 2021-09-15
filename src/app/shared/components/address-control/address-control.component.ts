
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Address } from 'src/app/shared/interfaces/address.intarface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { IDropdownData } from '../../interfaces/dropdown.interface';

@Component({
	selector: 'advenium-address',
	templateUrl: './address-control.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AddressControlComponent),
			multi: true,
		},
	],
})

export class AddressControlComponent implements ControlValueAccessor, OnInit {
	public form!: FormGroup;

	public get value(): Address {
		return this.form.value;
	}

	public set value(value: Address) {
		this.form.setValue(value);
	}

	public stateCity$: Observable<IDropdownData[]> = this._store.select('dropdown', 'usState' as any);

	public constructor(private formBuilder: FormBuilder, private _store: Store<IStore>) {}

	public ngOnInit(): void {
		this.form = this.formBuilder.group({
			id: [],
			address1: [],
			address2: [],
			city: [],
			zip: [],
			state: [],
			longitude: [],
			latitude: [],
			mapAddress: [],
		});
		this._store.dispatch(DropdownActions.GetUsStatePending());
	}

	@Input() public isHeader: boolean = true;

	public writeValue(obj: any): void {
		if (obj) {
			this.value = obj;
		}
		if (obj === null) {
			this.form.reset();
		}
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		if (isDisabled) {
			this.form.disable();
		} else {
			this.form.enable();
		}
	}

	public onChange: any = () => {};

	public onTouched: any = () => {};
}
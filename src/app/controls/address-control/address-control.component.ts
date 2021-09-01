import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/shared/interfaces/address.intarface';

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
export class AddressControlComponent implements ControlValueAccessor, OnDestroy {
	public form!: FormGroup;

	public subscriptions: Subscription[] = [];

	public metaData: any;

	public get value(): Address {
		return this.form.value;
	}

	public set value(value: Address) {
		this.form.setValue(value);
		// this.onChange(value);
		// this.onTouched();
	}

	public constructor(private formBuilder: FormBuilder) {
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

		this.subscriptions.push(
			// any time the inner form changes update the parent of any change
			this.form.valueChanges.subscribe((value) => {
				console.log(`hi hi hi hi hi hi: ${value}`);
				this.onChange(value);
				this.onTouched();
			}),
		);
	}

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

	public ngOnDestroy(): void {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}

	public onChange: any = () => {};

	public onTouched: any = () => {};
}

import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IAddress, MetaData } from 'src/app/core/models/address.model';

@Component({
	selector: 'advenium-address',
	templateUrl: './address-control.component.html',
	styleUrls: ['./address-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AddressControlComponent),
			multi: true,
		},
	],
})
export class AddressControlComponent implements ControlValueAccessor, OnDestroy {
	form: FormGroup;

	subscriptions: Subscription[] = [];

	metaData: any = MetaData;

	get value(): IAddress {
		return this.form.value;
	}

	set value(value: IAddress) {
		this.form.setValue(value);
		this.onChange(value);
		this.onTouched();
	}

	constructor(private formBuilder: FormBuilder) {
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
				this.onChange(value);
				this.onTouched();
			}),
		);
	}

	writeValue(obj: any): void {
		if (obj) {
			this.value = obj;
		}
		if (obj === null) {
			this.form.reset();
		}
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		if (isDisabled) {
			this.form.disable();
		} else {
			this.form.enable();
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}

	onChange: any = () => {};

	onTouched: any = () => {};
}

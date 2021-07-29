import { Component, forwardRef, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'advenium-button-selector',
	templateUrl: './button-selector.component.html',
	styleUrls: ['./button-selector.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ButtonSelectorComponent),
			multi: true,
		},
	],
})
export class ButtonSelectorComponent implements ControlValueAccessor, OnDestroy {
	@Input() items!: any[];

	@Input() valueField = 'id';

	@Input() textField = 'name';

	@Input() defaultValue: string | null = null;

	_value: string | null = null;

	_disabled = false;

	@Input() set value(value: string | null) {
		if (value === null || value === '') {
			this._value = this.defaultValue;
		} else {
			this._value = value;
		}
		this.onChange(value);
		this.onTouched();
	}

	@Input() set disabled(value: boolean) {
		this._disabled = value;
	}

	get disabled() {
		return this._disabled;
	}

	get value(): string | null {
		return this._value;
	}

	constructor(private formBuilder: FormBuilder) {}

	writeValue(obj: string): void {
		this.value = obj;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this._disabled = isDisabled;
	}

	onClick(e: any, item: any) {
		if (this.value === item[this.valueField]) {
			this.value = this.defaultValue;
		} else {
			this.value = item[this.valueField];
		}
	}

	ngOnDestroy(): void {}

	onChange: any = () => {};

	vonTouched: any = () => {};
}

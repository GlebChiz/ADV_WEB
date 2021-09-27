/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface IButtonSelector {
	[key: string]: string | number | boolean;
}

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
export class ButtonSelectorComponent implements ControlValueAccessor {
	@Input() public items: IButtonSelector[] = [];

	@Input() public valueField = 'id';

	@Input() public textField = 'name';

	public value: string | number | undefined | boolean;

	public onClick(item: IButtonSelector): void {
		this.value = item[this.valueField];
		this.onChange(this.value);
	}

	public writeValue(obj: string): void {
		this.value = obj;
	}

	public registerOnChange(fn: string): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: string): void {
		this.onTouched = fn;
	}

	public onChange: any = () => {};

	public onTouched: any = () => {};
}

import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { MetaData, IPersonShortModel } from 'src/app/core/models/person.model';
import { CRMSearchActions } from 'src/app/core/store/crmsearch/crmsearch.actions';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-person-short',
	templateUrl: './person-short.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PersonShortComponent),
			multi: true,
		},
	],
})
export class PersonShortComponent implements ControlValueAccessor, OnDestroy {
	public form: FormGroup;

	public subscriptions: Subscription[] = [];

	public metaData: any = MetaData;

	public controlId: string = Guid.create().toString();

	public get value(): IPersonShortModel {
		return this.form.value;
	}

	public set value(value: IPersonShortModel) {
		this.form.setValue(value);
		this.onChange(value);
		this.onTouched();
	}

	public constructor(private formBuilder: FormBuilder, private _store: Store<IAppState>) {
		this.form = this.formBuilder.group({
			id: [],
			lastname: [],
			firstname: [],
			middlename: [],
			dob: [],
		});

		this.subscriptions.push(
			// any time the inner form changes update the parent of any change
			this.form.valueChanges.subscribe((value) => {
				this.onChange(value);
				this.onTouched();
				this._store.dispatch(
					CRMSearchActions.AddLastname({ key: this.controlId, lastname: value.lastname }),
				);
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

	public isNew(): boolean {
		return this.value.id == null || this.value.id.toString() === Guid.EMPTY;
	}
}

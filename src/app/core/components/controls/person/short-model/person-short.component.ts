import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { MetaData, PersonShortModel } from 'src/app/core/models/person.model';
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
	form: FormGroup;

	subscriptions: Subscription[] = [];

	metaData: any = MetaData;

	controlId: string = Guid.create().toString();

	get value(): PersonShortModel {
		return this.form.value;
	}

	set value(value: PersonShortModel) {
		this.form.setValue(value);
		this.onChange(value);
		this.onTouched();
	}

	constructor(private formBuilder: FormBuilder, private _store: Store<IAppState>) {
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

	isNew(): boolean {
		return this.value.id == null || this.value.id.toString() === Guid.EMPTY;
	}
}

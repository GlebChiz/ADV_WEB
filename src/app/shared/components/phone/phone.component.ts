import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { IDropdownData } from '../../interfaces/dropdown.interface';

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
export class PhoneComponent implements OnInit {
	public constructor(private _store: Store<IStore>) {}

	public phoneType$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'phoneType' as any,
	);

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetPhoneTypePending());
	}
}

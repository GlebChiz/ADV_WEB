import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';

import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-demographic-info',
	templateUrl: './demographic.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DemographicComponent),
			multi: true,
		},
	],
})
export class DemographicComponent extends UnSubscriber implements OnInit {
	public constructor(private _store: Store<IStore>) {
		super();
	}

	public administrativeSex$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'sex' as any,
	);

	public genderIdentity$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'gender' as any,
	);

	public sexualOrientation$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'sexOrientation' as any,
	);

	public race$: Observable<IDropdownData[]> = this._store.select('dropdown', 'race' as any);

	public maritalStatus$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'maritalStatus' as any,
	);

	public employement$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'employement' as any,
	);

	public languages$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'languages' as any,
	);

	public demographic: any;

	public myDemographicForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public initForm(): void {
		console.log(123123123123);

		console.log(this.demographic);

		this.myDemographicForm = new FormGroup({
			sex: new FormControl(''),
			gender: new FormControl(''),
			sexOrientation: new FormControl(''),
			maritalStatus: new FormControl(''),
			employement: new FormControl(''),
			languages: new FormControl(''),
			race: new FormControl(''),
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetLanguagesPending());
		this._store.dispatch(DropdownActions.GetRacePending());
		this._store.dispatch(DropdownActions.GetSexPending());
		this._store.dispatch(DropdownActions.GetSexOrientationPending());
		this._store.dispatch(DropdownActions.GetEmployementPending());
		this._store.dispatch(DropdownActions.GetMaritalStatusPending());
		this._store.dispatch(DropdownActions.GetGenderPending());
	}
}

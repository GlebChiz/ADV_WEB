import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { ClinicianTableActions } from 'src/app/screens/home/screens/clinician/clinician-table/clinician-table.actions';

import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-clinician-general-info',
	templateUrl: './clinician-general-info.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ClinicianGeneralInfoComponent),
			multi: true,
		},
	],
})
export class ClinicianGeneralInfoComponent extends UnSubscriber implements OnInit {
	public constructor(private _store: Store<IStore>, private _fb: FormBuilder) {
		super();
	}

	@Input() public clinicianId!: string;

	public type$: Observable<IDropdownData[]> = this._store.select('dropdown', 'clinicianType');

	public area$: Observable<IDropdownData[]> = this._store.select('dropdown', 'areas');

	public clinicianInfoForm: FormGroup = this._fb.group({
		typeId: [],
		npi: [],
		billingCode: [],
		isSupervisor: [],
		title: [],
		areaIds: [],
		serviceTypeIds: [],
	});

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public ngOnInit(): void {
		this._store.dispatch(
			ClinicianTableActions.GetClinicianGeneralInfoPending({ id: this.clinicianId }),
		);
		this._store.dispatch(DropdownActions.GetAreasPending());
		this._store.dispatch(DropdownActions.GetClinicianTypePending());
		this._store
			.select('clinician' as any, 'clinicianInfo')
			.pipe(
				filter<IClinicianGeneralInfo>((val) => val && Object.keys(val).length !== 0),
				takeUntil(this.unsubscribe$$),
			)
			.subscribe((clinicianInfo: IClinicianGeneralInfo) => {
				this.clinicianInfoForm.setValue({
					...clinicianInfo,
					title: '',
					isSupervisor: clinicianInfo?.isSupervisor || false,
				});
			});
		this.clinicianInfoForm.valueChanges
			.pipe(debounceTime(500), distinctUntilChanged())
			.subscribe((newData: IClinicianGeneralInfo) => {
				this._store.dispatch(
					ClinicianTableActions.UpdateClinicianGeneralInfoPending({
						id: this.clinicianId,
						clinicianInfo: newData,
					}),
				);
			});
	}
}

export interface IClinicianGeneralInfo {
	typeId: string | null;
	npi: string;
	billingCode: string;
	isSupervisor: boolean;
	title: string;
	areaIds: string[];
	serviceTypeIds: string[];
}

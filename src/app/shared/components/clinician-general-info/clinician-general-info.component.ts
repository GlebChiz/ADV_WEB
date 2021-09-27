import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';

import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
	public constructor(private _store: Store<IStore>) {
		super();
	}

	@Input() public clinicianId!: string;

	public clinicianInfo!: IClinicianGeneralInfo;

	public type$: Observable<IDropdownData[]> = this._store.select('dropdown', 'clinicianType');

	public area$: Observable<IDropdownData[]> = this._store.select('dropdown', 'areas');

	public myClinicianInfoForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public initForm(): void {
		this.myClinicianInfoForm = new FormGroup({
			typeId: new FormControl(this.clinicianInfo?.typeId || ''),
			npi: new FormControl(this.clinicianInfo?.npi || ''),
			billingCode: new FormControl(this.clinicianInfo?.billingCode || ''),
			isSupervisor: new FormControl(this.clinicianInfo?.isSupervisor || false),
			title: new FormControl(this.clinicianInfo?.title || ''),
			areaIds: new FormControl(this.clinicianInfo?.areaIds || ''),
			serviceTypeIds: new FormControl(this.clinicianInfo?.serviceTypeIds || ''),
		});

		this.myClinicianInfoForm.valueChanges?.subscribe((newData: IClinicianGeneralInfo) => {
			this._store.dispatch(
				ClinicianTableActions.UpdateClinicianGeneralInfoPending({
					id: this.clinicianId,
					clinicianInfo: newData,
				}),
			);
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(
			ClinicianTableActions.GetClinicianGeneralInfoPending({ id: this.clinicianId }),
		);
		this._store.dispatch(DropdownActions.GetAreasPending());
		this._store.dispatch(DropdownActions.GetClinicianTypePending());
		this._store
			.select('clinician' as any, 'clinicianInfo')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((clinicianInfo: IClinicianGeneralInfo) => {
				this.clinicianInfo = clinicianInfo;
				this.initForm();
			});

		this.initForm();
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

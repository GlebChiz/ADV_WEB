import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';

import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PatientTableActions } from 'src/app/screens/home/screens/patient/patient-table/patient-table.actions';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-patient-general-info',
	templateUrl: './patient-general-info.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PatientGeneralInfoComponent),
			multi: true,
		},
	],
})
export class PatientGeneralInfoComponent extends UnSubscriber implements OnInit {
	public constructor(private _store: Store<IStore>) {
		super();
	}

	@Input() public patientId!: string;

	public patientInfo!: IPatientGeneralInfo;

	public status$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'patientStatus' as any,
	);

	public area$: Observable<IDropdownData[]> = this._store.select('dropdown', 'areas' as any);

	public myPatientInfoForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public initForm(): void {
		this.myPatientInfoForm = new FormGroup({
			personId: new FormControl(this.patientInfo?.personId || ''),
			areaId: new FormControl(this.patientInfo?.areaId || ''),
			statusId: new FormControl(this.patientInfo?.statusId || ''),
		});

		this.myPatientInfoForm.valueChanges?.subscribe((newData: IPatientGeneralInfo) => {
			this._store.dispatch(
				PatientTableActions.UpdatePatientGeneralInfoPending({
					id: this.patientId,
					patientInfo: newData,
				}),
			);
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(PatientTableActions.GetPatientGeneralInfoPending({ id: this.patientId }));
		this._store.dispatch(DropdownActions.GetAreasPending());
		this._store.dispatch(DropdownActions.GetPatientStatusPending());
		this._store
			.select('patientTable' as any, 'patientInfo')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((patientInfo: IPatientGeneralInfo) => {
				this.patientInfo = patientInfo;
				this.initForm();
			});

		this.initForm();
	}
}

export interface IPatientGeneralInfo {
	personId: string;
	areaId: string | null;
	statusId: string | null;
}

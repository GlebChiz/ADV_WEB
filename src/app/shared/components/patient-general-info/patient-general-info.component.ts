import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { debounce } from 'lodash';

import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
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
	public constructor(private _store: Store<IStore>, private _fb: FormBuilder) {
		super();
	}

	@Input() public patientId!: string;

	public status$: Observable<IDropdownData[]> = this._store.select('dropdown', 'patientStatus');

	public area$: Observable<IDropdownData[]> = this._store.select('dropdown', 'areas');

	public patientInfoForm: FormGroup = this._fb.group({
		areaId: [],
		statusId: [],
	});

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	private debouncedRequest = debounce((action: any) => this._store.dispatch(action), 1000, {});

	public ngOnInit(): void {
		this._store.dispatch(PatientTableActions.GetPatientGeneralInfoPending({ id: this.patientId }));
		this._store.dispatch(DropdownActions.GetAreasPending());
		this._store.dispatch(DropdownActions.GetPatientStatusPending());
		this._store
			.select('patient' as any, 'patientInfo')
			.pipe(
				filter<IPatientGeneralInfo>(Boolean),
				filter<IPatientGeneralInfo>((val) => Object.keys(val).length !== 0),
				takeUntil(this.unsubscribe$$),
			)
			.subscribe((patientInfo: IPatientGeneralInfo) => {
				this.patientInfoForm.setValue(patientInfo);
			});
		this.patientInfoForm.valueChanges?.subscribe((newData: IPatientGeneralInfo) => {
			this.debouncedRequest(
				PatientTableActions.UpdatePatientGeneralInfoPending({
					id: this.patientId,
					patientInfo: newData,
				}),
			);
		});
	}
}

export interface IPatientGeneralInfo {
	areaId: string | null;
	statusId: string | null;
}

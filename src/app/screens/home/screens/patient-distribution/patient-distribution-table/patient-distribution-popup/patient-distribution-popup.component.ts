import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { filter, takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-patient-distribution-popup',
	templateUrl: './patient-distribution-popup.component.html',
	styleUrls: ['./patient-distribution-popup.component.scss'],
})
export class PatientDistributionPopupComponent extends UnSubscriber implements OnInit, OnChanges {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public patientDistribution: any;

	public myPatientDistributionForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({
			...this.patientDistribution,
			...this.myPatientDistributionForm.value,
		});
	}

	public initForm(): void {
		this.myPatientDistributionForm = new FormGroup({
			id: new FormControl(this.patientDistribution?.id || ''),
			clinicianName: new FormControl(this.patientDistribution?.clinicianName || ''),
			patientName: new FormControl(this.patientDistribution?.patientName || ''),
			patientId: new FormControl(this.patientDistribution?.patientId || ''),
			startDate: new FormControl(this.patientDistribution?.startDate || ''),
			clinicianId: new FormControl(this.patientDistribution?.clinicianId || ''),
		});
		this.myPatientDistributionForm.controls.clinicianName?.disable();
		this.myPatientDistributionForm.controls.patientName?.disable();
	}

	public ngOnInit(): void {
		this._store
			.select('patientSupervisorTable' as any)
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((patientDistributionTable: any) => {
				this.patientDistribution = patientDistributionTable.current;
				this.initForm();
			});
		this.initForm();
	}

	public ngOnChanges(): void {
		this.initForm();
	}
}

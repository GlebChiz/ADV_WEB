import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { filter, takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { ClinicianDropdownPopupComponent } from '../../patient-distribution-group-popups/clinician-dropdown-popup/clinician-dropdown-popup.component';
import { PatientDropdownPopupComponent } from '../../patient-distribution-group-popups/patient-dropdown-popup/patient-dropdown-popup.component';

@Component({
	selector: 'advenium-patient-distribution-popup',
	templateUrl: './patient-distribution-popup.component.html',
	styleUrls: ['./patient-distribution-popup.component.scss'],
})
export class PatientDistributionPopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogService: DialogRef,
		private dialogService: DialogService,
		private _store: Store<IStore>,
	) {
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
			clinicianName: new FormControl(this.patientDistribution?.clinicianName || ''),
			patientName: new FormControl(this.patientDistribution?.patientName || ''),
			patientId: new FormControl(this.patientDistribution?.patientId || ''),
			startDate: new FormControl(
				this.patientDistribution?.startDate
					? new Date(Date.parse(this.patientDistribution?.startDate))
					: new Date(),
			),
			clinicianId: new FormControl(this.patientDistribution?.clinicianId || ''),
		});
	}

	public ngOnInit(): void {
		this._store
			.select('patientsupervisorTable' as any)
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((patientDistributionTable: any) => {
				this.patientDistribution = patientDistributionTable.current;
				this.initForm();
			});
	}

	public openDeialogClinician(): void {
		const dialog: DialogRef = this.dialogService.open({
			title: 'Clinician',
			content: ClinicianDropdownPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});
		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				this.myPatientDistributionForm.setValue({
					...this.myPatientDistributionForm.value,
					clinicianName: result.clinician.name,
					clinicianId: result.clinician.id,
				});
			}
		});
	}

	public openDeialogPatient(): void {
		const dialog: DialogRef = this.dialogService.open({
			title: 'Patient',
			content: PatientDropdownPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});
		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				this.myPatientDistributionForm.setValue({
					...this.myPatientDistributionForm.value,
					patientName: result.patient.name,
					patientId: result.patient.id,
				});
			}
		});
	}
}

export interface IPatientDistributionCurrent {
	id: string;
	clinicianId: string;
	patientId: string;
	startDate: string;
	clinicianName: string;
	patientName: string;
}

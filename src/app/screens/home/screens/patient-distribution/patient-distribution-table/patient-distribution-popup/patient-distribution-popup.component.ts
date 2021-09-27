import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { filter, takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { addTimezone, removeTimezone } from 'src/app/utils/timezone';
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
		private _fb: FormBuilder,
	) {
		super();
	}

	public isEdit: boolean = false;

	public patientDistributionForm: FormGroup = this._fb.group({
		id: [],
		clinicianId: [],
		clinicianName: [],
		patientId: [],
		patientName: [],
		startDate: [],
	});

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({
			...this.patientDistributionForm.value,
			startDate: this.patientDistributionForm.value?.startDate
				? removeTimezone(this.patientDistributionForm.value?.startDate)
				: '',
		});
	}

	public ngOnInit(): void {
		this._store
			.select('patientsupervisor' as any, 'table', 'current')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((patientDistribution: any) => {
				this.isEdit = true;
				this.patientDistributionForm.setValue({
					...patientDistribution,
					startDate: patientDistribution?.startDate
						? addTimezone(patientDistribution?.startDate)
						: '',
				});
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
				this.patientDistributionForm.setValue({
					...this.patientDistributionForm.value,
					clinicianName: result.clinician.name,
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
				this.patientDistributionForm.setValue({
					...this.patientDistributionForm.value,
					patientName: result.patient.name,
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

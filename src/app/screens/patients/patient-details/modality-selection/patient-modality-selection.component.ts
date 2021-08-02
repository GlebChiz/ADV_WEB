import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import { PatientModalityStatus } from 'src/app/core/enums/patient.modality.status';
import { IDropDownData } from 'src/app/core/models/kendo/dropdown-data.model';
import { MetaData, IPatient } from 'src/app/core/models/patient.model';
import { IAppState } from 'src/app/core/store/state/app.state';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	providers: [],
	selector: 'advenium-patient-modality-selection',
	templateUrl: './patient-modality-selection.component.html',
})
export class PatientModalitySelectionComponent
	extends UnsubscriableBaseDirective
	implements OnInit, OnDestroy
{
	readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() model!: IPatient;

	modalities = Array<IDropDownData>();

	modalitySelectionForm!: FormGroup;

	requestedModalities!: string[];

	approvedModalities!: string[];

	deniedModalities!: string[];

	metaData: any = MetaData;

	constructor(public _store: Store<IAppState>, private _dropDownService: DropDownService) {
		super();
	}

	selectedModalities(status: PatientModalityStatus): string[] {
		return this.model.modalities
			.filter((x) => x.status === status)
			.map((x) => x.modalityId.toString());
	}

	isModalityUsed(id: string, status: PatientModalityStatus): boolean {
		const isUsed =
			(this.modalitySelectionForm.value.requestedModalities.includes(id) &&
				status !== PatientModalityStatus.Requested) ||
			(this.modalitySelectionForm.value.deniedModalities.includes(id) &&
				status !== PatientModalityStatus.Denied) ||
			(this.modalitySelectionForm.value.approvedModalities.includes(id) &&
				status !== PatientModalityStatus.Approved);
		return isUsed;
	}

	availableModalities(status: PatientModalityStatus) {
		if (!this.modalities) {
			return [];
		}
		return this.modalities.filter((x) => this.isModalityUsed(x.id, status) === false);
	}

	ngOnInit(): void {
		this._dropDownService
			.getModalities()
			.subscribe((modalities: IDropDownData[]) => (this.modalities = modalities));
		this.initForm();
	}

	initForm(): void {
		this.requestedModalities = this.selectedModalities(PatientModalityStatus.Requested);
		this.approvedModalities = this.selectedModalities(PatientModalityStatus.Approved);
		this.deniedModalities = this.selectedModalities(PatientModalityStatus.Denied);
		this.modalitySelectionForm = new FormGroup({
			primaryInsurance: new FormControl(this.model.person!.primaryInsurance),
			secondaryInsurance: new FormControl(this.model.person!.secondaryInsurance),
			requestedModalities: new FormControl(this.requestedModalities),
			approvedModalities: new FormControl(this.approvedModalities),
			deniedModalities: new FormControl(this.deniedModalities),
		});
	}
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Guid } from 'guid-typescript';

import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import { IDropDownData } from 'src/app/core/models/kendo/dropdown-data.model';
import { IPatientModality, MetaData } from 'src/app/core/models/patient.model';
import { ModalityService } from 'src/app/core/services/modality.service';
import { ValidationMessageService } from 'src/app/core/services/validation.message.service';

@Component({
	providers: [],
	selector: 'advenium-modality-details',
	templateUrl: './modality-details.component.html',
})
export class ModalityDetailsComponent extends UnsubscriableBaseDirective {
	public constructor(
		// public _store: Store<IAppState>,
		// private _dropDownService: DropDownService,
		public validationService: ValidationMessageService,
		private _service: ModalityService,
	) {
		super();
	}

	public metaData: any = MetaData;

	@Output() public saveModality: EventEmitter<any> = new EventEmitter();

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public cancel(): void {
		this.model = null;
	}

	public getModel(): any {
		const { value } = this.myForm;
		const result = {
			...this.model,
			...value,
		};

		return result;
	}

	public saved(): void {
		this.saveModality.emit();
		this.model = null;
	}

	public saveActions(result: any): void {
		if (result.isSuccess === true) {
			this.saved();
		} else {
			this.validationService.displayResponse(result);
		}
	}

	public submit(): void {
		const model = this.getModel();
		if (!model.type) {
			this.validationService.display(['Payer type is empty'], false);
			return;
		}
		if (!model.id || model.id.toString() === Guid.EMPTY) {
			this._service.createModel(model).subscribe((result) => {
				this.saveActions(result);
			});
		} else {
			this._service.updateModel(model).subscribe((result) => {
				this.saveActions(result);
			});
		}
	}

	public myForm!: FormGroup;

	public modalityTypes: IDropDownData[] = Array<IDropDownData>();

	@Input() public model!: IPatientModality | null;

	@Input() public readonly = false;

	public title(): string {
		if (!this.model) {
			return '';
		}

		if (this.readonly === true) {
			return 'View Modality';
		}

		if (!this.model.modalityId || this.model.modalityId.toString() === Guid.EMPTY) {
			return 'Create New Modality';
		}

		return 'Edit Modality';
	}
}

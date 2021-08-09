import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Guid } from 'guid-typescript';

import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import { IDropDownData } from 'src/app/core/models/kendo/dropdown-data.model';
import { MetaData } from 'src/app/core/models/patient.model';
import { ValidationMessageService } from 'src/app/core/services/validation.message.service';
import { GridActions } from 'src/app/core/store/grid/grid.actions';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	providers: [],
	selector: 'advenium-modality-details',
	templateUrl: './modality-details.component.html',
})
export class ModalityDetailsComponent
	extends UnsubscriableBaseDirective
	implements OnChanges, OnInit
{
	public constructor(
		public validationService: ValidationMessageService,
		private _store: Store<IAppState>,
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

	public ngOnChanges(): void {
		this.initForm();
	}

	public ngOnInit(): void {
		this.initForm();
	}

	public initForm(): void {
		this.myForm = new FormGroup({
			name: new FormControl(this.model?.name || ''),
			id: new FormControl(this.model?.id || ''),
		});
		if (this.readonly === true) {
			this.myForm.disable();
		}
		this.validationService.clear();
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

		if (!this.model.id) {
			this._store.dispatch(GridActions.SaveNewEntity({ entity: model }));
		} else {
			this._store.dispatch(GridActions.SaveChangedEntity({ entity: model }));
		}
		this.model = null;
	}

	public myForm!: FormGroup;

	public modalityTypes: IDropDownData[] = Array<IDropDownData>();

	@Input() public model!: any;

	@Input() public readonly = false;

	@Output() public savePayer: EventEmitter<any> = new EventEmitter();

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

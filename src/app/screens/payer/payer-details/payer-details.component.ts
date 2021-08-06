import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { groupBy } from '@progress/kendo-data-query';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import { IDropDownData, LookupTypeCodes } from 'src/app/core/models/kendo/dropdown-data.model';
import { MetaData, IPayer } from 'src/app/core/models/payer.model';
import { PayerGridService } from 'src/app/core/services/payer.service';
import { ValidationMessageService } from 'src/app/core/services/validation.message.service';
import { IAppState } from 'src/app/core/store/state/app.state';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	providers: [],
	selector: 'advenium-payer-details',
	templateUrl: './payer-details.component.html',
})
export class PayerDetailsComponent
	extends UnsubscriableBaseDirective
	implements OnInit, OnChanges, OnDestroy
{
	private _destroy$ = new Subject();

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() public readonly = false;

	@Input() public model!: IPayer | null;

	public payerTypes: any = Array<IDropDownData>();

	@Output() public savePayer: EventEmitter<any> = new EventEmitter();

	public myForm!: FormGroup;

	public metaData: any = MetaData;

	public phoneMask = '(999) 000-0000';

	public constructor(
		public _store: Store<IAppState>,
		private _dropDownService: DropDownService,
		public validationService: ValidationMessageService,
		private _service: PayerGridService,
	) {
		super();
	}

	public ngOnInit(): void {
		this._dropDownService.getLookup(LookupTypeCodes.payerType).subscribe((x: any) => {
			x.forEach((k: any) => (k.parentName = this._dropDownService.getName(k.parentId, x)));
			this.payerTypes = groupBy(
				x.filter((y: any) => y.parentId != null),
				[{ field: 'parentName' }],
			);
		});
		this.initForm();
	}

	public ngOnChanges(): void {
		this.initForm();
	}

	public title(): string {
		if (!this.model) {
			return '';
		}

		if (this.readonly === true) {
			return 'View Payer';
		}

		if (!this.model.id || this.model.id.toString() === Guid.EMPTY) {
			return 'Create New Payer';
		}

		return 'Edit Payer';
	}

	public initForm(): void {
		this.myForm = new FormGroup({
			name: new FormControl(this.model?.name || ''),
			carrierCode: new FormControl(this.model?.carrierCode || ''),
			type: new FormControl(this.model?.type),
			notes: new FormControl(this.model?.notes),
			payerId: new FormControl(this.model?.payerId),
			address: new FormControl(this.model?.address),
		});

		if (this.readonly === true) {
			this.myForm.disable();
		}
		this.validationService.clear();
	}

	public ngOnDestroy(): void {
		this._destroy$.next(null);
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

	public getModel(): any {
		const { value } = this.myForm;
		const result = {
			...this.model,
			...value,
		};

		return result;
	}

	public cancel(): void {
		this.model = null;
	}

	public saved(): void {
		this.savePayer.emit();
		this.model = null;
	}

	public saveActions(result: any): void {
		if (result.isSuccess === true) {
			this.saved();
		} else {
			this.validationService.displayResponse(result);
		}
	}
}

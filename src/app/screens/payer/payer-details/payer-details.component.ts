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

	readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() readonly = false;

	@Input() model!: IPayer | null;

	payerTypes: any = Array<IDropDownData>();

	@Output() savePayer: EventEmitter<any> = new EventEmitter();

	myForm!: FormGroup;

	metaData: any = MetaData;

	phoneMask = '(999) 000-0000';

	constructor(
		public _store: Store<IAppState>,
		private _dropDownService: DropDownService,
		public validationService: ValidationMessageService,
		private _service: PayerGridService,
	) {
		super();
	}

	ngOnInit(): void {
		this._dropDownService.getLookup(LookupTypeCodes.payerType).subscribe((x: any) => {
			x.forEach((k: any) => (k.parentName = this._dropDownService.getName(k.parentId, x)));
			this.payerTypes = groupBy(
				x.filter((y: any) => y.parentId != null),
				[{ field: 'parentName' }],
			);
		});
		this.initForm();
	}

	ngOnChanges(): void {
		this.initForm();
	}

	title(): string {
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

	initForm(): void {
		this.myForm = new FormGroup({
			name: new FormControl(this.model!.name || ''),
			carrierCode: new FormControl(this.model!.carrierCode || ''),
			type: new FormControl(this.model!.type),
			notes: new FormControl(this.model!.notes),
			payerId: new FormControl(this.model!.payerId),
			address: new FormControl(this.model!.address),
		});

		if (this.readonly === true) {
			this.myForm.disable();
		}
		this.validationService.clear();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	submit(): void {
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

	getModel(): any {
		const { value } = this.myForm;
		const result = {
			...this.model,
			...value,
		};

		return result;
	}

	cancel(): void {
		this.model = null;
	}

	saved(): void {
		this.savePayer.emit();
		this.model = null;
	}

	saveActions(result: any): void {
		if (result.isSuccess === true) {
			this.saved();
		} else {
			this.validationService.displayResponse(result);
		}
	}
}

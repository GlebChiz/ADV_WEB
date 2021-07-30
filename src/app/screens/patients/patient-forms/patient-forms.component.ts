import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable, Subject, Subscription } from 'rxjs';
import { IAppState } from 'src/app/core/store/state/app.state';
import {
	IEditingForm,
	IFormGroupItem,
	FormGroupType,
	FormPersonRole,
	IFormSection,
} from 'src/app/core/models/form.model';
import { FormService } from 'src/app/core/services/form.service';
import { ValidationMessageService } from 'src/app/core/services/validation.message.service';
import { Guid } from 'guid-typescript';

@Component({
	providers: [],
	selector: 'advenium-patient-forms',
	templateUrl: './patient-forms.component.html',
})
export class PatientFormsComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() formGroupTypes!: FormGroupType[];

	@Input() personId!: Guid;

	@Input() saveEvent!: Observable<void>;

	private saveSubscription!: Subscription;

	@Output() confirmSave: EventEmitter<any> = new EventEmitter();

	formSection!: IFormSection;

	formModel: IEditingForm | null = null;

	constructor(
		public _store: Store<IAppState>,
		public validationService: ValidationMessageService,
		private _formService: FormService, // private router: Router,
	) {}

	ngOnInit(): void {
		if (this.saveEvent) {
			this.saveSubscription = this.saveEvent.subscribe(() => this.submit());
		}

		this.loadFormSection();
	}

	loadFormSection() {
		const filter = {
			personId: this.personId.toString(),
			formGroupTypes: this.formGroupTypes,
			formPersonRoles: [FormPersonRole.Patient],
		};
		this._formService.getFormSection(filter).subscribe((x) => {
			this.formSection = x;
		});
	}

	ngOnDestroy(): void {
		if (this.saveSubscription) {
			this.saveSubscription.unsubscribe();
		}
		this._destroy$.next();
	}

	submit(): void {
		this.confirmSave.emit();
	}

	availableFormTypes() {
		const list: Object[] = [];

		this.formSection.groups.forEach((g) => {
			g.items.forEach((i: IFormGroupItem) => {
				if (i.formTypeId) {
					list.push({
						id: i.formTypeId,
						name: i.formTypeName,
						isRequired: i.isRequired,
					});
				}
			});
		});

		return list;
	}

	onFormCreate(data: any) {
		const createFormModel = {
			revisionId: data.id,
			formPersons: [
				{
					personId: this.personId.toString(),
					role: FormPersonRole.Patient,
				},
			],
		};
		this._formService.createForm(createFormModel).subscribe((response) => {
			if (response.isValid === true) {
				this.loadForm(response.formId);
				this.loadFormSection();
			} else {
				this.validationService.displayResponse(response);
			}
		});
	}

	loadForm(formId: Guid) {
		this._formService.getForm(formId).subscribe((x) => {
			this.formModel = x;
		});
	}

	openForm(e: MouseEvent, formId: Guid) {
		e.preventDefault();
		this.loadForm(formId);
	}

	closeForm(e: MouseEvent) {
		e.preventDefault();
		this.loadFormSection();
		this.formModel = null;
	}

	downloadForm(e: MouseEvent, file: any) {
		e.preventDefault();
		this._formService.getPdfFile(file.id).subscribe((response) => {
			const a = document.createElement('a');
			a.href = window.URL.createObjectURL(response.body);
			a.target = '_blank';
			a.download = `${file.id}.pdf`;
			a.click();
		});
	}
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import { IFormGroup, FormPersonRole } from 'src/app/core/models/form.model';
import { IDropDownData, FormTypeLookupCodes } from 'src/app/core/models/kendo/dropdown-data.model';
import { MetaData, IPatient } from 'src/app/core/models/patient.model';
import { FormService } from 'src/app/core/services/form.service';
import { IAppState } from 'src/app/core/store/state/app.state';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	providers: [],
	selector: 'advenium-patient-forms',
	templateUrl: './patient-forms.component.html',
})
export class PatientFormsComponent extends UnsubscriableBaseDirective implements OnInit, OnDestroy {
	readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() model!: IPatient;

	formTypeLookup = Array<IDropDownData>();

	metaData: any = MetaData;

	modalitySelectionForm!: IFormGroup;

	constructor(
		public _store: Store<IAppState>,
		private _dropDownService: DropDownService,
		private formService: FormService,
	) {
		super();
	}

	ngOnInit(): void {
		this._dropDownService.getFormTypeLookup(FormTypeLookupCodes.PatientForms).subscribe((x) => {
			this.formTypeLookup = x;
		});
		this.initForm();
	}

	availableFormTypes() {
		const list: Object[] = [];
		this.model.groups.forEach((g) => {
			g.items.forEach((i) => {
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
					personId: this.model.person!.id!,
					role: FormPersonRole.Patient,
				},
			],
		};
		this.formService.createForm(createFormModel).subscribe(() => {
			/* if (response.isValid === true) {
                this.router.navigate(['/form', response.formId]);
            } else {
                this.errors = [response.error];
                setTimeout(() => this.errors = null, 5000);
            } */
		});
	}

	initForm(): void {}
}

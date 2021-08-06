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
	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() public model!: IPatient;

	public formTypeLookup = Array<IDropDownData>();

	public metaData: any = MetaData;

	public modalitySelectionForm!: IFormGroup;

	public constructor(
		public _store: Store<IAppState>,
		private _dropDownService: DropDownService,
		private formService: FormService,
	) {
		super();
	}

	public ngOnInit(): void {
		this._dropDownService.getFormTypeLookup(FormTypeLookupCodes.PatientForms).subscribe((x) => {
			this.formTypeLookup = x;
		});
		// this.initForm();
	}

	public availableFormTypes() {
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

	public onFormCreate(data: any): void {
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
}

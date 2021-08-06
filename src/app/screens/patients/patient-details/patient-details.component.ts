import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import { PatientModalityStatus } from 'src/app/core/enums/patient.modality.status';
import { FormPersonRole } from 'src/app/core/models/form.model';
import { IDropDownData } from 'src/app/core/models/kendo/dropdown-data.model';
import { MetaData, IPatientModality } from 'src/app/core/models/patient.model';
import { PatientActions } from 'src/app/core/store/patient/patient.actions';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	providers: [],
	selector: 'advenium-patient-details',
	templateUrl: './patient-details.component.html',
})
export class PatientDetailsComponent
	extends UnsubscriableBaseDirective
	implements OnChanges, OnDestroy
{
	private _destroy$ = new Subject();

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() public isEditMode = true;

	@Input() public personId!: Guid;

	@Input() public patientId!: Guid | string | null;

	@Input() public showCancel = false;

	@Input() public fragment = '';

	public show = false;

	public canSaveNow = true;

	@Output() public reloadData: EventEmitter<any> = new EventEmitter();

	@Output() public cancelEditing: EventEmitter<any> = new EventEmitter();

	public metaData: any = MetaData;

	public errors: string[] | null = null;

	public messages: string[] | null = null;

	public phoneMask = '(999) 000-0000';

	public areas = Array<IDropDownData>();

	public beforeNext: Subject<void> = new Subject<void>();

	public myForm!: FormGroup;

	public constructor(
		public _store: Store<IAppState>,
		private actions$: Actions, // private _dropDownService: DropDownService, // private formService: FormService, // private router: Router,
	) {
		super();
		this.saveActions();
	}

	public formPersonRoles() {
		return [
			{
				personId: this.personId,
				role: FormPersonRole.Patient,
			},
		];
	}

	// ngOnInit(): void {}

	public ngOnChanges(): void {
		// console.log('on changes');
		this.initForm();
	}

	public title(): string {
		/*
        if (!this.model) { return ''; }

        if (!this.isEditMode) {
            return 'View Patient';
        }

        if (!this.model.id || this.model.id.toString() === Guid.EMPTY) {
            return 'Create New Patient';
        }
        */
		return 'Edit Patient';
	}

	public changeTab(e: SelectEvent) {
		this.canSaveNow = e.title !== 'Forms';
	}

	public selectedTab(fragment: string): boolean {
		return this.fragment.length > 0 ? this.fragment === fragment : fragment === 'general';
	}

	public initForm(): void {
		this.show = false;

		if (!this.isEditMode) {
			this.myForm.disable();
		}
		this.canSaveNow = !this.selectedTab('forms');
		setTimeout(() => (this.show = true), 0);
	}

	public ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	/*
    submit(): void {
        const model = this.getModel();
        this._store.dispatch(PatientActions.UpdatePatient(model));
    }
    */

	public getModalitiesModel(status: PatientModalityStatus, values: Guid[]): IPatientModality[] {
		const items = values.map((x) => {
			return {
				modalityId: x,
				status,
			} as IPatientModality;
		});
		return items;
	}

	/*
    getModel(): any {
        const value = this.myForm.value;
        const result = {
            ...this.model,
            ...{
                statusId: value.statusId,
                modalities: this.getModalitiesModel(PatientModalityStatus.Requested, value.requestedModalities)
                    .concat(this.getModalitiesModel(PatientModalityStatus.Approved, value.approvedModalities))
                    .concat(this.getModalitiesModel(PatientModalityStatus.Denied, value.deniedModalities))
            },
            ...{
                person: {
                    lastname: value.lastname,
                    firstname: value.firstname,
                    middlename: value.middlename,
                    dob: value.dob,
                    address: value.address,
                    sexId: value.sexId,
                    genderId: value.genderId,
                    maritalStatusId: value.maritalStatusId,
                    employementId: value.employementId,
                    raceIds: value.raceIds,
                    languageIds: value.languageIds,
                    email: value.email,
                    mobilePhone: value.mobilePhone,
                    homePhone: value.homePhone,
                    workPhone: value.workPhone,
                    otherPhone: value.otherPhone,
                    primaryPhoneType: value.primaryPhoneType,
                    mobilePhonePolicyId: value.mobilePhonePolicyId,
                    homePhonePolicyId: value.homePhonePolicyId,
                    workPhonePolicyId: value.workPhonePolicyId,
                    otherPhonePolicyId: value.otherPhonePolicyId,
                    primaryInsurance: value.primaryInsurance,
                    secondaryInsurance: value.secondaryInsurance
                }
            }
        };

        return result;
    }
    */

	public cancel(): void {
		this.cancelEditing.emit();
	}

	public save(): void {
		this.beforeNext.next();
	}

	public saved(): void {
		this.reloadData.emit();
		this.messages = ['Saved successfully'];
		this.errors = null;
		setTimeout(() => (this.messages = null), 5000);
		// this.cancelEditing.emit();
	}

	public saveActions(): void {
		this.actions$
			.pipe(takeUntil(this.unsubscribe), ofType(PatientActions.UpdatePatientComplete))
			.subscribe(() => this.saved());
		this.actions$
			.pipe(takeUntil(this.unsubscribe), ofType(PatientActions.UpdatePatientFail))
			.subscribe((result) => {
				this.errors = [result.errors];
			});
	}
}

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
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import {
	IPersonAvailabilityFilter,
	PersonAvailabilityType,
} from 'src/app/core/models/availability.model';
import { IClinician } from 'src/app/core/models/clinician.model';
import { IDropDownData, LookupTypeCodes } from 'src/app/core/models/kendo/dropdown-data.model';
import { MetaData } from 'src/app/core/models/person.model';
import { ClinicianActions } from 'src/app/core/store/clinician/clinician.actions';
import { IAppState } from 'src/app/core/store/state/app.state';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	providers: [],
	selector: 'advenium-clinician-details',
	templateUrl: './clinician-details.component.html',
})
export class ClinicianDetailsComponent
	extends UnsubscriableBaseDirective
	implements OnInit, OnChanges, OnDestroy
{
	private _destroy$ = new Subject();

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() public isEditMode = true;

	@Input() public model!: IClinician | null;

	@Input() public showCancel = false;

	@Input() public fragment = '';

	@Output() public reloadData: EventEmitter<any> = new EventEmitter();

	@Output() public cancelEditing: EventEmitter<any> = new EventEmitter();

	public myForm!: FormGroup;

	public metaData: any = MetaData;

	public errors: string[] | null = null;

	public messages: string[] | null = null;

	public phoneMask = '(999) 000-0000';

	public areas = Array<IDropDownData>();

	public serviceTypes = Array<IDropDownData>();

	public constructor(
		public _store: Store<IAppState>,
		private actions$: Actions,
		private _dropDownService: DropDownService,
		private _router: Router,
	) {
		super();
		this.saveActions();
	}

	public ngOnInit(): void {
		this._dropDownService.getLookup(LookupTypeCodes.area).subscribe((x: any) => {
			this.areas = x.map((i: any) => ({ ...i, title: `${i.abbreviation} - ${i.name}` }));
		});
		this._dropDownService.getServiceTypes().subscribe((x: any) => (this.serviceTypes = x));
	}

	public ngOnChanges(): void {
		this.initForm();
	}

	public selectedTab(fragment: string): boolean {
		return this.fragment.length > 0 ? this.fragment === fragment : fragment === 'general';
	}

	public isNew(): boolean {
		return !this.model?.id || this.model?.id.toString() === Guid.EMPTY;
	}

	public title(): string {
		if (!this.model) {
			return '';
		}

		if (!this.isEditMode) {
			return 'View Clinician';
		}

		if (!this.model?.id || this.model?.id.toString() === Guid.EMPTY) {
			return 'Create New Clinician';
		}

		return 'Edit Clinician';
	}

	public initForm(): void {
		this.myForm = new FormGroup({
			lastname: new FormControl(this.model?.person.lastname || ''),
			firstname: new FormControl(this.model?.person.firstname || ''),
			middlename: new FormControl(this.model?.person.middlename || ''),
			email: new FormControl(this.model?.person.email || ''),
			mobilePhone: new FormControl(this.model?.person.mobilePhone || ''),
			homePhone: new FormControl(this.model?.person.homePhone),
			workPhone: new FormControl(this.model?.person.workPhone),
			otherPhone: new FormControl(this.model?.person.otherPhone),
			primaryPhoneType: new FormControl(this.model?.person.primaryPhoneType),
			mobilePhonePolicyId: new FormControl(this.model?.person.mobilePhonePolicyId),
			homePhonePolicyId: new FormControl(this.model?.person.homePhonePolicyId),
			workPhonePolicyId: new FormControl(this.model?.person.workPhonePolicyId),
			otherPhonePolicyId: new FormControl(this.model?.person.otherPhonePolicyId),
			areaIds: new FormControl(this.model?.areaIds),
			serviceTypeIds: new FormControl(this.model?.serviceTypeIds),
		});

		if (!this.isEditMode) {
			this.myForm.disable();
		}
	}

	public ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	public submit(): void {
		const model: any = this.getModel();
		this._store.dispatch(ClinicianActions.UpdateClinician(model));
	}

	public create(): void {
		const model: any = this.getModel();
		this._store.dispatch(ClinicianActions.CreateClinician({ clinician: model }));
	}

	public getModel(): any {
		const { value } = this.myForm;
		const result: any = {
			...this.model,
			...{
				areaIds: value.areaIds,
				serviceTypeIds: value.serviceTypeIds,
				person: {
					...this.model?.person,
					lastname: value.lastname,
					firstname: value.firstname,
					middlename: value.middlename,
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
				},
			},
		};
		return result;
	}

	public cancel(): void {
		this.cancelEditing.emit();
	}

	public saved(): void {
		this.reloadData.emit();
		this.messages = ['Saved successfully'];
		this.errors = null;
		setTimeout(() => {
			this.messages = null;
		}, 5000);
	}

	public created(id: string): void {
		this._router.navigate(['/clinician', id]);
	}

	public saveActions(): void {
		this.actions$
			.pipe(takeUntil(this.unsubscribe), ofType(ClinicianActions.UpdateClinicianComplete))
			.subscribe(() => this.saved());
		this.actions$
			.pipe(takeUntil(this.unsubscribe), ofType(ClinicianActions.UpdateClinicianFail))
			.subscribe((result) => {
				this.errors = [result.errors];
			});
		this.actions$
			.pipe(takeUntil(this.unsubscribe), ofType(ClinicianActions.CreateClinicianComplete))
			.subscribe(({ id }) => {
				this.created(id);
			});
	}

	public getIntakeAvailabilityFilter(): IPersonAvailabilityFilter {
		return {
			personId: this.model?.person.id,
			type: PersonAvailabilityType.ClinicianIntake,
		} as IPersonAvailabilityFilter;
	}

	public getServicesAvailabilityFilter(): IPersonAvailabilityFilter {
		return {
			personId: this.model?.person.id,
			type: PersonAvailabilityType.ClinicianService,
		} as IPersonAvailabilityFilter;
	}
}

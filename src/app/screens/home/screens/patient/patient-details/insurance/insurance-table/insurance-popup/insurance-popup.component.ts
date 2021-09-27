import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IButtonSelector } from 'src/app/shared/components/button-selector/button-selector.component';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { addTimezone, removeTimezone } from 'src/app/utils/timezone';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { InsuranceCopyPopupComponent } from '../copy-popup/copy-popup.component';
import { InsuranceTableActions } from '../insurance-table.actions';

@Component({
	selector: 'advenium-insurance-popup',
	templateUrl: './insurance-popup.component.html',
})
export class InsurancePopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogRef: DialogRef,
		private _store: Store<IStore>,
		private dialogService: DialogService,
		private _fb: FormBuilder,
	) {
		super();
	}

	public isInternet: IButtonSelector[] = [
		{ name: 'Primary', id: 1 },
		{ name: 'Secondary', id: 2 },
	];

	public payers$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'supervisorLicensePayers',
	);

	public linkedPersons$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'linkedPersons',
	);

	public personId!: string;

	public insuranceForm: FormGroup = this._fb.group({
		payerId: [],
		effectiveDate: [],
		closedDate: [],
		orderType: [],
		copay: [],
		deductible: [],
		memberId: [],
		employee: [],
		planName: [],
		policyGroup: [],
		isVerified: [],
		id: [],
		insuranceHolderId: [],
		insuredParty: [],
		personId: [],
		verificationDate: [],
	});

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogRef.close();
	}

	public onConfirmAction(): void {
		this._dialogRef.close({
			...this.insuranceForm.value,
			effectiveDate: this.insuranceForm.value?.effectiveDate
				? removeTimezone(this.insuranceForm.value?.effectiveDate)
				: '',
			verificationDate: this.insuranceForm.value?.verificationDate
				? removeTimezone(this.insuranceForm.value?.verificationDate)
				: '',
			closedDate: this.insuranceForm.value?.closedDate
				? removeTimezone(this.insuranceForm.value?.closedDate)
				: '',
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSupervisorLicensePayersPending());

		this._store
			.select('insurance' as any, 'table', 'current')
			.pipe(filter<IInsurence>(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((insurance: IInsurence) => {
				this.insuranceForm.setValue({
					...insurance,
					effectiveDate: insurance?.effectiveDate
						? addTimezone(new Date(insurance?.effectiveDate))
						: '',
					closedDate: insurance?.closedDate ? addTimezone(new Date(insurance.closedDate)) : '',
					verificationDate: insurance?.verificationDate
						? addTimezone(new Date(insurance?.verificationDate))
						: '',
				});
				if (insurance?.insuranceHolderId) {
					this._store.dispatch(
						InsuranceTableActions.GetOtherInsurancePending({
							id: insurance?.insuranceHolderId,
						}),
					);
				}
				this.insuranceForm
					.get('insuranceHolderId')
					?.valueChanges.subscribe((insuranceHolderId: string) => {
						if (insuranceHolderId && insuranceHolderId !== this.personId) {
							this._store.dispatch(
								InsuranceTableActions.GetOtherInsurancePending({ id: insuranceHolderId }),
							);
						}
					});
			});

		this._store
			.select('patientCurrent' as any, 'current', 'person', 'id')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((personId: string) => {
				this.personId = personId;
				this._store.dispatch(DropdownActions.GetLinkedPersonsPending({ personId }));
			});
	}

	public openDialogCopy(): void {
		const dialog: DialogRef = this.dialogService.open({
			title: 'Copy',
			content: InsuranceCopyPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});
		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				this.insuranceForm.setValue({
					...this.insuranceForm.value,
					orderType: result?.orderType || '',
					payerId: result?.payerId || '',
					copay: result?.copay || '',
					deductible: result?.deductible || '',
					memberId: result?.memberId || '',
					policyGroup: result?.policyGroup || '',
					employee: result?.employee || '',
					planName: result?.planName || '',
					isVerified: false,
					verificationDate: null,
				});
			}
		});
	}
}

export interface IInsurence {
	closedDate: string | null;
	copay: number | null;
	deductible: number | null;
	effectiveDate: string;
	employee: string | null;
	id: string;
	insuranceHolderId: string;
	insuredParty: number;
	isVerified: boolean;
	memberId: string | null;
	orderType: number;
	payerId: string;
	personId: string;
	planName: string | null;
	policyGroup: string | null;
	verificationDate: string | null;
}

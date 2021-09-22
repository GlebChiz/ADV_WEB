import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IButtonSelector } from 'src/app/shared/components/button-selector/button-selector.component';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { removeTimezone } from 'src/app/utils/timezone';
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
	) {
		super();
	}

	public isInternet: IButtonSelector[] = [
		{ name: 'Primary', id: 1 },
		{ name: 'Secondary', id: 2 },
	];

	public payers$: Observable<IDropdownData[]> = this._store.select(
		'dropdown' as any,
		'supervisorLicensePayers',
	);

	public linkedPersons$: Observable<IDropdownData[]> = this._store.select(
		'dropdown' as any,
		'linkedPersons',
	);

	public insurance!: IInsurence;

	public personId!: string;

	public myInsuranceForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogRef.close();
	}

	public onConfirmAction(): void {
		this._dialogRef.close({ ...this.insurance, ...this.myInsuranceForm.value });
	}

	public initForm(): void {
		this.myInsuranceForm = new FormGroup({
			payerId: new FormControl(this.insurance?.payerId || ''),
			effectiveDate: new FormControl(removeTimezone(new Date(this.insurance?.effectiveDate)) || ''),
			closedDate: new FormControl(
				this.insurance?.closedDate ? removeTimezone(new Date(this.insurance.closedDate)) : '',
			),
			orderType: new FormControl(this.insurance?.orderType || 1),
			copay: new FormControl(this.insurance?.copay || ''),
			deductible: new FormControl(this.insurance?.deductible || ''),
			memberId: new FormControl(this.insurance?.memberId || ''),
			employee: new FormControl(this.insurance?.employee || ''),
			planName: new FormControl(this.insurance?.planName || ''),
			policyGroup: new FormControl(this.insurance?.policyGroup || ''),
			isVerified: new FormControl(this.insurance?.isVerified),
			verificationDate: new FormControl(
				this.insurance?.verificationDate
					? removeTimezone(new Date(this.insurance?.verificationDate))
					: '',
			),
			id: new FormControl(this.insurance?.id || ''),
			insuranceHolderId: new FormControl(this.insurance?.insuranceHolderId || ''),
			insuredParty: new FormControl(this.insurance?.insuredParty || ''),
			personId: new FormControl(this.insurance?.personId || ''),
		});

		if (this.insurance?.insuranceHolderId) {
			this._store.dispatch(
				InsuranceTableActions.GetOtherInsurancePending({ id: this.insurance?.insuranceHolderId }),
			);
		}

		this.myInsuranceForm
			.get('insuranceHolderId')
			?.valueChanges.subscribe((insuranceHolderId: string) => {
				// if (insuranceHolder && insuranceHolder !== this.personId) {
				this._store.dispatch(
					InsuranceTableActions.GetOtherInsurancePending({ id: insuranceHolderId }),
				);
				// }
			});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSupervisorLicensePayersPending());

		this._store
			.select('insurance' as any, 'table', 'current')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((current: IInsurence) => {
				this.insurance = current;
				this.initForm();
			});

		this._store
			.select('patientCurrent' as any, 'current', 'person', 'id')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((personId: string) => {
				this.personId = personId;
				this._store.dispatch(DropdownActions.GetLinkedPersonsPending({ personId }));
			});

		this.initForm();
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
				this.myInsuranceForm.setValue({
					...this.myInsuranceForm.value,
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

import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IButtonSelector } from 'src/app/shared/components/button-selector/button-selector.component';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-insurance-popup',
	templateUrl: './insurance-popup.component.html',
})
export class InsurancePopupComponent extends UnSubscriber implements OnInit, OnChanges {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
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

	public insurance!: IInsurence;

	public myInsuranceForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.insurance, ...this.myInsuranceForm.value });
	}

	public initForm(): void {
		this.myInsuranceForm = new FormGroup({
			payerId: new FormControl(this.insurance?.payerId || ''),
			effectiveDate: new FormControl(
				this.insurance?.effectiveDate
					? new Date(Date.parse(this.insurance?.effectiveDate))
					: new Date(),
			),
			closedDate: new FormControl(
				this.insurance?.closedDate ? new Date(Date.parse(this.insurance?.closedDate)) : new Date(),
			),
			orderType: new FormControl(this.insurance?.orderType || 1),
			copay: new FormControl(this.insurance?.copay || ''),
			deductible: new FormControl(this.insurance?.deductible || ''),
			memberId: new FormControl(this.insurance?.memberId || ''),
			employee: new FormControl(this.insurance?.employee || ''),
			planName: new FormControl(this.insurance?.planName || ''),
			policyGroup: new FormControl(this.insurance?.policyGroup || ''),
			isVerified: new FormControl(this.insurance?.isVerified || true),
			verificationDate: new FormControl(this.insurance?.verificationDate || ''),
			id: new FormControl(this.insurance?.id || ''),
			insuranceHolderId: new FormControl(this.insurance?.insuranceHolderId || ''),
			insuredParty: new FormControl(this.insurance?.insuredParty || true),
			personId: new FormControl(this.insurance?.personId || ''),
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSupervisorLicensePayersPending());
		this._store
			.select('insuranceTable' as any, 'current')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((current: IInsurence) => {
				this.insurance = current;
				this.initForm();
			});
		this.initForm();
	}

	public ngOnChanges(): void {
		this.initForm();
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

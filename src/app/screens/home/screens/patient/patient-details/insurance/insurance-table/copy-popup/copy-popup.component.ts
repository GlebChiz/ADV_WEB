import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IButtonSelector } from 'src/app/shared/components/button-selector/button-selector.component';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-copy-popup',
	templateUrl: './copy-popup.component.html',
})
export class InsuranceCopyPopupComponent extends UnSubscriber implements OnInit {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public payers$: Observable<IDropdownData[]> = this._store.select(
		'dropdown' as any,
		'supervisorLicensePayers',
	);

	public insuranceCopy: any;

	public myInsuranceCopyForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.insuranceCopy, ...this.myInsuranceCopyForm.value });
	}

	public initForm(): void {
		this.myInsuranceCopyForm = new FormGroup({
			payerId: new FormControl(this.insuranceCopy?.payer || ''),
			orderType: new FormControl(this.insuranceCopy?.orderType || 1),
		});
	}

	public isPrimary: IButtonSelector[] = [
		{ name: 'Primary', id: 1 },
		{ name: 'Secondary', id: 2 },
	];

	public ngOnInit(): void {
		this._store
			.select('insuranceTable' as any, 'insurance', 'otherInsurance')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((insurance: any) => {
				console.log(insurance);

				this.insuranceCopy = insurance;
			});
		this.initForm();
	}
}

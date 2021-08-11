import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogRef } from '@progress/kendo-angular-dialog';

@Component({
	selector: 'advenium-payer-popup',
	templateUrl: './payer-popup.component.html',
})
export class PayerPopupComponent implements OnInit, OnChanges {
	public constructor(private _dialogService: DialogRef) {}

	public payer: any;

	public myForm!: FormGroup;

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.payer, ...this.myForm.value });
	}

	public initForm(): void {
		this.myForm = new FormGroup({
			name: new FormControl(this.payer?.name || ''),
			carrierCode: new FormControl(this.payer?.carrierCode || ''),
			type: new FormControl(this.payer?.type),
			notes: new FormControl(this.payer?.notes),
			payerId: new FormControl(this.payer?.payerId),
			address: new FormControl(this.payer?.address),
		});
	}

	public ngOnInit(): void {
		this.initForm();
	}

	public ngOnChanges(): void {
		this.initForm();
	}
}

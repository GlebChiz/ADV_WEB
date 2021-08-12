import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { groupBy, GroupResult } from '@progress/kendo-data-query';
import { filter, takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { PayerActions } from 'src/app/store/actions/payer.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-payer-popup',
	templateUrl: './payer-popup.component.html',
})
export class PayerPopupComponent extends UnSubscriber implements OnInit, OnChanges {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public payer: any;

	public myForm!: FormGroup;

	public payerTypes: (DropDownData | GroupResult)[] = [];

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

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
			address1: new FormControl(this.payer?.address?.address1),
			address2: new FormControl(this.payer?.address?.address2),
			city: new FormControl(this.payer?.address?.city),
			state: new FormControl(this.payer?.address?.state),
			zip: new FormControl(this.payer?.address?.zip),
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(PayerActions.GetTypesPending());
		this._store
			.select('payerTable' as any)
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((payerTable: any) => {
				this.payer = payerTable.current;
				this.initForm();
			});
		this._store
			.select('payerState')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((payerTypes: any) => {
				payerTypes.types?.forEach((k: any) => {
					const found: any = payerTypes.types.find((x: any) => x.id === k.parentId);
					k.parentName = found?.name ?? '';
				});
				if (payerTypes.types) {
					this.payerTypes = groupBy(
						payerTypes.types?.filter((y: any) => y.parentId != null),
						[{ field: 'parentName' }],
					);
				}
			});

		// this._store.select(selectTypePayer, { id: id });
		this.initForm();
	}

	public ngOnChanges(): void {
		this.initForm();
	}
}

export interface DropDownData {
	id: string;
	name: string;
	isDisabled: boolean;
	parentId: string;
}

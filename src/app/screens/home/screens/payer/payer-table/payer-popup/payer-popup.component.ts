import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { groupBy, GroupResult } from '@progress/kendo-data-query';
import { filter, takeUntil } from 'rxjs/operators';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-payer-popup',
	templateUrl: './payer-popup.component.html',
})
export class PayerPopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<IStore>,
		private _fb: FormBuilder,
	) {
		super();
	}

	public payerForm: FormGroup = this._fb.group({
		id: [],
		phone: [],
		fax: [],
		name: [],
		carrierCode: [],
		type: [],
		notes: [],
		payerId: [],
		address: [],
	});

	public payerTypes: (IDropdownData | GroupResult)[] = [];

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close(this.payerForm.value);
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetTypesPending());
		this._store
			.select('payer' as any, 'table', 'current')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((payer: any) => {
				this.payerForm.setValue(payer);
			});
		this._store
			.select('dropdown', 'types')
			.pipe(filter<IDropdownData[]>(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((payerTypes: IDropdownData[]) => {
				payerTypes.forEach((k: IDropdownData) => {
					const found: IDropdownData | undefined = payerTypes.find(
						(x: IDropdownData) => x.id === k.parentId,
					);
					k.parentName = found?.name ?? '';
				});
				this.payerTypes = groupBy(
					payerTypes?.filter((y: IDropdownData) => y.parentId != null),
					[{ field: 'parentName' }],
				);
			});
	}
}

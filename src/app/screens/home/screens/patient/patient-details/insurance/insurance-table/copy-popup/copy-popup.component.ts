import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-copy-popup',
	templateUrl: './copy-popup.component.html',
})
export class InsuranceCopyPopupComponent extends UnSubscriber {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public objectKeys = Object.keys;

	public insuranceCopy$: Observable<any> = this._store
		.select('insuranceTable' as any, 'insurance', 'otherInsurance')
		.pipe(takeUntil(this.unsubscribe$$));

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onConfirmAction(selectedItem: any): void {
		this._dialogService.close({ ...selectedItem });
	}
}

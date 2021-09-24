import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { filter, takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-modality-popup',
	templateUrl: './modality-popup.component.html',
})
export class ModalityPopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<IStore>,
		private _fb: FormBuilder,
	) {
		super();
	}

	public modalityForm: FormGroup = this._fb.group({
		id: [],
		shortName: [],
		name: [],
		description: [],
		url: [],
	});

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.modalityForm.value });
	}

	public ngOnInit(): void {
		this._store
			.select('modality' as any, 'table', 'current')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((modality: any) => {
				this.modalityForm.setValue(modality);
			});
	}
}

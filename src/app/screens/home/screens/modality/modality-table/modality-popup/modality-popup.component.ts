import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
export class ModalityPopupComponent extends UnSubscriber implements OnInit, OnChanges {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public modality: any;

	public myModalityForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.modality, ...this.myModalityForm.value });
	}

	public initForm(): void {
		console.log('this.modality', this.modality);
		this.myModalityForm = new FormGroup({
			name: new FormControl(this.modality?.name || ''),
			description: new FormControl(this.modality?.description || ''),
			url: new FormControl(this.modality?.url),
		});
	}

	public ngOnInit(): void {
		this._store
			.select('modalityTable' as any)
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((modalityTable: any) => {
				this.modality = modalityTable.current;
				this.initForm();
			});
		this.initForm();
	}

	public ngOnChanges(): void {
		this.initForm();
	}
}

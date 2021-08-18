import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { filter, takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-public-snipit-popup',
	templateUrl: './public-snipit-popup.component.html',
})
export class PublicSnipitPopupComponent extends UnSubscriber implements OnInit, OnChanges {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public publicSnipit: any;

	public myPublicSnipitForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.publicSnipit, ...this.myPublicSnipitForm.value });
	}

	public initForm(): void {
		console.log('this.publicSnipit', this.publicSnipit);
		this.myPublicSnipitForm = new FormGroup({
			id: new FormControl(this.publicSnipit?.id || ''),
			text: new FormControl(this.publicSnipit?.text || ''),
			categoryId: new FormControl(this.publicSnipit?.categoryId),
		});
	}

	public ngOnInit(): void {
		this._store
			.select('publicSnipitTable' as any)
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((modalityTable: any) => {
				this.publicSnipit = modalityTable.current;
				this.initForm();
			});
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

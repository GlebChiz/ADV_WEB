/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';

@Component({
	selector: 'advenium-rename-popup',
	templateUrl: './rename-popup.component.html',
})
export class RenamePopupComponent implements OnInit {
	public constructor(_store: Store<any>, private _dialogRef: DialogRef) {}

	public titleForm: FormControl = new FormControl();

	public onCancelAction(): void {
		this._dialogRef.close();
	}

	public onConfirmAction(): void {
		this._dialogRef.close({
			title: this.titleForm.value,
		});
	}

	public ngOnInit(): void {
		console.log('rename');

		// this._store
		// 	.select(this.storePath as any, 'table', 'title')
		// 	.pipe(takeUntil(this.unsubscribe$$))
		// 	.subscribe((title: string) => {
		// 		this.titleForm.setValue(title);
		// 	});
	}
}

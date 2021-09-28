/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';

@Component({
	selector: 'advenium-rename-popup',
	templateUrl: './rename-popup.component.html',
})
export class RenamePopupComponent {
	public constructor(_store: Store<any>, private _dialogRef: DialogRef, private _fb: FormBuilder) {}

	@Input() public set settitle(value: string) {
		this.title = value;
	}

	public title!: string;

	public titleControl: FormControl = this._fb.control(this.title);

	public onCancelAction(): void {
		this._dialogRef.close();
	}

	public onConfirmAction(): void {
		this._dialogRef.close({
			title: this.titleControl.value,
		});
	}
}

import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { filter, takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-users-manager-popup',
	templateUrl: './users-manager-popup.component.html',
})
export class UsersManagerPopupComponent extends UnSubscriber implements OnInit, OnChanges {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public user: any;

	public usersManagerForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.user, ...this.usersManagerForm.value });
	}

	public initForm(): void {
		this.usersManagerForm = new FormGroup({
			name: new FormControl(this.user?.name || ''),
			userName: new FormControl(this.user?.userName || ''),
			
		});
	}

	public ngOnInit(): void {
		this._store
			.select('user' as any, 'table')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((userTable: any) => {
				this.user = userTable.current;
				this.initForm();
			});
		this.initForm();
	}

	public ngOnChanges(): void {
		this.initForm();
	}
}

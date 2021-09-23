/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { CustomTableDirective } from '../table.directive';
import {
	GET_TABLE_DATA_PENDING,
	GET_CURRENT_ITEM_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	SAVE_GRID_SETTINGS_PENDING,
	SAVE_GRID_CHANGES_PENDING,
	GET_GRID_SETTINGS_PENDING,
	MAKE_DEFAULT_GRID_PENDING,
	RENAME_GRID_PENDING,
} from '../table.tokens';

@Component({
	selector: 'advenium-rename-popup',
	templateUrl: './rename-popup.component.html',
})
export class RenamePopupComponent extends CustomTableDirective implements OnInit, UnSubscriber {
	public constructor(
		dialogService: DialogService,
		_store: Store<any>,
		private _dialogRef: DialogRef,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(SAVE_GRID_SETTINGS_PENDING) saveNewGridSettingsPending: any,
		@Inject(SAVE_GRID_CHANGES_PENDING) saveGridChangesPending: any,
		@Inject(GET_GRID_SETTINGS_PENDING) getGridSettingsPending: any,
		@Inject(MAKE_DEFAULT_GRID_PENDING) makeDefaultGridPending: any,
		@Inject(RENAME_GRID_PENDING) renameGridPending: any,
	) {
		super(
			_store,
			dialogService,
			getTableDataPending,
			getCurrentItemPending,
			deleteDataPending,
			editDataPending,
			saveNewGridSettingsPending,
			saveGridChangesPending,
			getGridSettingsPending,
			makeDefaultGridPending,
			renameGridPending,
		);
	}

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
		this._store
			.select(this.storePath as any, 'table', 'title')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((title: string) => {
				this.titleForm.setValue(title);
			});
	}
}

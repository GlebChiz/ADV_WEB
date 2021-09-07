/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	GET_TABLE_DATA_PENDING,
	GET_CURRENT_ITEM_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	CLEAR_CURRENT_ITEM,
	CREATE_ITEM_TABLE_PENDING,
} from 'src/app/shared/table/table.tokens';
import { process } from '@progress/kendo-data-query';
import { IStore } from 'src/app/store';
import { CellClickEvent } from '@progress/kendo-angular-grid';
import { filter, takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { IColumn } from '../../../../../shared/interfaces/column.interface';
import { ClinicianPopupComponent } from './clinician-popup/clinician-popup.component';

@Component({
	providers: [],
	selector: 'advenium-clinician-table',
	styleUrls: ['../../../home.component.scss'],
	templateUrl: './clinician-table.component.html',
})
export class ClinicianTableComponent extends CustomTableDirective {
	public constructor(
		_store: Store<IStore>,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private dialogService: DialogService,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		// @Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(CLEAR_CURRENT_ITEM) private clearCurrentItem: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
	) {
		super(_store, getTableDataPending, getCurrentItemPending, deleteDataPending, editDataPending);
	}

	public override selectState(): void {
		this._store
			.select((state: any) => state[this.storePath].table)
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((tableData: any) => {
				if (this.group && tableData?.data) {
					this.gridData = process(tableData?.data, { group: this.group });
					this.gridData.total = tableData?.total;
				}
				this.gridDataWithoutGroup = tableData;

				this.isLoading = tableData.isLoading;
				const group: any = {};
				if (tableData?.current) {
					Object.keys(tableData?.current).forEach((field: string) => {
						group[field] = new FormControl(tableData?.current[field] || '');
					});
				}
				this.myForm = new FormGroup(group);
			});
	}

	public openDialog(dataItem?: any, isDublicate?: boolean): void {
		if (dataItem) {
			this._store.dispatch(
				this.getCurrentItemPending({ id: dataItem.id, controller: this.controller }),
			);
		}
		const dialog: DialogRef = this.dialogService.open({
			title: 'Clinician',
			content: ClinicianPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});
		dialog.content.instance.clinician = { ...dataItem };
		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				if (isDublicate) {
					result.id = null;
				}
				if (dataItem && !isDublicate) {
					this._store.dispatch(this.editDataPending({ item: result, controller: this.controller }));
					return;
				}
				this._store.dispatch(this.createDataPending({ item: result, controller: this.controller }));
			}
			this._store.dispatch(this.clearCurrentItem());
		});
	}

	public onCellClick(e: CellClickEvent): void {
		this._router.navigate([e.dataItem.id], {
			relativeTo: this._activatedRoute,
		});
	}

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
	}

	public columns: IColumn[] = [
		{
			field: 'name',
			title: 'Name',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'type',
			title: 'Type',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'isSupervisor',
			title: 'Is Supervisor',
			hidden: false,
			filterable: true,
			type: 'text',
		},
	];
}

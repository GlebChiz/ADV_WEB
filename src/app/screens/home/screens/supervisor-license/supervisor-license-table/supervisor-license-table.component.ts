/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	CLEAR_CURRENT_ITEM,
	CREATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_GRID_SETTINGS_PENDING,
	GET_TABLE_DATA_PENDING,
	MAKE_DEFAULT_GRID_PENDING,
	RENAME_GRID_PENDING,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_SETTINGS_PENDING,
} from 'src/app/shared/table/table.tokens';
import { PermissionType } from 'src/app/store/actions/user.actions';
import { IColumn } from '../../../../../shared/interfaces/column.interface';
import { SupervisorLicensePopupComponent } from './supervisor-license-popup/supervisor-license-popup.component';

@Component({
	providers: [],
	selector: 'advenium-supervisor-license-table',
	templateUrl: './supervisor-license-table.component.html',
	styleUrls: ['../../../home.component.scss'],
})
export class SupervisorLicenseTableComponent extends CustomTableDirective {
	public constructor(
		_store: Store<any>,
		dialogService: DialogService,
		_clipboardApi: ClipboardService,
		_toasterService: ToastrService,
		_router: Router,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(CLEAR_CURRENT_ITEM) private clearCurrentItem: any,
		@Inject(SAVE_GRID_SETTINGS_PENDING) saveNewGridSettingsPending: any,
		@Inject(SAVE_GRID_CHANGES_PENDING) saveGridChangesPending: any,
		@Inject(GET_GRID_SETTINGS_PENDING) getGridSettingsPending: any,
		@Inject(MAKE_DEFAULT_GRID_PENDING) makeDefaultGridPending: any,

		@Inject(RENAME_GRID_PENDING) renameGridPending: any,
	) {
		super(
			_store,
			dialogService,
			_clipboardApi,
			_router,
			_toasterService,
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

	public canCreate: PermissionType = PermissionType.canCreateSupervisorCredentials;

	public canUpdate: PermissionType = PermissionType.canUpdateSupervisorCredentials;

	public canDelete: PermissionType = PermissionType.canDeleteSupervisorCredentials;

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
	}

	public openDialog(dataItem?: any, isDublicate?: boolean): void {
		if (dataItem) {
			this._store.dispatch(
				this.getCurrentItemPending({ id: dataItem.id, controller: this.controller }),
			);
		}
		const dialog: DialogRef = this.dialogService.open({
			title: 'Supervisor Credentials',
			content: SupervisorLicensePopupComponent,
			width: 600,
			height: 310,
			minWidth: 250,
		});

		dialog.content.instance.supervisorLicense = { ...dataItem };
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

	public columns: IColumn[] = [
		{
			field: 'supervisor',
			title: 'Supervisor',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'payer',
			title: 'Payer',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'providerId',
			title: 'Provider Id',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'start',
			title: 'Start Date',
			hidden: false,
			filterable: true,
			type: 'date',
		},
		{
			field: 'end',
			title: 'End Date',
			hidden: false,
			filterable: true,
			type: 'date',
		},
	];
}

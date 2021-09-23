/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
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
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { ISeriesPlan } from 'src/app/shared/interfaces/series-plan.interface';
import { PermissionType } from 'src/app/store/actions/user.actions';
import { SeriesPlanPopupComponent } from './series-plan-popup/series-plan-popup.component';
import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-series-plan-table',
	templateUrl: './series-plan-table.component.html',
	styleUrls: ['../../../home.component.scss'],
})
export class SeriesplansTableComponent extends CustomTableDirective {
	public constructor(
		_router: Router,
		_store: Store<IStore>,
		private _activatedRoute: ActivatedRoute,
		dialogService: DialogService,
		_clipboardApi: ClipboardService,
		_toasterService: ToastrService,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(CLEAR_CURRENT_ITEM) private clearCurrentItem: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
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

	public canCreate: PermissionType = PermissionType.canCreateSeriesPlan;

	public canUpdate: PermissionType = PermissionType.canUpdateSeriesPlan;

	public canDelete: PermissionType = PermissionType.canDeleteSeriesPlan;

	public columns: IColumn[] = [
		{
			field: 'name',
			title: 'Name',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'modality',
			title: 'Modality',
			hidden: false,
			filterable: true,
			type: 'text',
		},
	];

	public openDialog(dataItem?: ISeriesPlan, isDublicate?: boolean): void {
		if (dataItem) {
			this._store.dispatch(
				this.getCurrentItemPending({ id: dataItem.id, controller: this.controller }),
			);
		}
		const dialog: DialogRef = this.dialogService.open({
			title: 'Series Plan',
			content: SeriesPlanPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});

		dialog.content.instance.seriesPlan = { ...dataItem };
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

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
	}

	public onCellClick({ dataItem: { id } }: { dataItem: { id: string } }): void {
		this._router.navigate([id], { relativeTo: this._activatedRoute });
	}
}

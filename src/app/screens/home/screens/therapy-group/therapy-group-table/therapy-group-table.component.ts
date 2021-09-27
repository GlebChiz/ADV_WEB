/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	GET_TABLE_DATA_PENDING,
	GET_CURRENT_ITEM_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	CLEAR_CURRENT_ITEM,
	CREATE_ITEM_TABLE_PENDING,
	SAVE_GRID_SETTINGS_PENDING,
	SAVE_GRID_CHANGES_PENDING,
	GET_GRID_SETTINGS_PENDING,
	MAKE_DEFAULT_GRID_PENDING,
	RENAME_GRID_PENDING,
} from 'src/app/shared/table/table.tokens';
import { CellClickEvent, RowArgs, SelectionEvent } from '@progress/kendo-angular-grid';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { IStore } from 'src/app/store';
import { ITherapyGroup } from 'src/app/shared/interfaces/therapy-group.interface';
import { PermissionType } from 'src/app/store/actions/user.actions';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { IColumn } from '../../../../../shared/interfaces/column.interface';
import { TherapyGroupPopupComponent } from './therapy-group-popup/therapy-group-popup.component';
import { ModalityForGroupPopupComponent } from '../therapy-group-popups/modality-for-group-popup/modality-for-group-popup.component';
import { ClinicianForGroupPopupComponent } from '../therapy-group-popups/clinician-for-group-popup/clinician-for-group-popup.component';
import { LanguageForGroupPopupComponent } from '../therapy-group-popups/language-for-group-popup/language-for-group-popup.component';
import { LocationForGroupPopupComponent } from '../therapy-group-popups/location-for-group-popup/location-for-group-popup.component';
import { SeriesPlanForGroupPopupComponent } from '../therapy-group-popups/series-plan-for-group-popup/series-plan-for-group-popup.component';
import { RoomForGroupPopupComponent } from '../therapy-group-popups/room-for-group-popup/room-for-group-popup.component';
import { TherapyGroupTableActions } from './therapy-group-table.actions';

@Component({
	providers: [],
	selector: 'advenium-therapy-group-table',
	templateUrl: './therapy-group-table.component.html',
	styleUrls: ['../../../home.component.scss', './therapy-group-table.component.scss'],
})
export class TherapyGroupTableComponent extends CustomTableDirective {
	public constructor(
		_router: Router,
		private _activatedRoute: ActivatedRoute,
		_store: Store<IStore>,
		dialogService: DialogService,
		_clipboardApi: ClipboardService,
		_toasterService: ToastrService,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(CLEAR_CURRENT_ITEM) private clearCurrentItem: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
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

	public canCreate: PermissionType = PermissionType.canCreateTherapyGroup;

	public canUpdate: PermissionType = PermissionType.canUpdateTherapyGroup;

	public canDelete: PermissionType = PermissionType.canDeleteTherapyGroup;

	public selectedItems: string[] = [];

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
	}

	public openDialog(dataItem?: ITherapyGroup, isDublicate?: boolean): void {
		if (dataItem) {
			this._store.dispatch(
				this.getCurrentItemPending({ id: dataItem.id, controller: this.controller }),
			);
		}
		const dialog: DialogRef = this.dialogService.open({
			title: 'Therapy Group',
			content: TherapyGroupPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});

		dialog.content.instance.therapyGroup = { ...dataItem };
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
		this._router.navigate([e.dataItem.id], { relativeTo: this._activatedRoute });
	}

	public columns: IColumn[] = [
		{
			field: 'clinicianName',
			title: 'Clinician Name',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'weekDay',
			title: 'Week Day',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'start',
			title: 'Start Time',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'locationName',
			title: 'Location',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'roomName',
			title: 'Room',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'modalityName',
			title: 'Modality',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'seriesPlanName',
			title: 'Series Plan',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'languageName',
			title: 'Language',
			hidden: false,
			filterable: true,
			type: 'text',
		},
	];

	public selectionChange(event: SelectionEvent): void {
		if (event.shiftKey) {
			if (event.selectedRows?.length !== 0 && event.selectedRows) {
				this.selectedItems = [
					...this.selectedItems,
					...event.selectedRows?.map((item: RowArgs) => item.dataItem.id),
				];
			} else {
				this.selectedItems = [];
			}
		} else {
			if (event.selectedRows && event.selectedRows[0]) {
				this.selectedItems.push(event.selectedRows[0].dataItem.id);
			}
			if (event.deselectedRows && event.deselectedRows[0]) {
				const idUnselectdItem: string = event.deselectedRows[0].dataItem.id;
				this.selectedItems = this.selectedItems.filter((item: string) => item !== idUnselectdItem);
			}
		}
	}

	public openDialogClinician(): void {
		const dialog: DialogRef = this.dialogService.open({
			title: 'Clinician',
			content: ClinicianForGroupPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});
		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				this._store.dispatch(
					TherapyGroupTableActions.UpdateFiledTherapyGroupPending({
						ids: this.selectedItems,
						value: result.clinician.id,
						entity: 'clinician',
						controller: this.controller,
					}),
				);
				this.selectedItems = [];
			}
		});
	}

	public openDialogModality(): void {
		const dialog: DialogRef = this.dialogService.open({
			title: 'Modality',
			content: ModalityForGroupPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});

		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				this._store.dispatch(
					TherapyGroupTableActions.UpdateFiledTherapyGroupPending({
						ids: this.selectedItems,
						value: result.modality.id,
						entity: 'modality',
						controller: this.controller,
					}),
				);
				this.selectedItems = [];
			}
		});
	}

	public openDialogLanguage(): void {
		const dialog: DialogRef = this.dialogService.open({
			title: 'Language',
			content: LanguageForGroupPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});

		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				this._store.dispatch(
					TherapyGroupTableActions.UpdateFiledTherapyGroupPending({
						ids: this.selectedItems,
						value: result.language.id,
						entity: 'language',
						controller: this.controller,
					}),
				);
				this.selectedItems = [];
			}
		});
	}

	public openDialogSeriesPlan(): void {
		const dialog: DialogRef = this.dialogService.open({
			title: 'Series Plan',
			content: SeriesPlanForGroupPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});

		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				this._store.dispatch(
					TherapyGroupTableActions.UpdateFiledTherapyGroupPending({
						ids: this.selectedItems,
						value: result.seriesPlan.id,
						entity: 'seriesplan',
						controller: this.controller,
					}),
				);
				this.selectedItems = [];
			}
		});
	}

	public openDialogLocation(): void {
		const dialog: DialogRef = this.dialogService.open({
			title: 'Location',
			content: LocationForGroupPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});

		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				this._store.dispatch(
					TherapyGroupTableActions.UpdateFiledTherapyGroupPending({
						ids: this.selectedItems,
						value: result.location.id,
						entity: 'location',
						controller: this.controller,
					}),
				);
				this.selectedItems = [];
			}
		});
	}

	public openDialogRoom(): void {
		const dialog: DialogRef = this.dialogService.open({
			title: 'Room',
			content: RoomForGroupPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});

		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				this._store.dispatch(
					TherapyGroupTableActions.UpdateFiledTherapyGroupPending({
						ids: this.selectedItems,
						value: result.room.id,
						entity: 'room',
						controller: this.controller,
					}),
				);
				this.selectedItems = [];
			}
		});
	}
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { RowArgs, SelectionEvent } from '@progress/kendo-angular-grid';
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
import { SupervisorForGroupPopupComponent } from '../patient-distribution-group-popups/supervisor-for-group-popup/supervisor-for-group-popup.component';
import { PatientDistributionPopupComponent } from './patient-distribution-popup/patient-distribution-popup.component';
import { PatientDistributionTableActions } from './patient-distribution-table.actions';

@Component({
	providers: [],
	selector: 'advenium-patient-distribution-table',
	templateUrl: './patient-distribution-table.component.html',
	styleUrls: ['../../../home.component.scss'],
})
export class PatientDistributionTableComponent extends CustomTableDirective {
	public constructor(
		_store: Store<any>,
		dialogService: DialogService,
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

	public canCreate: PermissionType = PermissionType.canCreatePatientDistribution;

	public canUpdate: PermissionType = PermissionType.canUpdatePatientDistribution;

	public canDelete: PermissionType = PermissionType.canDeletePatientDistribution;

	public selectedItems: string[] = [];

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
			title: 'Patient Distribution',
			content: PatientDistributionPopupComponent,
			width: 600,
			height: 310,
			minWidth: 250,
		});

		dialog.content.instance.modality = { ...dataItem };
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

	public selectionChange(event: SelectionEvent): void {
		if (event.shiftKey) {
			if (event.selectedRows?.length !== 0 && event.selectedRows) {
				this.selectedItems = [
					...this.selectedItems,
					...event.selectedRows?.map((item: RowArgs) => item.dataItem.patientId),
				];
			} else {
				this.selectedItems = [];
			}
		} else {
			if (event.selectedRows && event.selectedRows[0]) {
				this.selectedItems.push(event.selectedRows[0].dataItem.patientId);
			}
			if (event.deselectedRows && event.deselectedRows[0]) {
				const idUnselectdItem: string = event.deselectedRows[0].dataItem.patientId;
				this.selectedItems = this.selectedItems.filter((item: string) => item !== idUnselectdItem);
			}
		}
	}

	public openDialogSupervisor(): void {
		const dialog: DialogRef = this.dialogService.open({
			title: 'Supervisor',
			content: SupervisorForGroupPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});
		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				this._store.dispatch(
					PatientDistributionTableActions.UpdateFiledPatientDistributionPending({
						patientIds: this.selectedItems,
						supervisorId: result.supervisor.id,
						start: result.startDate,
						controller: this.controller,
					}),
				);
				this.selectedItems = [];
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
			field: 'patient',
			title: 'Patient',
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
	];
}

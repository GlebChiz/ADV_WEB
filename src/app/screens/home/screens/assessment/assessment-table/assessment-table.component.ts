/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PermissionType } from 'src/app/store/actions/user.actions';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { CellClickEvent } from '@progress/kendo-angular-grid';
import { IAssessment } from 'src/app/shared/interfaces/assessment.interface';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	CLEAR_CURRENT_ITEM,
	CREATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_PENDING,
	SAVE_GRID_SETTINGS_PENDING,
} from 'src/app/shared/table/table.tokens';
import { IColumn } from '../../../../../shared/interfaces/column.interface';
import { AssessmentPopupComponent } from './assessment-popup/assessment-popup.component';

@Component({
	providers: [],
	selector: 'advenium-assessment-table',
	templateUrl: './assessment-table.component.html',
	styleUrls: ['../../../home.component.scss'],
})
export class AssessmentTableComponent extends CustomTableDirective {
	public constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private dialogService: DialogService,
		_store: Store<any>,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		// @Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(CLEAR_CURRENT_ITEM) private clearCurrentItem: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(SAVE_GRID_SETTINGS_PENDING) saveGridSettingsPending: any,
	) {
		super(
			_store,
			getTableDataPending,
			getCurrentItemPending,
			deleteDataPending,
			editDataPending,
			saveGridSettingsPending,
		);
	}

	public canCreate: PermissionType = PermissionType.canCreateAssessment;

	public canUpdate: PermissionType = PermissionType.canUpdateAssessment;

	public canDelete: PermissionType = PermissionType.canDeleteAssessment;

	public columns: IColumn[] = [
		{
			field: 'typeName',
			title: 'Type',
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
		{
			field: 'patient',
			title: 'Patient',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'title',
			title: 'Title',
			hidden: false,
			filterable: true,
			type: 'text',
		},
	];

	public openDialog(dataItem?: IAssessment, isDublicate?: boolean): void {
		if (dataItem) {
			this._store.dispatch(
				this.getCurrentItemPending({ id: dataItem.id, controller: this.controller }),
			);
		}
		const dialog: DialogRef = this.dialogService.open({
			title: 'Assessment',
			content: AssessmentPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});

		dialog.content.instance.assessment = { ...dataItem };
		if (!dataItem) {
			dialog.content.instance.creating = true;
		}
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

	public onCellClick(e: CellClickEvent): void {
		this._router.navigate([e.dataItem.id], {
			relativeTo: this._activatedRoute,
		});
	}
}

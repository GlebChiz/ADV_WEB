/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
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
import { IStore } from 'src/app/store';
import { IColumn } from '../../../../../../shared/interfaces/column.interface';
import { AssessmentTemplatePopupComponent } from './assessment-template-popup/assessment-template-popup.component';

@Component({
	providers: [],
	selector: 'advenium-assessment-template-table',
	templateUrl: './assessment-template-table.component.html',
	styleUrls: ['../../../../home.component.scss'],
})
export class AssessmentTemplateTableComponent extends CustomTableDirective implements OnInit {
	public constructor(
		_store: Store<IStore>,
		private _activatedRoute: ActivatedRoute,
		dialogService: DialogService,
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

	public openDialog(dataItem?: any, isDublicate?: boolean): void {
		if (dataItem) {
			this._store.dispatch(
				this.getCurrentItemPending({ id: dataItem.id, controller: this.controller }),
			);
		}
		const dialog: DialogRef = this.dialogService.open({
			title: 'Assesment-template',
			content: AssessmentTemplatePopupComponent,
			width: 800,
			height: 800,
			minWidth: 250,
		});
		dialog.content.instance.AssessmentTemplateTable = { ...dataItem };
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

	public ngOnInit(): void {
		if (this.gridSettings.state.filter) {
			this.gridSettings.state.filter.filters = [
				...this.gridSettings.state.filter.filters,
				{
					field: 'questionId',
					operator: 'custom',
					value: this._activatedRoute.snapshot.params.id,
				},
			];
		}
		super.ngOnInit();
	}

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
	}

	public columns: IColumn[] = [
		{
			field: 'id',
			title: 'id',
			hidden: true,
			filterable: true,
			type: 'text',
		},
		{
			field: 'criteria',
			title: 'Criteria',
			hidden: false,
			filterable: false,
			type: 'text',
		},
		{
			field: 'responseOption',
			title: 'Response option',
			hidden: false,
			filterable: false,
			type: 'text',
		},
		{
			field: 'text',
			title: 'Text',
			hidden: false,
			filterable: true,
			type: 'text',
		},
	];
}

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
	GET_TABLE_DATA_PENDING,
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
		private dialogService: DialogService,
		private _activatedRoute: ActivatedRoute,
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

	public openDialog(dataItem?: any, isDublicate?: boolean): void {
		if (dataItem) {
			this._store.dispatch(
				this.getCurrentItemPending({ id: dataItem.id, controller: this.controller }),
			);
		}
		const dialog: DialogRef = this.dialogService.open({
			title: 'Assesment-template',
			content: AssessmentTemplatePopupComponent,
			width: 600,
			height: 500,
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

	public columns: IColumn[] = [
		{
			field: 'id',
			title: 'Text',
			hidden: true,
			filterable: true,
			type: 'text',
		},
		{
			field: 'responseOption',
			title: 'Response option',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'text',
			title: 'Text',
			hidden: false,
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
	];
}
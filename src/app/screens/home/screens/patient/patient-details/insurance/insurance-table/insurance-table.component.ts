/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	CLEAR_CURRENT_ITEM,
	CREATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_GRID_SETTINGS_PENDING,
	GET_TABLE_DATA_PENDING,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_SETTINGS_PENDING,
} from 'src/app/shared/table/table.tokens';
import { IStore } from 'src/app/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InsurancePopupComponent } from './insurance-popup/insurance-popup.component';
import { InsuranceTableActions } from './insurance-table.actions';

@Component({
	providers: [],
	selector: 'advenium-insurance-table',
	templateUrl: './insurance-table.component.html',
	styleUrls: ['../../../../../home.component.scss'],
})
export class InsuranceTableComponent extends CustomTableDirective implements OnChanges, OnInit {
	public constructor(
		private dialogService: DialogService,
		_store: Store<IStore>,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(CLEAR_CURRENT_ITEM) private clearCurrentItem: any,
		@Inject(SAVE_GRID_SETTINGS_PENDING) saveNewGridSettingsPending: any,
		@Inject(SAVE_GRID_CHANGES_PENDING) saveGridChangesPending: any,
		@Inject(GET_GRID_SETTINGS_PENDING) getGridSettingsPending: any,
	) {
		super(
			_store,
			getTableDataPending,
			getCurrentItemPending,
			deleteDataPending,
			editDataPending,
			saveNewGridSettingsPending,
			saveGridChangesPending,
			getGridSettingsPending,
		);
	}

	@Input() public personId!: string;

	public currentPrimaryInsurance$: Observable<IInsuranceInfo> = this._store
		.select('insurance' as any, 'insurance', 'currentInsurance', 'primary')
		.pipe(takeUntil(this.unsubscribe$$));

	public currentSecondaryInsurance$: Observable<IInsuranceInfo> = this._store
		.select('insurance' as any, 'insurance', 'currentInsurance', 'secondary')
		.pipe(takeUntil(this.unsubscribe$$));

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
	}

	public ngOnChanges(): void {
		if (this.personId) {
			if (this.gridSettings.state.filter) {
				this.gridSettings.state.filter.filters = [
					...this.gridSettings.state.filter.filters,
					{
						field: 'personId',
						operator: 'custom',
						value: this.personId,
					},
				];
			}
			this._store.dispatch(InsuranceTableActions.GetCurrentInsurancePending({ id: this.personId }));
		}
		super.ngOnInit();
	}

	public ngOnInit(): void {
		this._store.select('insurance' as any, 'table').subscribe(() => {
			if (this.personId) {
				this._store.dispatch(
					InsuranceTableActions.GetCurrentInsurancePending({ id: this.personId }),
				);
			}
		});
		super.ngOnInit();
	}

	public openDialog(dataItem?: any, isDublicate?: boolean): void {
		if (dataItem) {
			this._store.dispatch(
				this.getCurrentItemPending({ id: dataItem.id, controller: this.controller }),
			);
		}
		const dialog: DialogRef = this.dialogService.open({
			title: 'Insurance',
			content: InsurancePopupComponent,
			width: 600,
			height: 600,
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

	public columns: IColumn[] = [
		{
			field: 'orderType',
			title: 'Type',
			hidden: false,
			filterable: true,
			sortable: false,
			type: 'text',
		},
		{
			field: 'payer',
			title: 'Payer',
			hidden: false,
			filterable: true,
			sortable: false,
			type: 'text',
		},
		{
			field: 'effectiveDate',
			title: 'Effective Date',
			hidden: false,
			filterable: true,
			sortable: false,
			type: 'date',
		},
		{
			field: 'closedDate',
			title: 'Closed Date',
			hidden: false,
			filterable: true,
			sortable: false,
			type: 'date',
		},
		{
			field: 'memberId',
			title: 'Member ID',
			hidden: false,
			filterable: true,
			sortable: false,
			type: 'text',
		},
	];
}

export interface IInsuranceInfo {
	id: string;
	effectiveDate: string;
	closedDate: string | null;
	orderType: number;
	payer: string;
	memberId: string;
}

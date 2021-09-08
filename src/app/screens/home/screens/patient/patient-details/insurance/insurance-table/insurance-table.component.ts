/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject, Input, OnChanges } from '@angular/core';
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
	GET_TABLE_DATA_PENDING,
} from 'src/app/shared/table/table.tokens';
import { FormControl, FormGroup } from '@angular/forms';
import { IStore } from 'src/app/store';
import { InsurancePopupComponent } from './insurance-popup/insurance-popup.component';
import { InsuranceTableActions } from './insurance-table.actions';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
	providers: [],
	selector: 'advenium-insurance-table',
	templateUrl: './insurance-table.component.html',
	styleUrls: ['../../../../../home.component.scss'],
})
export class InsuranceTableComponent extends CustomTableDirective implements OnChanges {
	public constructor(
		private dialogService: DialogService,
		_store: Store<IStore>,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(CLEAR_CURRENT_ITEM) private clearCurrentItem: any,
	) {
		super(_store, getTableDataPending, getCurrentItemPending, deleteDataPending, editDataPending);
	}

	@Input() public personId!: string;

	public currentPrimaryInsurance$: Observable<IInsuranceInfo> = this._store
		.select('insuranceTable' as any, 'insurance', 'currentInsurance', 'primary')
		.pipe(takeUntil(this.unsubscribe$$));

	public currentSecondaryInsurance$: Observable<IInsuranceInfo> = this._store
		.select('insuranceTable' as any, 'insurance', 'currentInsurance', 'secondary')
		.pipe(takeUntil(this.unsubscribe$$));

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
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


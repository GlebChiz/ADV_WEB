/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_PENDING,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_SETTINGS_PENDING,
} from 'src/app/shared/table/table.tokens';
import { IStore } from 'src/app/store';
import { ISessionPlan } from 'src/app/shared/interfaces/session-plan.interface';
import { SessionPlanTableActions } from '../../session-plan/session-plan-table/session-plan-table.actions';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { RowArgs, SelectionEvent } from '@progress/kendo-angular-grid';

@Component({
	providers: [],
	selector: 'advenium-series-plan-linked-table',
	templateUrl: './series-plan-linked-table.component.html',
	styleUrls: ['../../../home.component.scss'],
})
export class SeriesPlanLinkedTableComponent extends CustomTableDirective implements OnInit {
	public constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		_store: Store<IStore>,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(SAVE_GRID_SETTINGS_PENDING) saveNewGridSettingsPending: any,
		@Inject(SAVE_GRID_CHANGES_PENDING) saveGridChangesPending: any,
	) {
		super(
			_store,
			getTableDataPending,
			getCurrentItemPending,
			deleteDataPending,
			editDataPending,
			saveNewGridSettingsPending,
			saveGridChangesPending,
		);
	}

	@Input() public seriesPlanId = '';

	public override ngOnInit(): void {
		this.addFiltersSorting(this.seriesPlanId);
		super.ngOnInit();
	}

	public addFiltersSorting(id: string | undefined): void {
		if (this.gridSettings.state.filter) {
			this.gridSettings.state.sort = [
				{
					field: 'orderNumber',
					dir: 'asc',
				},
			];
			if (
				!this.gridSettings.state.filter.filters.find((item: any) => item.field !== 'seriesPlanId')
			) {
				this.gridSettings.state.filter.filters = [
					...this.gridSettings.state.filter.filters,
					{
						field: 'seriesPlanId',
						operator: 'custom',
						value: id,
					},
				];
			}

			return;
		}
	}

	public reorder(isUp: boolean, dataitem: ISessionPlan): void {
		this._store.dispatch(
			SessionPlanTableActions.ReorderPlanPending({
				controller: this.controller,
				sessionPlanId: dataitem.id,
				seriesPlanId: this.seriesPlanId,
				index: isUp ? dataitem.orderNumber + 1 : dataitem.orderNumber - 1,
				storePath: this.storePath,
			}),
		);
	}

	public unlink(): void {
		this._store.dispatch(
			SessionPlanTableActions.LinkSessionPlansPending({
				controller: this.controller,
				ids: this.selectedItems,
				seriesPlanId: this.seriesPlanId,
				link: false,
				storePath: this.storePath,
			}),
		);
	}

	public link(): void {
		this._router.navigate(['select'], { relativeTo: this._activatedRoute.parent });
	}

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

	public columns: IColumn[] = [
		{
			field: 'orderNumber',
			title: 'Order',
			includeInChooser: false,
			hidden: false,
			filterable: false,
			sortable: true,
			type: 'text',
			style: { width: '100px', 'text-align': 'center' },
			headerStyle: { width: '100px' },
		},
		{
			field: 'title',
			title: 'Title',
			hidden: false,
			filterable: true,
			sortable: true,
			includeInChooser: true,
			type: 'text',
		},
	];
}

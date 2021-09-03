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
} from 'src/app/shared/table/table.tokens';
import { IStore } from 'src/app/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { RowArgs, SelectionEvent } from '@progress/kendo-angular-grid';
import { SessionPlanTableActions } from '../../session-plan/session-plan-table/session-plan-table.actions';

@Component({
	providers: [],
	selector: 'advenium-series-plan-unlinked-table',
	templateUrl: './series-plan-unlinked-table.component.html',
	styleUrls: ['../../../home.component.scss'],
})
export class SeriesPlanUnlinkedTableComponent extends CustomTableDirective implements OnInit {
	public constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		_store: Store<IStore>,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
	) {
		super(_store, getTableDataPending, getCurrentItemPending, deleteDataPending, editDataPending);
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
					field: 'title',
					dir: 'asc',
				},
			];
			if (
				!this.gridSettings.state.filter.filters.find((item: any) => item.field !== 'seriesPlanId')
			) {
				this.gridSettings.state.filter.filters = [
					...this.gridSettings.state.filter.filters,
					{
						field: 'notLinkedTo',
						operator: 'custom',
						value: id
					},
				];
			}

			return;
		}
	}

	public link(): void {
		this._store.dispatch(
			SessionPlanTableActions.LinkSessionPlansPending({
				controller: this.controller,
				ids: this.selectedItems,
				seriesPlanId: this.seriesPlanId,
				link: true,
				storePath: this.storePath,
			}),
		);
	}

	public backToLinked(): void {
		this._router.navigate(['../'], { relativeTo: this._activatedRoute });
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

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
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { RowArgs, SelectionEvent } from '@progress/kendo-angular-grid';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
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
		private _action$: Actions,
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

	public allSelectedItems: any[] = [];

	public onlySelected: boolean = false;

	public showOnlySelected(value: boolean): boolean {
		this.onlySelected = value;
		if (this.gridSettings.state.filter) {
			this.gridSettings.state.filter.filters = [
				...this.gridSettings.state.filter.filters,
				{
					field: 'ids',
					operator: 'custom',
					value: value === true ? this.allSelectedItems : null,
				},
			];
		}
		this.gridSettings.state.skip = 0;
		super.ngOnInit();
		return false;
	}

	public override ngOnInit(): void {
		this.addFiltersSorting(this.seriesPlanId);
		super.ngOnInit();
	}

	public discard(): boolean {
		this.allSelectedItems = [];
		this.selectedItems = [];
		this.showOnlySelected(false);
		return false;
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
						value: id,
					},
				];
			}

			return;
		}
	}

	public link(): void {
		this._action$
			.pipe(ofType(SessionPlanTableActions.LinkSessionPlansSuccess), takeUntil(this.unsubscribe$$))
			.subscribe(() => {
				this.backToLinked();
			});
		this._store.dispatch(
			SessionPlanTableActions.LinkSessionPlansPending({
				controller: this.controller,
				ids: this.allSelectedItems,
				seriesPlanId: this.seriesPlanId,
				link: true,
				storePath: this.storePath,
			}),
		);
	}

	public backToLinked(): void {
		this._router.navigate(['../'], { relativeTo: this._activatedRoute });
	}

	public isRowSelected = (e: RowArgs) =>
		this.allSelectedItems?.includes(e.dataItem.id) === true ||
		this.selectedItems?.includes(e.dataItem.id) === true;

	public selectionChange(event: SelectionEvent): void {
		const currentSelectedItems: any[] = [...this.selectedItems];
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
		currentSelectedItems.forEach((item) => {
			var index = this.allSelectedItems.indexOf(item);
			if (index >= 0) {
				this.allSelectedItems.splice(index, 1);
			}
		});
		this.selectedItems.forEach((item) => this.allSelectedItems.push(item));
		if (this.allSelectedItems.length === 0) {
			this.showOnlySelected(false);
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

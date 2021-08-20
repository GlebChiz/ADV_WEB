import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { CellClickEvent } from '@progress/kendo-angular-grid';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	CLEAR_CURRENT_ITEM,
	CREATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_PENDING,
} from 'src/app/shared/table/table.tokens';
import { tap, filter } from 'rxjs/operators';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { IStore } from 'src/app/store';
import { IColumn } from '../../../../../shared/interfaces/column.interface';
import { DropdownActions } from '../../../../../store/actions/dropdowns.actions';
import { SessionPlanPopupComponent } from './session-plan-popup/session-plan-popup.component';
import { SessionPlanTableActions } from './session-plan-table.actions';
import { ISessionPlan } from 'src/app/shared/interfaces/session-plan.interface';

@Component({
	providers: [],
	selector: 'advenium-session-plan-table',
	templateUrl: './session-plan-table.component.html',
	styleUrls: ['../../../home.component.scss'],
})
export class SessionPlanTableComponent extends CustomTableDirective implements OnInit {
	public constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		_store: Store<IStore>,
		private dialogService: DialogService,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(CLEAR_CURRENT_ITEM) private clearCurrentItem: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
	) {
		super(_store, getTableDataPending, getCurrentItemPending, deleteDataPending, editDataPending);
	}

	public id = '';

	public seriesPlan: FormControl = new FormControl();

	public override ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSeriesPlansPending());

		this._activatedRoute.queryParams.subscribe((query: Params) => {
			this.addQuery(query.id);
			this.id = query.id || '';
			super.ngOnInit();
			this.selectState();

			this.columns.forEach((item: IColumn) => {
				item.sortable = !query.id;
				if (!item.includeInChooser) {
					item.filterable = !query.id;
					item.hidden = !query.id;
				}
			});
		});
	}

	public openDialog(dataItem?: ISessionPlan, isDublicate?: boolean): void {
		if (dataItem) {
			this._store.dispatch(
				this.getCurrentItemPending({ id: dataItem.id, controller: this.controller }),
			);
		}
		const dialog: DialogRef = this.dialogService.open({
			title: 'Session Plan',
			content: SessionPlanPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});

		dialog.content.instance.sessionPlan = { ...dataItem };
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

	public addQuery(id: string): void {
		if (this.gridSettings.state.filter) {
			if (id) {
				this.gridSettings.state.sort = [
					{
						field: 'orderNumber',
						dir: 'asc',
					},
				];
				this.gridSettings.state.filter.filters = [
					...this.gridSettings.state.filter.filters,
					{
						field: 'seriesPlanId',
						operator: 'custom',
						value: id,
					},
				];
				return;
			}
			this.gridSettings.state.sort = [];
			this.gridSettings.state.filter.filters = this.gridSettings.state.filter.filters.filter(
				(item: any) => item.field !== 'seriesPlanId',
			);
		}
	}

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
	}

	public reorder(isUp: boolean, dataitem: ISessionPlan): void {
		this._store.dispatch(
			SessionPlanTableActions.ReorderPlanPending({
				controller: this.controller,
				sessionPlanId: dataitem.id,
				seriesPlanId: this.id,
				index: isUp ? dataitem.orderNumber + 1 : dataitem.orderNumber - 1,
			}),
		);
	}

	public seriesPlansDropdown$: Observable<IDropdownData[]> = this._store
		.select('seriesPlanDropdown', 'data')
		.pipe(
			filter((data: IDropdownData[]) => data.length > 0),
			tap((data: IDropdownData[]) => {
				if (this._activatedRoute.snapshot.queryParams.id) {
					const current: IDropdownData | undefined = data.find(
						(item: IDropdownData) => item.id === this._activatedRoute.snapshot.queryParams.id,
					);
					if (current) {
						this.seriesPlan.setValue(current.id);
					}
				}
			}),
		);

	public selectionChange(item: IDropdownData | undefined): void {
		if (!item) {
			this._router.navigate(['.'], {
				relativeTo: this._activatedRoute,
			});
			return;
		}
		this._router.navigate(['.'], {
			queryParams: { id: item.id },
			relativeTo: this._activatedRoute,
			queryParamsHandling: 'merge',
		});
	}

	public columns: IColumn[] = [
		{
			field: 'orderNumber',
			title: 'Order',
			includeInChooser: false,
			hidden: true,
			filterable: false,
			sortable: true,
			type: 'text',
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
		{
			field: 'seriesPlans',
			title: 'Series plans',
			includeInChooser: true,
			hidden: false,
			filterable: false,
			sortable: true,
			type: 'text',
		},
		{
			field: 'translated',
			title: 'Translated',
			includeInChooser: false,
			hidden: true,
			sortable: true,
			filterable: false,
			type: 'text',
		},
	];

	public onCellClick(e: CellClickEvent): void {
		this._router.navigate([e.dataItem.id], { relativeTo: this._activatedRoute });
	}
}

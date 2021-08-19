import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { CellClickEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_PENDING,
} from 'src/app/shared/table/table.tokens';
import { IColumn } from '../../../../../shared/interfaces/column.interface';
import { DropdownActions } from './../../../../../store/actions/dropdowns.actions';
import { tap, filter } from 'rxjs/operators';

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
		_store: Store<any>,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		// @Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
	) {
		super(_store, getTableDataPending, getCurrentItemPending, deleteDataPending, editDataPending);
	}

	public seriesPlan: FormControl = new FormControl();

	public override ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSeriesPlansPending());

		this._activatedRoute.queryParams.subscribe((query: Params) => {
			this.addQuery(query.id);
			super.ngOnInit();
			this.selectState();
		});
	}

	public addQuery(id: string): void {
		if (this.gridSettings.state.filter && id) {
			this.gridSettings.state.filter.filters = [
				...this.gridSettings.state.filter.filters,
				{
					field: 'seriesPlans',
					operator: 'contains',
					value: id,
				},
			];
		}
	}

	public override dataStateChange(state: DataStateChangeEvent): void {
		super.dataStateChange(state);
	}

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
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

	public selectionChange(item: IDropdownData): void {
		this._router.navigate(['.'], {
			queryParams: { id: item.id },
			relativeTo: this._activatedRoute,
			queryParamsHandling: 'merge',
		});
	}

	public columns: IColumn[] = [
		{
			field: 'title',
			title: 'Title',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'translated',
			title: 'Translated',
			hidden: false,
			filterable: false,
			type: 'text',
		},
		//  appears only when session plan is selected
		// up down arrows
		// {
		// 	field: 'orderNumber',
		// 	title: 'Order',
		// 	hidden: false,
		// 	filterable: false,
		// 	type: 'text',
		// }, appears only when session plan is selected
	];

	public onCellClick(e: CellClickEvent): void {
		this._router.navigate([e.dataItem.id], { relativeTo: this._activatedRoute });
	}
}

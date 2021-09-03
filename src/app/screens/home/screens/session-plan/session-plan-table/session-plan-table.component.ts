/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
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
import { ISessionPlan } from 'src/app/shared/interfaces/session-plan.interface';
import { IColumn } from '../../../../../shared/interfaces/column.interface';
import { DropdownActions } from '../../../../../store/actions/dropdowns.actions';
import { SessionPlanPopupComponent } from './session-plan-popup/session-plan-popup.component';
import { SessionPlanTableActions } from './session-plan-table.actions';

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

	public id: string = '';

	public seriesPlansDropdown$: Observable<IDropdownData[]> = this._store
		.select('dropdown' as any, 'seriesPlans')
		.pipe(
			filter((data: IDropdownData[]) => data?.length > 0),
			tap((data: IDropdownData[]) => {
				if (this._activatedRoute.snapshot.queryParams.seriesPlanId) {
					const current: IDropdownData | undefined = data.find(
						(item: IDropdownData) =>
							item.id === this._activatedRoute.snapshot.queryParams.seriesPlanId,
					);
					if (current) {
						this.seriesPlan.setValue(current.id);
					}
				}
			}),
		);

	public languagesDropdown$: Observable<IDropdownData[]> = this._store.select(
		'dropdown' as any,
		'languages',
	);

	public seriesPlan: FormControl = new FormControl();

	public language: FormControl = new FormControl();

	public override ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSeriesPlansPending());
		this._store.dispatch(DropdownActions.GetLanguagesPending());
		this.language.valueChanges.subscribe((language: string) => {
			const translatedColumn: IColumn | undefined = this.columns.find(
				(item: IColumn) => item.field === 'translated',
			);
			if (translatedColumn) {
				if (language === '4dc1ef9d-76e3-4b70-8b0d-7109661ec568') {
					translatedColumn.hidden = true;
					return;
				}
				translatedColumn.hidden = !language;
			}
		});
		this._activatedRoute.queryParams.subscribe((query: Params) => {
			this.addFiltersSorting(query.seriesPlanId, this.language.value);
			this.id = query.seriesPlanId || '';
			super.ngOnInit();

			this.columns.forEach((item: IColumn) => {
				item.sortable = !query.seriesPlanId;
				if (!item.includeInChooser && item.field !== 'translated') {
					item.filterable = !query.seriesPlanId;
					item.hidden = !query.seriesPlanId;
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
			width: 1200,
			height: 800,
			minWidth: 250,
		});

		dialog.content.instance.sessionPlan = dataItem
			? { ...dataItem }
			: { calloutMinutes1: 15, calloutMinutes2: 25, calloutMinutes3: 35, wrapupMinutes: 43 };
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

	public addFiltersSorting(id: string | undefined, languageId: string | undefined): void {
		if (this.gridSettings.state.filter) {
			if (languageId) {
				this.gridSettings.state.filter.filters = [
					...this.gridSettings.state.filter.filters,
					{
						field: 'languageId',
						operator: 'custom',
						value: languageId,
					},
				];
			}
			if (id) {
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
			if (!id && !languageId) {
				this.gridSettings.state.sort = [];
				this.gridSettings.state.filter.filters = this.gridSettings.state.filter.filters.filter(
					(item: any) => item.operator !== 'custom',
				);
			}
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

	public selectionChangeSeriesPlan(item: IDropdownData | undefined): void {
		if (!item) {
			this._router.navigate(['.'], {
				relativeTo: this._activatedRoute,
			});
			return;
		}
		this._router.navigate(['.'], {
			queryParams: { seriesPlanId: item.id },
			relativeTo: this._activatedRoute,
			queryParamsHandling: 'merge',
		});
	}

	public selectionChangeLanguage(item: IDropdownData | undefined): void {
		if (item) {
			this.addFiltersSorting(this._activatedRoute.snapshot.queryParams.seriesPlanId, item.id);
			super.ngOnInit();
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
}

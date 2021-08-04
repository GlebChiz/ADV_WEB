import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { SortDirection } from 'src/app/core/models/filters/column-filter.model';
import { IPayer } from 'src/app/core/models/payer.model';
import { PayerGridService } from 'src/app/core/services/payer.service';
import { ValidationMessageService } from 'src/app/core/services/validation.message.service';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { GridActions } from 'src/app/core/store/grid/grid.actions';
import { IGridColumnInfo } from 'src/app/core/store/grid/grid.state';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-payer-manager',
	templateUrl: './payer-manager.component.html',
})
export class PayerManagerComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	public gridId = 'payer-manager-grid';

	public filterId = 'payer-manager-filter';

	public payerModel: IPayer | null = null;

	public constructor(
		private _store: Store<IAppState>,
		private _service: PayerGridService,
		public validationService: ValidationMessageService,
	) {}

	public ngOnInit(): void {
		this._store.dispatch(PageSettingsActions.SetTitle({ settings: { title: "Payers's Manager" } }));
	}

	public group() {
		return [{ field: 'type' }];
	}

	public columns() {
		return [
			{
				name: 'name',
				title: 'Name',
				filter: {
					field: 'name',
				},
				sortDirection: SortDirection.Asc,
			} as IGridColumnInfo,
			{
				name: 'type',
				title: 'Type',
				sortDirection: SortDirection.Asc,
				filter: {
					field: 'typename',
				},
			} as IGridColumnInfo,
			{
				name: 'payerId',
				title: 'Payer Id',
				sortDirection: SortDirection.Asc,
				filter: {
					field: 'payerid',
				},
			} as IGridColumnInfo,
			{
				name: 'carrierCode',
				title: 'Carrier Code',
				sortDirection: SortDirection.Asc,
				filter: {
					field: 'carrierCode',
				},
			} as IGridColumnInfo,
		];
	}

	public ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	public openNewItem(): void {
		this.payerModel = {} as IPayer;
	}

	public openDetails(e: any): void {
		this._service.getModel(e.id).subscribe((x: any) => {
			this.payerModel = x;
		});
	}

	public openDuplicate(e: any): void {
		this._service.getModel(e.id).subscribe((x: any) => {
			x.id = null;
			this.payerModel = x;
		});
	}

	public remove(e: any): void {
		if (!window.confirm('Are you sure you want to delete payer?')) {
			return;
		}
		this._service.deleteModel(e.id).subscribe((response: any) => {
			this.validationService.displayResponse(response);
			this._store.dispatch(GridActions.ReloadGrid({ gridId: this.gridId }));
		});
	}

	public onSave(): void {
		this._store.dispatch(GridActions.ReloadGrid({ gridId: this.gridId }));
	}

	public createButton() {
		return {
			title: 'New Payer',
		};
	}
}

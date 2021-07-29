import {
	Component,
	Output,
	EventEmitter,
	Input,
	OnInit,
	OnDestroy,
	ViewEncapsulation,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
	ColumnFilter,
	ColumnFilterDataType,
	ColumnFilterType,
	ColumnFilterTypeNames,
} from 'src/app/core/models/filters/column-filter.model';
import { FilterActions } from 'src/app/core/store/filter/filter.actions';
import { GridActions } from 'src/app/core/store/grid/grid.actions';
import { selectGridFilter } from 'src/app/core/store/grid/grid.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-grid-column-filter',
	templateUrl: './column-filter.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class GridColumnFilterComponent implements OnInit, OnDestroy {
	filter: ColumnFilter | null = null;

	@Input() gridId!: string;

	@Input() filterId!: string;

	@Input() column!: string;

	showPopup = false;

	show = false;

	filter$: Observable<ColumnFilter> | null = null;

	private _destroy$ = new Subject();

	constructor(public _store: Store<IAppState>) {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	ngOnInit(): void {
		this.filter = null;
		this.filter$ = this._store.pipe(
			select(selectGridFilter, {
				gridId: this.gridId,
				name: this.column,
			}),
			takeUntil(this._destroy$),
		);
		this.filter$.subscribe((f) => {
			if (f) {
				this.filter = f;
				this.show = true;
			}
		});
	}

	isValueFilter() {
		return this.show && this.filter?.dataType === ColumnFilterDataType.String;
	}

	isIntervalFilter() {
		return this.show && this.filter?.dataType === ColumnFilterDataType.Interval;
	}

	isDateFilter() {
		return this.show && this.filter?.dataType === ColumnFilterDataType.Date;
	}

	title() {
		if (this.show !== true) {
			return '';
		}
		const isNegative = this.filter!.type < 0;
		const text = ColumnFilterTypeNames[isNegative ? -this.filter!.type : this.filter!.type];
		return `${isNegative ? 'not ' : ''}${text}`;
	}

	operations() {
		const list: any = [];
		const types = this.operationTypes();
		types.forEach((t) =>
			list.push({
				name: ColumnFilterTypeNames[t],
				type: t,
			}),
		);
		types.forEach((t) =>
			list.push({
				name: `not ${ColumnFilterTypeNames[t]}`,
				type: -t,
			}),
		);
		return list;
	}

	operationTypes() {
		let list: any = [];

		if (
			this.filter!.dataType === ColumnFilterDataType.Date ||
			this.filter!.dataType === ColumnFilterDataType.Interval
		) {
			list = [
				ColumnFilterType.Equal,
				ColumnFilterType.More,
				ColumnFilterType.Less,
				ColumnFilterType.MoreEqual,
				ColumnFilterType.LessEqual,
				ColumnFilterType.Empty,
			];
			if (this.filter!.dataType === ColumnFilterDataType.Interval) {
				list.push(ColumnFilterType.Between);
			}
		} else if (this.filter!.dataType === ColumnFilterDataType.String) {
			list = [
				ColumnFilterType.Equal,
				ColumnFilterType.Contains,
				ColumnFilterType.StartsWith,
				ColumnFilterType.EndsWith,
				ColumnFilterType.Empty,
			];
		}
		return list;
	}

	public onToggle(): void {
		this.showPopup = !this.showPopup;
	}

	onSelect(item: any): void {
		this._store.dispatch(
			GridActions.SetColumnFilterType({
				gridId: this.gridId,
				name: this.column,
				filterType: item.type,
			}),
		);
		this._store.dispatch(FilterActions.TriggerFilter({ id: this.filterId }));
	}
}

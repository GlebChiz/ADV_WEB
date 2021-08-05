import {
	Directive,
	OnInit,
	Input,
	OnDestroy,
	EventEmitter,
	Output,
	ChangeDetectorRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SortDescriptor, process } from '@progress/kendo-data-query';
import {
	GridComponent,
	GridDataResult,
	DataStateChangeEvent,
	SortSettings,
	PagerSettings,
} from '@progress/kendo-angular-grid';

@Directive({
	selector: '[adveniumGrid]',
})
export class GridDirective implements OnInit, OnDestroy {
	@Input('adveniumGrid') public $data: Observable<GridDataResult> =
		{} as Observable<GridDataResult>;

	@Input() public gridPageSize!: number;

	@Input() public gridSortable: SortSettings | boolean | null = null;

	@Input() public sort: SortDescriptor[] | null = null;

	@Input() public gridPageable: PagerSettings | boolean | null = null;

	@Output() public afterInit: EventEmitter<GridDirective> = new EventEmitter<GridDirective>();

	protected _destroy$ = new Subject();

	public constructor(private _cd: ChangeDetectorRef, public gridComponent: GridComponent) {}

	public ngOnDestroy(): void {
		this._destroy$.next(null);
		this._destroy$.complete();
	}

	public ngOnInit(): void {
		if (this.gridPageable != null) {
			this.gridComponent.pageable = this.gridPageable;
		} else {
			this.gridComponent.pageable = { pageSizes: [5, 10, 20, 50, 100] };
		}

		if (this.gridSortable != null) {
			this.gridComponent.sortable = this.gridSortable;
		} else {
			this.gridComponent.sortable = false;
		}

		this.gridComponent.pageSize = this.gridPageSize || 10;
		this.gridComponent.scrollable = 'none';
		this.$data.pipe(takeUntil(this._destroy$)).subscribe((x) => {
			// Timeout is used to prevent ExpressionChangedAfterItHasBeenCheckedError
			setTimeout(() => {
				if (this.gridComponent.group && x && x.data) {
					const data = {
						...process(x.data, { group: this.gridComponent.group }),
						total: x.total,
					};
					this.gridComponent.data = data;
				} else {
					this.gridComponent.data = x;
				}

				this.gridComponent.loading = false;
				// setTimeout(() => this.gridComponent.loading = false, 0);
				this._cd.markForCheck();
			}, 0);
		});

		this.gridComponent.dataStateChange
			.pipe(takeUntil(this._destroy$))
			.subscribe((x: DataStateChangeEvent) => {
				setTimeout(() => (this.gridComponent.loading = true), 0);
				this.gridComponent.pageSize = x.take;
				this.gridComponent.skip = x.skip;
				this.gridComponent.sort = x.sort || this.gridComponent.sort;
			});

		this.afterInit.emit(this);
	}

	public load(): void {
		this.gridComponent.dataStateChange.emit({
			skip: this.gridComponent.skip,
			take: this.gridComponent.pageSize,
			sort: this.gridComponent.sort,
		});
	}
}

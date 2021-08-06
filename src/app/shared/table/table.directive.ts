/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import { IFilter } from './table.model';
import { GET_TABLE_DATA_PENDING } from './table.tokens';

@Directive({
	selector: 'advenium-table',
})
export class CustomTableDirective implements OnInit, OnChanges {
	@Input() public controller: string = '';

	@Input() public storePath: string = '';

	@Input() public filter!: IFilter;

	public constructor(
		private _store: Store<IAppState>,
		// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
		@Inject(GET_TABLE_DATA_PENDING) private getTableDataPending: any,
	) {}

	public ngOnInit(): void {
		this._store.dispatch(
			this.getTableDataPending({ controller: this.controller, filter: this.filter }),
		);
		this._store
			.select((state: any) => state[this.storePath])
			.subscribe((table: any) => console.log('im in table: ', this.storePath, table));
	}

	public ngOnChanges(): void {
		console.log('change');
		this.getPortionData();
	}

	public getPortionData(): void {
		this._store.dispatch(
			this.getTableDataPending({
				controller: this.controller,
				filter: this.filter,
			}),
		);
	}
}

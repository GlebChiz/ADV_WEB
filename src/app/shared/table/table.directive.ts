/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import { GET_TABLE_DATA_PENDING } from './table.tokens';

@Directive({
	selector: 'advenium-table',
})
export class CustomTableDirective implements OnInit {
	@Input() public controller: string = '';

	@Input() public storePath: string = '';

	public constructor(
		private _store: Store<IAppState>,
		// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
		@Inject(GET_TABLE_DATA_PENDING) private getTableDataPending: any,
	) {}

	public ngOnInit(): void {
		this._store.dispatch(this.getTableDataPending({ controller: this.controller }));
		this._store
			.select((state: any) => state[this.storePath])
			.subscribe((table: any) => console.log('im in table: ', this.storePath, table));
	}
}

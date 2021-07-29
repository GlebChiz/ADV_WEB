import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { selectPageSettings } from 'src/app/core/store/selectors/page-settings/psge-settings.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-layout-page-title',
	templateUrl: './page-title.component.html',
	styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent implements OnInit, OnDestroy {
	pageSettings$ = this._store.pipe(select(selectPageSettings));

	private _destroy$ = new Subject();

	constructor(private _store: Store<IAppState>) {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	ngOnInit(): void {}
}

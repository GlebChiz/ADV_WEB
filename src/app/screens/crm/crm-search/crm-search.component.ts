import { Component, OnChanges, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { IAppState } from 'src/app/core/store/state/app.state';
import { selectCRMSearch } from 'src/app/core/store/crmsearch/crmsearch.selectors';
import {
	CRMPersonFound,
	CRMPersonMatchRole,
	CRMResult,
	CRMSearch,
	CRMSearchType,
} from 'src/app/core/models/crm-search.model';
import { Actions } from '@ngrx/effects';
import { CRMSearchService } from 'src/app/core/services/crmsearch.service';
import { takeUntil } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
	providers: [],
	selector: 'advenium-crm-search',
	templateUrl: './crm-search.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class CRMSearchComponent implements OnInit, OnChanges, OnDestroy {
	private _destroy$ = new Subject();

	search$ = this._store.pipe(select(selectCRMSearch), takeUntil(this._destroy$));

	persons: CRMPersonFound[] = [];

	result: CRMResult = {} as CRMResult;

	search: CRMSearch = {} as CRMSearch;

	constructor(
		private _store: Store<IAppState>,
		private actions$: Actions,
		private crmService: CRMSearchService,
	) {
		this.persons = [];
		this.search$.subscribe((search) => {
			console.log(search);
			this.crmService.search(search, null).subscribe((searchResult) => {
				this.persons = [];
				if (searchResult) {
					this.persons = this.crmService.combineResultPersons(searchResult);

					console.log(this.persons);
					console.log(searchResult);
				}
			});
		});
	}

	formatCallTime(date: Date | null) {
		return formatDate(date, 'MM/dd/yyyy hh:mm a', 'en-US');
	}

	ngOnInit(): void {}

	getRoleName(value: CRMPersonMatchRole) {
		switch (value) {
			case CRMPersonMatchRole.Caller:
				return 'Caller';
			case CRMPersonMatchRole.Parent:
				return 'Parent';
			case CRMPersonMatchRole.Patient:
				return 'Patient';
		}
		return '';
	}

	ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}
}

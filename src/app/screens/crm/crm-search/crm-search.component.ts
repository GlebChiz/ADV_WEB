import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { IAppState } from 'src/app/core/store/state/app.state';
import { selectCRMSearch } from 'src/app/core/store/crmsearch/crmsearch.selectors';
import {
	ICRMPersonFound,
	CRMPersonMatchRole,
	ICRMResult,
	ICRMSearch,
} from 'src/app/core/models/crm-search.model';
import { CRMSearchService } from 'src/app/core/services/crmsearch.service';
import { takeUntil } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
	providers: [],
	selector: 'advenium-crm-search',
	templateUrl: './crm-search.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class CRMSearchComponent implements OnDestroy, OnInit {
	private _destroy$ = new Subject();

	search$!: Observable<ICRMSearch | null>;

	persons: ICRMPersonFound[] = [];

	result: ICRMResult = {} as ICRMResult;

	search: ICRMSearch = {} as ICRMSearch;

	constructor(
		private _store: Store<IAppState>,
		// private actions$: Actions,
		private crmService: CRMSearchService,
	) {
		this.persons = [];
		this.search$.subscribe((search) => {
			this.crmService.search(search!, null!).subscribe((searchResult) => {
				this.persons = [];
				if (searchResult) {
					this.persons = this.crmService.combineResultPersons(searchResult);
				}
			});
		});
	}

	formatCallTime(date: string | number | Date) {
		return formatDate(date, 'MM/dd/yyyy hh:mm a', 'en-US');
	}

	getRoleName(value: CRMPersonMatchRole) {
		switch (value) {
			case CRMPersonMatchRole.Caller:
				return 'Caller';
			case CRMPersonMatchRole.Parent:
				return 'Parent';
			case CRMPersonMatchRole.Patient:
				return 'Patient';
			default:
				return '';
		}
	}

	ngOnInit(): void {
		this.search$ = this._store.select(selectCRMSearch).pipe(takeUntil(this._destroy$));
	}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}
}

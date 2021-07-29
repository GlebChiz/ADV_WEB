import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { CacheSection } from 'src/app/core/models/user.model';
import { IAppState } from 'src/app/core/store/state/app.state';
import { MenuService } from 'src/app/shared/services/menu.service';
import { Location } from '@angular/common';

@Component({
	providers: [],
	selector: 'advenium-reset-cache',
	templateUrl: './reset-cache.component.html',
})
export class ResetCacheComponent implements OnInit, OnChanges, OnDestroy {
	private _destroy$ = new Subject();

	constructor(
		private route: ActivatedRoute,
		private _store: Store<IAppState>,
		private router: Router,
		private menuService: MenuService,
		private location: Location,
	) {}

	ngOnInit(): void {
		combineLatest([this.route.params, this.route.fragment]).subscribe(([xParams, xFragment]) => {
			const section = parseInt(xParams.section, 10) as CacheSection;
			this.menuService.resetCache(section || CacheSection.All).subscribe((x) => {
				this.location.back();
			});
		});
	}

	ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}
}

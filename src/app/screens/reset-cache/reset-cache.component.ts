import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { CacheSection } from 'src/app/core/models/user.model';
import { MenuService } from 'src/app/shared/services/menu.service';
import { Location } from '@angular/common';

@Component({
	providers: [],
	selector: 'advenium-reset-cache',
	templateUrl: './reset-cache.component.html',
})
export class ResetCacheComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	constructor(
		private route: ActivatedRoute,
		// private _store: Store<IAppState>,
		// private router: Router,
		private menuService: MenuService,
		private location: Location,
	) {}

	ngOnInit(): void {
		combineLatest([this.route.params, this.route.fragment]).subscribe(([xParams]) => {
			const section = parseInt(xParams.section, 10) as CacheSection;
			this.menuService.resetCache(section || CacheSection.All).subscribe(() => {
				this.location.back();
			});
		});
	}

	// ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}
}

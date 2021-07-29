import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectActiveCall } from 'src/app/core/store/call/call.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';
import { selectUser } from 'src/app/core/store/user/user.selectors';
import { AuthenticationService } from '../../services';
import { MenuService } from '../../services/menu.service';

@Component({
	selector: 'advenium-layout-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class MenuComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	items: any[] = [];

	user$ = this._store.pipe(select(selectUser));

	call$ = this._store.pipe(select(selectActiveCall), takeUntil(this._destroy$));

	hasActiveCall = false;

	isVisible(item: any): boolean {
		if (item.isVisible === false) {
			return false;
		}
		if (item.path === 'active-call' && this.hasActiveCall === false) {
			return false;
		}
		return true;
	}

	constructor(
		private _store: Store<IAppState>,
		public menuService: MenuService,
		private router: Router,
		private authenticationService: AuthenticationService,
	) {}

	refreshItem(item: any): void {
		item.cssClass = `child-menu-item ${this.isVisible(item) === false ? 'hidden' : ''}`;
	}

	refreshItems(): void {
		this.items.forEach((i) => {
			this.refreshItem(i);
			if (i.items) {
				i.items.forEach((x) => this.refreshItem(x));
			}
		});
	}

	ngOnInit(): void {
		if (this.authenticationService.getCurrentUser()) {
			this.items = this.menuService.getMainMenu();
			this.refreshItems();
		}
		this.call$.subscribe((x) => {
			this.hasActiveCall = x != null;
			this.refreshItems();
		});
	}

	onSelect({ item }: any): void {
		if (
			(!item.items || item.items.length === 0) &&
			item.path &&
			this.router.config.map((r) => r.path).includes(item.path)
		) {
			this.router.navigate([item.path]);
		}
	}

	ngOnDestroy(): void {
		this._destroy$.next();
	}
}

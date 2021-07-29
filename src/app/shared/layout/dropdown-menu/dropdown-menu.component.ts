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
	selector: 'advenium-layout-dropdown-menu',
	templateUrl: './dropdown-menu.component.html',
	styleUrls: ['./dropdown-menu.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DropdownMenuComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	items: any[] = [];

	user$ = this._store.pipe(select(selectUser));

	call$ = this._store.pipe(select(selectActiveCall), takeUntil(this._destroy$));

	hasActiveCall = false;

	show = false;

	constructor(
		public menuService: MenuService,
		private router: Router,
		private authenticationService: AuthenticationService,
		private _store: Store<IAppState>,
	) {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	ngOnInit(): void {
		if (this.authenticationService.getCurrentUser()) {
			const items = this.menuService.getMainMenu();
			items.forEach((x) => {
				x.cssClass = 'parent-dropdown-menu-item dropdown-menu-item';
				this.items.push(x);
				if (x.items != null) {
					x.items.forEach((i) => {
						i.cssClass = 'child-dropdown-menu-item dropdown-menu-item';
						this.items.push(i);
					});
				}
			});
			this.refreshItems();
		}
	}

	onSelect({ item }: any): void {
		item = item.data;

		if (
			(!item.items || item.items.length === 0) &&
			item.path &&
			this.router.config.map((r) => r.path).includes(item.path)
		) {
			this.router.navigate([item.path]);
		}
		this.show = false;
	}

	public onToggle(): void {
		this.show = !this.show;
	}

	refreshItem(item: any): void {
		delete item.cssClass.hidden;
		item.cssClass += this.isVisible(item) === false ? ' hidden' : '';
	}

	refreshItems(): void {
		this.items.forEach((i) => {
			this.refreshItem(i);
			if (i.items) {
				i.items.forEach((x) => this.refreshItem(x));
			}
		});
	}

	isVisible(item: any): boolean {
		if (item.isVisible === false) {
			return false;
		}
		if (item.path === 'active-call' && this.hasActiveCall === false) {
			return false;
		}
		return true;
	}
}

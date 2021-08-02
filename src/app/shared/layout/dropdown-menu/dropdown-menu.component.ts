import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICall } from 'src/app/core/models/call.model';
import { IUser } from 'src/app/core/models/user.model';
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

	constructor(
		private _store: Store<IAppState>,
		public menuService: MenuService,
		private router: Router,
		private authenticationService: AuthenticationService,
	) {}

	items: any[] = [];

	user$!: Observable<IUser | null>;

	call$!: Observable<ICall | null>;

	hasActiveCall = false;

	show = false;

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	ngOnInit(): void {
		this.user$ = this._store.select(selectUser);
		this.call$ = this._store.select(selectActiveCall).pipe(takeUntil(this._destroy$));
		if (this.authenticationService.getCurrentUser()) {
			const items = this.menuService.getMainMenu();
			items.forEach((x) => {
				x.cssClass = 'parent-dropdown-menu-item dropdown-menu-item';
				this.items.push(x);
				if (x.items != null) {
					x.items.forEach((i: any) => {
						i.cssClass = 'child-dropdown-menu-item dropdown-menu-item';
						this.items.push(i);
					});
				}
			});
			this.refreshItems();
		}
	}

	onSelect({ item }: any): void {
		const locItem: any = item.data;

		if (
			(!locItem.items || locItem.items.length === 0) &&
			locItem.path &&
			this.router.config.map((r) => r.path).includes(locItem.path)
		) {
			this.router.navigate([locItem.path]);
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
				i.items.forEach((x: any) => this.refreshItem(x));
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

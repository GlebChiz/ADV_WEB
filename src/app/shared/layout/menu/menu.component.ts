import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuSelectEvent } from '@progress/kendo-angular-menu';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICall } from 'src/app/core/models/call.model';
import { IUser } from 'src/app/core/models/user.model';
import { selectActiveCall } from 'src/app/core/store/call/call.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';
import { selectUser } from 'src/app/core/store/user/user.selectors';
import { MenuService } from '../../services/menu.service';

@Component({
	selector: 'advenium-layout-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class MenuComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	public items: any[] = [];

	public user$!: Observable<IUser | null>;

	public call$!: Observable<ICall | null>;

	public hasActiveCall = false;

	public isVisible(item: any): boolean {
		if (item.isVisible === false) {
			return false;
		}
		if (item.path === 'active-call' && this.hasActiveCall === false) {
			return false;
		}
		return true;
	}

	public constructor(
		private _store: Store<IAppState>,
		public menuService: MenuService,
		private router: Router,
	) {}

	public refreshItem(item: any): void {
		item.cssClass = `child-menu-item ${this.isVisible(item) === false ? 'hidden' : ''}`;
	}

	public refreshItems(): void {
		this.items.forEach((i) => {
			this.refreshItem(i);
			if (i.items) {
				i.items.forEach((x: any) => this.refreshItem(x));
			}
		});
	}

	public ngOnInit(): void {
		this.call$ = this._store.select(selectActiveCall).pipe(takeUntil(this._destroy$));
		this.user$ = this._store.select(selectUser);
		this._store.select('userState', 'user').subscribe((user: IUser | null) => {
			if (user) {
				this.items = this.menuService.getMainMenu(user);
				this.refreshItems();
			}
		});
		// if (this.authenticationService.getCurrentUser()) {
		// 	this.items = this.menuService.getMainMenu();
		// 	this.refreshItems();
		// }
		this.call$.subscribe((x) => {
			this.hasActiveCall = x != null;
			this.refreshItems();
		});
	}

	public onSelect({ item }: MenuSelectEvent): void {
		if (
			(!item.items || item.items.length === 0) &&
			item.path &&
			this.router.config.map((r: Route) => r.path).includes(item.path)
		) {
			this.router.navigate([item.path]);
		}
	}

	public ngOnDestroy(): void {
		this._destroy$.next(null);
	}
}

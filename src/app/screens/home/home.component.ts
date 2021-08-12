import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { AuthUserActions, IUser } from 'src/app/store/actions/user.actions';

@Component({
	selector: 'advenium-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	public ngOnInit(): void {
		this._store.select('userState', 'user').subscribe((user: IUser) => {
			this.nameUser = user.name;
		});
	}

	public selected = 'Inbox';

	public nameUser!: string;

	public items: any[] = [
		{ separator: true },
		{ text: 'Payers', icon: 'k-i-bell', path: 'payers' },
		{ text: 'Modalities', icon: 'k-i-calendar', path: 'modalities' },
	];

	public constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public _store: Store<any>,
	) {}

	public onSelect(ev: DrawerSelectEvent): void {
		this.selected = ev.item.text;
		this.router.navigate([ev.item.path], { relativeTo: this.activatedRoute });
	}

	public logout(): void {
		this._store.dispatch(AuthUserActions.LogOut());
		this.router.navigate(['/login']);
		// this.router.navigate([ev.item.path], { relativeTo: this.activatedRoute });
	}
}

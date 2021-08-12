import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { AuthUserActions, IUser } from 'src/app/store/actions/user.actions';

export interface IItem {
	text: string;
	icon: string;
	path: string;
	selected?: boolean;
}
@Component({
	selector: 'advenium-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	public items: IItem[] = [
		{ text: 'Payers', icon: 'k-i-bell', path: 'payers' },
		{ text: 'Modalities', icon: 'k-i-calendar', path: 'modalities' },
		{ text: 'Clinicians', icon: 'k-i-accessibility', path: 'clinicians' },
		{ text: 'Patients', icon: 'k-i-accessibility', path: 'patients' },
	];

	public constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public _store: Store<any>,
	) {}

	public nameUser!: string;

	public ngOnInit(): void {
		this._store.select('userState', 'user').subscribe((user: IUser) => {
			this.nameUser = user?.userName;
		});

		const currentItem: IItem | undefined = this.items.find((item: IItem) => {
			return this.router.url.includes(item.path);
		});

		if (!currentItem) {
			return;
		}
		currentItem.selected = true;
	}

	public onSelect(ev: DrawerSelectEvent): void {
		this.router.navigate([ev.item.path], { relativeTo: this.activatedRoute });
	}

	public logout(): void {
		this._store.dispatch(AuthUserActions.LogOut());
		this.router.navigate(['/login']);
		// this.router.navigate([ev.item.path], { relativeTo: this.activatedRoute });
	}
}

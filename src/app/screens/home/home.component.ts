import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { filter } from 'rxjs/operators';
import { IStore } from 'src/app/store';
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
		{ text: 'Clinicians', icon: 'k-i-plus-outline', path: 'clinicians' },
		{ text: 'Patients', icon: 'k-i-accessibility', path: 'patients' },
		{ text: 'Supervisor License', icon: 'k-i-chart-radar-filled', path: 'supercred' },
		{ text: 'Public Snipit', icon: 'k-i-chart-doughnut', path: 'snipits' },
		{ text: 'Series Plans', icon: 'k-i-delicious-box', path: 'seriesplans' },
		{ text: 'Session Plan', icon: 'k-i-graph', path: 'sessionplans' },
		{ text: 'Assessment Legend', icon: 'k-i-brightness-contrast', path: 'assessmentlegend' },
		{ text: 'Assessment Questions', icon: 'k-i-grayscale', path: 'assessment-questions' },
		{ text: 'Assessment Template', icon: 'k-i-cells-merge', path: 'assessmenttemplate' },
		{ text: 'Assessment Manager', icon: 'k-i-select-box', path: 'assessments' },
		{ text: 'Patient Distribution', icon: 'k-i-select-box', path: 'patientdistribution' },
		{ text: 'Unsupervised Services', icon: 'k-i-select-box', path: 'unsupervisedservices' },
		{ text: 'Groups', icon: 'k-i-select-box', path: 'groups' },
	];

	public constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public _store: Store<IStore>,
	) {}

	public nameUser!: string;

	public userId!: string;

	public ngOnInit(): void {
		this._store.select('userState', 'user').subscribe((user: IUser | undefined) => {
			if (user) {
				this.nameUser = user?.userName;
				this.userId = `http://107.181.174.52/demo/users/${user?.userId}/picture`;
			}
		});
		this.setCurrent();
		this.router.events
			.pipe(filter((event: any) => event instanceof NavigationEnd))
			.subscribe(() => this.setCurrent());
	}

	public setCurrent(): void {
		const prev: IItem | undefined = this.items.find((item: IItem) => item.selected);
		if (prev) {
			prev.selected = false;
		}
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
	}
}

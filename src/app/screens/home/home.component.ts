import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import {
	AuthUserActions,
	IUser,
	PermissionType,
	RoleType,
} from 'src/app/store/actions/user.actions';

export interface IItem {
	text: string;
	icon: string;
	path?: string;
	selected?: boolean;
	permission?: PermissionType | PermissionType[];
	role?: RoleType | RoleType[];
	children?: IItem[];
	parent?: boolean;
	expanded?: boolean;
	isHidden?: boolean;
	paddingLeft?: number;
}

@Component({
	selector: 'advenium-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	public items: IItem[] = [
		{
			text: 'Patients',
			icon: 'k-i-accessibility',
			path: 'patients',
			permission: PermissionType.canViewPatientManager,
		},
		{
			text: 'Group Services',
			icon: 'k-i-accessibility',
			parent: true,
			expanded: false,
			children: [
				{
					text: 'Therapy Groups',
					icon: 'k-i-select-box',
					path: 'groups',
					paddingLeft: 15,
					permission: PermissionType.canViewTherapyGroupManager,
				},
				// { text: 'Group Services', icon: 'k-i-select-box' },
			],
		},
		{
			text: 'Staff',
			icon: 'k-i-accessibility',
			parent: true,
			expanded: false,
			children: [
				{
					text: 'Clinicians',
					icon: 'k-i-plus-outline',
					path: 'clinicians',
					paddingLeft: 15,
					permission: PermissionType.canViewClinicianManager,
				},
				// { text: 'Users', icon: 'k-i-plus-outline' },
			],
		},
		{
			text: 'Billing',
			icon: 'k-i-accessibility',
			parent: true,
			expanded: false,
			children: [
				{
					text: 'Supervisor License',
					icon: 'k-i-chart-radar-filled',
					path: 'supercred',
					paddingLeft: 15,
					permission: PermissionType.canViewSupervisorCredentialsManager,
				},
				{
					text: 'Patient Distribution',
					icon: 'k-i-select-box',
					path: 'patientdistribution',
					paddingLeft: 15,
					permission: PermissionType.canViewPatientDistributionManager,
				},
				{
					text: 'Unsupervised Services',
					icon: 'k-i-select-box',
					path: 'unsupervisedservices',
					paddingLeft: 15,
					permission: PermissionType.canViewUnsupervisedServiceManager,
				},
			],
		},
		{
			text: 'Administration',
			icon: 'k-i-accessibility',
			parent: true,
			expanded: false,
			children: [
				{
					text: 'Location',
					icon: 'k-i-select-box',
					path: 'locations',
					paddingLeft: 15,
					permission: PermissionType.canViewLocationManager,
				},
				{
					text: 'Payers',
					icon: 'k-i-bell',
					path: 'payers',
					paddingLeft: 15,
					permission: PermissionType.canViewPayerManager,
				},
				{
					text: 'Modalities',
					icon: 'k-i-calendar',
					path: 'modalities',
					paddingLeft: 15,
					permission: PermissionType.canViewModalityManager,
				},
				{
					text: 'Series Plans',
					icon: 'k-i-delicious-box',
					path: 'seriesplans',
					paddingLeft: 15,
					permission: PermissionType.canViewSeriesPlanManager,
				},
				{
					text: 'Session Plan',
					icon: 'k-i-graph',
					path: 'sessionplans',
					paddingLeft: 15,
					permission: PermissionType.canViewSessionPlanManager,
				},
				{
					text: 'Assessment',
					icon: 'k-i-select-box',
					parent: true,
					expanded: false,
					paddingLeft: 15,
					children: [
						{
							text: 'Assessment Manager',
							icon: 'k-i-select-box',
							path: 'assessments',
							paddingLeft: 35,
							permission: PermissionType.canViewAssessmentManager,
						},
						{
							text: 'Assessment Legend',
							icon: 'k-i-brightness-contrast',
							path: 'assessmentlegend',
							paddingLeft: 35,
							permission: PermissionType.canViewAssessmentLegendManager,
						},
					],
				},
				{
					text: 'Public Snipit',
					icon: 'k-i-chart-doughnut',
					path: 'snipits',
					paddingLeft: 15,
					permission: PermissionType.canViewPublicSnipitManager,
				},
				{
					text: 'Download',
					icon: 'k-i-chart-doughnut',
					path: 'download',
					paddingLeft: 15,
				},
			],
		},
	];

	public item!: IItem;

	public constructor(
		private router: Router,
		public _store: Store<IStore>,
		private activatedRoute: ActivatedRoute,
	) {}

	public nameUser!: string;

	public user$: Observable<IUser | undefined> = this._store.select('userState', 'user');

	public currentUrl: string = '';

	public ngOnInit(): void {
		this.setCurrent();
		this.router.events
			.pipe(filter((event: any) => event instanceof NavigationEnd))
			.subscribe(() => this.setCurrent());
		// this.items.forEach((paragraph: IItem) => {
		// 	const childrenParagraph: IItem[] | undefined = paragraph?.children;
		// 	if (childrenParagraph) {
		// 		childrenParagraph.forEach((children: IItem) => {
		// 			paragraph.permission = [...((paragraph?.permission as PermissionType[]) ?? [])];
		// 			paragraph.role = [...((paragraph?.role as RoleType[]) ?? [])];
		// 			if (children.permission) {
		// 				paragraph.permission.push(children.permission as PermissionType);
		// 			} else if (children.role) {
		// 				paragraph.role.push(children.role as RoleType);
		// 			}
		// 		});
		// 	}
		// });
	}

	public setCurrent(): void {
		const currentItem: IItem | undefined = this.items.find((item: IItem) => {
			return item.path ? this.router.url.includes(item.path) : false;
		});
		if (!currentItem) {
			return;
		}
		currentItem.selected = true;
	}

	public onSelect(ev: DrawerSelectEvent): void {
		this.item = ev.item;
		const { text } = ev.item;
		if (!this.item.parent) {
			this.currentUrl = ev.item.path;
			this.items.forEach((item: IItem) => {
				item.selected = false;
			});
			const activePage: IItem | undefined = this.items.find(
				(item: IItem) => item.path === this.currentUrl,
			);
			if (activePage) activePage.selected = true;
			this.router.navigate([this.currentUrl], { relativeTo: this.activatedRoute });

			return;
		}

		const newItems: IItem[] = [...this.items];

		const index: number = newItems.findIndex((i: IItem) => i.text === text);

		const currentItem: IItem | undefined = newItems[index];

		if (!this.item.expanded) {
			if (currentItem) currentItem.expanded = true;
			this.addChildren(newItems, index, currentItem?.children ?? []);
		} else if (currentItem) {
			currentItem.expanded = false;
			this.removeChildren(newItems, index, currentItem?.children ?? []);
		}

		this.items = newItems;
	}

	public addChildren(arr: IItem[], index: number, children: IItem[]): void {
		const currentItem: IItem | undefined = children.find((item: IItem) => {
			return item.path ? this.router.url.includes(item.path) : false;
		});
		if (currentItem) currentItem.selected = true;
		const activePage: IItem | undefined = children.find(
			(item: IItem) => item.path === this.currentUrl,
		);
		if (activePage) activePage.selected = true;
		arr.splice(index + 1, 0, ...children);
	}

	public removeChildren(arr: IItem[], index: number, children: IItem[]): void {
		children.forEach((element: IItem) => {
			if (element?.children) {
				element?.children.forEach((i: IItem) => {
					if (element?.children) {
						element.expanded = false;
					}
					const arrayIndex: number[] = [];
					arr.forEach((item: IItem, indexx: number) => {
						if (i === item) {
							item.selected = false;
							arrayIndex.push(indexx);
						}
					});
					if (arrayIndex.length !== 0) {
						arr.splice(arrayIndex[0] ?? 0, arrayIndex.length);
					}
				});
			}
			element.selected = false;
		});
		arr.splice(index + 1, children.length);
	}

	public logout(): void {
		this._store.dispatch(AuthUserActions.LogOut());
		this.router.navigate(['/login']);
	}
}

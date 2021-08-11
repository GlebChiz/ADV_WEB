import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';

@Component({
	selector: 'advenium-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
	public selected = 'Inbox';

	public items: any[] = [
		{ separator: true },
		{ text: 'Payers', icon: 'k-i-bell', path: 'payers' },
		{ text: 'Modalities', icon: 'k-i-calendar', path: 'modalities' },
	];

	public constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

	public onSelect(ev: DrawerSelectEvent): void {
		this.selected = ev.item.text;
		console.log(ev);
		this.router.navigate([ev.item.path], { relativeTo: this.activatedRoute });
	}
}

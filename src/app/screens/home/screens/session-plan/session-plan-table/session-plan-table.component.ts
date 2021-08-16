import { Component } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-session-plan-table',
	templateUrl: './session-plan-table.component.html',
})
export class SessionPlanTableComponent extends CustomTableDirective {
	public columns: IColumn[] = [
		{
			field: 'title',
			title: 'Title',
			hidden: false,
		},
		{
			field: 'seriesPlans',
			title: 'Series Plans',
			hidden: false,
		},
		{
			field: 'translated',
			title: 'Translated',
			hidden: false,
		},
		{
			field: 'orderNumber',
			title: 'Order',
			hidden: false,
		},
	];
}

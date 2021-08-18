import { Component } from '@angular/core';

import { CustomTableDirective } from 'src/app/shared/table/table.directive';

import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-series-plan-table',
	templateUrl: './series-plan-table.component.html',
	styleUrls: ['../../../home.component.scss'],
})
export class SeriesplansTableComponent extends CustomTableDirective {
	public columns: IColumn[] = [
		{
			field: 'name',
			title: 'Name',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'modality',
			title: 'Modality',
			hidden: false,
			filterable: true,
			type: 'text',
		},
	];
}

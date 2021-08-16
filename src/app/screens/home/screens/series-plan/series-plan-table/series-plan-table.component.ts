import { Component } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-series-plan-table',
	templateUrl: './series-plan-table.component.html',
})
export class SeriesplansTableComponent extends CustomTableDirective {
	public columns: IColumn[] = [
		{ field: 'id', title: 'Id', hidden: false },
		{
			field: 'name',
			title: 'Name',
			hidden: false,
			// filterable: true,
			// filter: 'text',
		},
		{
			field: 'modality',
			title: 'Modality',
			hidden: false,
			// filterable: true,
			// filter: 'text',
		},
		// {
		// 	field: 'url',
		// 	title: 'URL',
		// 	hidden: false,
		// 	// filterable: true,
		// 	// filter: 'text',
		// },
	];
}

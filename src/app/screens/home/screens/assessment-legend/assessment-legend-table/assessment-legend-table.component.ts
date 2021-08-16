import { Component } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-assessment-legend-table',
	templateUrl: './assessment-legend-table.component.html',
})
export class AssessmentLegendTableComponent extends CustomTableDirective {
	public columns: IColumn[] = [
		{
			field: 'value',
			title: 'Value',
			hidden: false,
		},
		{
			field: 'text',
			title: 'Text',
			hidden: false,
		},
		{
			field: 'icon',
			title: 'Icon',
			hidden: false,
		},
		{
			field: 'translated',
			title: 'Translated',
			hidden: false,
		},
	];
}

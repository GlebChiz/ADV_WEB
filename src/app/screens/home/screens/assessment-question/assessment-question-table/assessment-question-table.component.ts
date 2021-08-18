import { Component } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-assessment-question-table',
	templateUrl: './assessment-question-table.component.html',
	styleUrls: ['../../../home.component.scss'],
})
export class AssessmentQuestionTableComponent extends CustomTableDirective {
	public columns: IColumn[] = [
		{
			field: 'orderNumber',
			title: 'Order',
			hidden: false,
			filterable: false,
			type: 'text',
		},
		{
			field: 'text',
			title: 'Question',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'legends',
			title: 'Legends',
			hidden: false,
			filterable: false,
			type: 'text',
		},
		{
			field: 'translated',
			title: 'Translated',
			hidden: false,
			filterable: false,
			type: 'text',
		},
	];
}

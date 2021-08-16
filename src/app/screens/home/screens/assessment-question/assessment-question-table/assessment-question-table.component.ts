import { Component } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-assessment-question-table',
	templateUrl: './assessment-question-table.component.html',
})
export class AssessmentQuestionTableComponent extends CustomTableDirective {
	public columns: IColumn[] = [
		{
			field: 'orderNumber',
			title: 'Order',
			hidden: false,
		},
		{
			field: 'text',
			title: 'Question',
			hidden: false,
		},
		{
			field: 'legends',
			title: 'Legends',
			hidden: false,
		},
		{
			field: 'translated',
			title: 'Translated',
			hidden: false,
		},
	];
}

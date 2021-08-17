import { Component } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-assessment-template-table',
	templateUrl: './assessment-template-table.component.html',
})
export class AssessmentTemplateTableComponent extends CustomTableDirective {
	public columns: IColumn[] = [
		{
			field: 'text',
			title: 'Text',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'criteria',
			title: 'Criteria',
			hidden: false,
			filterable: true,
			type: 'text',
		},
	];
}

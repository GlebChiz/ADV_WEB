import { Component } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-assessment-table',
	templateUrl: './assessment-table.component.html',
})
export class AssessmentTableComponent extends CustomTableDirective {
	public columns: IColumn[] = [
		{
			field: 'typeName',
			title: 'Type',
			hidden: false,
		},
		{
			field: 'modality',
			title: 'Modality',
			hidden: false,
		},
		{
			field: 'patient',
			title: 'Patient',
			hidden: false,
		},
	];
}

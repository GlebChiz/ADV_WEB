import { Component } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-public-snipit-table',
	templateUrl: './public-snipit-table.component.html',
})
export class PublicSnipitTableComponent extends CustomTableDirective {
	public columns: IColumn[] = [
		{
			field: 'typeName',
			title: 'Type',
			hidden: false,
		},
		{
			field: 'category',
			title: 'Category',
			hidden: false,
		},
		{
			field: 'text',
			title: 'Text',
			hidden: false,
		},
	];
}

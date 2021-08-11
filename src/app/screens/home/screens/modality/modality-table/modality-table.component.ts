import { Component } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';

@Component({
	providers: [],
	selector: 'advenium-modality-table',
	templateUrl: './modality-table.component.html',
})
export class ModalityTableComponent extends CustomTableDirective {
	public columns: any[] = [
		{ field: 'id', title: 'Id', hidden: false },
		{
			field: 'name',
			title: 'Name',
			hidden: false,
			// filterable: true,
			// filter: 'text',
		},
		{
			field: 'description',
			title: 'Description',
			hidden: false,
			// filterable: true,
			// filter: 'text',
		},
		{
			field: 'url',
			title: 'URL',
			hidden: false,
			// filterable: true,
			// filter: 'text',
		},
	];
}

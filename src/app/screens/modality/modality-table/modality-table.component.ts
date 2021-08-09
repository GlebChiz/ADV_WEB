/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';

@Component({
	providers: [],
	selector: 'advenium-modality-table',
	templateUrl: './modality-table.component.html',
})
export class ModalityTableComponent extends CustomTableDirective {
	// public constructor() {
	// 	super();
	// }
	public columns = [
		{
			field: 'id',
			title: 'Id',
			hidden: false,
			// filterable: true,
			// filter: 'text',
		},
		{
			field: 'name',
			title: 'Id',
			hidden: false,
			// filterable: true,
			// filter: 'text',
		},
		{
			field: 'description',
			title: 'Description',
			hidden: true,
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
		{
			field: 'grid-uid',
			title: 'GUID',
			hidden: false,
			// filterable: true,
			// filter: 'text',
		},
	];
}

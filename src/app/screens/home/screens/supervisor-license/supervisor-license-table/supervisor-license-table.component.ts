import { Component } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-supervisor-license-table',
	templateUrl: './supervisor-license-table.component.html',
})
export class SupervisorLicenseTableComponent extends CustomTableDirective {
	public columns: IColumn[] = [
		{
			field: 'supervisor',
			title: 'Supervisor',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'payer',
			title: 'Payer',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'providerId',
			title: 'Provider Id',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'start',
			title: 'Start Date',
			hidden: false,
			filterable: true,
			type: 'date',
		},
		{
			field: 'end',
			title: 'End Date',
			hidden: false,
			filterable: true,
			type: 'date',
		},
	];
}

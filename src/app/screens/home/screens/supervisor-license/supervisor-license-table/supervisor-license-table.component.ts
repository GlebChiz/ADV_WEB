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
		},
		{
			field: 'payer',
			title: 'Payer',
			hidden: false,
		},
		{
			field: 'providerId',
			title: 'Provider Id',
			hidden: false,
		},
		{
			field: 'start',
			title: 'Start Date',
			hidden: false,
		},
		{
			field: 'end',
			title: 'End Date',
			hidden: false,
		},
	];
}

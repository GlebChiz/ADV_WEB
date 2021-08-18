import { Component } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-unsupervised-services-table',
	templateUrl: './unsupervised-services-table.component.html',
})
export class UnsupervisedServicesTableComponent extends CustomTableDirective {
	public columns: IColumn[] = [
		{
			field: 'date',
			title: 'Date',
			hidden: false,
			filterable: true,
			type: 'date',
		},
		{
			field: 'patient',
			title: 'Patient',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'clinician',
			title: 'Clinician',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'insurance',
			title: 'Insurance',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'insuranceeffectivedate',
			title: 'Insurance Effective Date',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'supervisors',
			title: 'Supervisors',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'licenses',
			title: 'Licenses',
			hidden: false,
			filterable: true,
			type: 'text',
		},
	];
}

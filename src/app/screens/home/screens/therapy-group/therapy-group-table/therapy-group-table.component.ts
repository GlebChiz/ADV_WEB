import { Component } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import { IColumn } from '../../../../../shared/interfaces/column.interface';

@Component({
	providers: [],
	selector: 'advenium-therapy-group-table',
	templateUrl: './therapy-group-table.component.html',
})
export class TherapyGroupTableComponent extends CustomTableDirective {
	public columns: IColumn[] = [
		{
			field: 'clinicianName',
			title: 'Clinician Name',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'weekDay',
			title: 'Week Day',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'start',
			title: 'Start Time',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'locationName',
			title: 'Location',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'roomName',
			title: 'Room',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'modalityName',
			title: 'Modality',
			hidden: false,
			filterable: true,
			type: 'date',
		},
		{
			field: 'seriesPlanName',
			title: 'Series Plan',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'languageName',
			title: 'Language',
			hidden: false,
			filterable: true,
			type: 'text',
		},
	];
}

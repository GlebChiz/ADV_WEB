/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';

@Component({
	providers: [],
	selector: 'advenium-patient-table',
	templateUrl: './patient-table.component.html',
})
export class PatientTableComponent extends CustomTableDirective {
	// public constructor() {
	// 	super();
	// }
}

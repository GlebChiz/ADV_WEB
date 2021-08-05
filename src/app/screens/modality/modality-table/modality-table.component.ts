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
}

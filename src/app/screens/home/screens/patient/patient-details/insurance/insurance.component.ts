/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Input } from '@angular/core';

@Component({
	providers: [],
	selector: 'advenium-insurance',
	templateUrl: './insurance.component.html',
})
export class InsuranceComponent {
	@Input() public personId!: string;
}

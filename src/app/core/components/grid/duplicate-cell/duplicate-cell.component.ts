import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'advenium-grid-duplicate-cell',
	templateUrl: './duplicate-cell.component.html',
})
export class DuplicateCellComponent {
	@Input() allow = false;

	@Output() action = new EventEmitter();

	onClick(): void {
		this.action.emit();
	}
}

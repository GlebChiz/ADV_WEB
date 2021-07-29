import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'advenium-grid-add-cell',
	templateUrl: 'add-cell.component.html',
})
export class AddCellComponent {
	@Input() allow = false;

	@Output() action = new EventEmitter();

	onClick(): void {
		this.action.emit();
	}
}

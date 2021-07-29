import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'advenium-grid-remove-cell',
	templateUrl: './remove-cell.component.html',
})
export class RemoveCellComponent {
	@Input() allow = false;

	@Output() action = new EventEmitter();

	onClick(): void {
		this.action.emit();
	}
}

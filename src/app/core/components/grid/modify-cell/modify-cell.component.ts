import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'advenium-grid-modify-cell',
	templateUrl: './modify-cell.component.html',
})
export class ModifyCellComponent {
	@Input() allow = false;

	@Output() action = new EventEmitter();

	onClick(): void {
		this.action.emit();
	}
}

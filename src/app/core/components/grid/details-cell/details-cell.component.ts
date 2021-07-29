import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'advenium-grid-details-cell',
	templateUrl: './details-cell.component.html',
})
export class DetailsCellComponent {
	@Input() rowIndex: Number | null = null;

	@Input() expandedRowIndex: Number | null = null;

	@Output() expandAction = new EventEmitter();

	@Output() collapseAction = new EventEmitter();

	isExpanded(): boolean {
		return this.rowIndex === this.expandedRowIndex;
	}

	onClick(): void {
		if (!this.isExpanded()) {
			this.expandAction.emit(this.rowIndex);
			return;
		}

		this.collapseAction.emit();
	}
}

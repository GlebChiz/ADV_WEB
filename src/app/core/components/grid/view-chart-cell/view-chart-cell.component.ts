import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'advenium-grid-view-chart-cell',
	templateUrl: 'view-chart-cell.component.html',
})
export class ViewChartCellComponent {
	@Input() allow = false;

	@Output() action = new EventEmitter();

	onClick(): void {
		this.action.emit();
	}
}

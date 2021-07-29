import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'advenium-label',
	templateUrl: './label.component.html',
})
export class LabelComponent implements OnInit {
	@Input() metaData: any;

	@Input() field?: string;

	@Input() clickable!: boolean;

	@Output() action = new EventEmitter();

	label = '';

	ngOnInit(): void {
		this.label =
			(this.metaData && this.field && this.metaData[this.field || '']) ||
			this.getDefaultField(this.field);
	}

	onClick(): boolean {
		this.action.emit();
		return false;
	}

	getDefaultField(field?: string): string {
		if (field == null) {
			return '';
		}

		const splittedItems = (
			field.substr(0, 1).toUpperCase() + field.substr(1, field.length - 1)
		).match(/[A-Z][a-z]+/g);

		if (splittedItems == null) {
			return '';
		}

		const result = splittedItems.join(' ');
		return result;
	}
}

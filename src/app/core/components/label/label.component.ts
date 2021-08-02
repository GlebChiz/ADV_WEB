import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'advenium-label',
	templateUrl: './label.component.html',
})
export class LabelComponent implements OnInit {
	@Input() metaData: any;

	@Input() field!: string | { focus: Function };

	@Input() clickable!: boolean;

	@Output() action = new EventEmitter();

	label = '';

	ngOnInit(): void {
		this.label =
			(this.metaData && this.field && this.metaData[(this.field as string) || '']) ||
			this.getDefaultField(this.field);
	}

	onClick(): boolean {
		this.action.emit();
		return false;
	}

	getDefaultField(field?: string | { focus: Function }): string {
		if (field == null) {
			return '';
		}
		const splittedItems =
			typeof field === 'string'
				? (field.substr(0, 1).toUpperCase() + field.substr(1, field.length - 1)).match(
						/[A-Z][a-z]+/g,
				  )
				: [];

		if (splittedItems == null) {
			return '';
		}

		const result = splittedItems.join(' ');
		return result;
	}
}

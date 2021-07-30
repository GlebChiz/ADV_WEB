import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { IPdfFile } from 'src/app/core/models/form.model';
import { FormService } from 'src/app/core/services/form.service';
import { ValidationMessageService } from 'src/app/core/services/validation.message.service';

@Component({
	providers: [],
	selector: 'advenium-view-pdffile',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './view.pdffile.component.html',
	styleUrls: ['./view.pdffile.component.scss'],
})
export class ViewPdfFileComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	@Input() file!: IPdfFile;

	pages!: string[];

	data!: string;

	zoom = 1;

	constructor(
		// private formEditorService: FormEditorService,
		private formService: FormService,
		public validationService: ValidationMessageService,
	) {}

	ngOnInit(): void {
		if (this.file) {
			this.formService.getPdfFile(this.file.id).subscribe((response) => {
				this.data = window.URL.createObjectURL(response.body);
			});
		}
	}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	getData() {
		return this.data;
	}
}

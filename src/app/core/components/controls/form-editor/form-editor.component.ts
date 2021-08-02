import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Subject, Subscription } from 'rxjs';
import {
	IEditingForm,
	IFormEditorAction,
	FormEditorActionType,
	FormEditorType,
	IFormPerson,
	FormPersonRole,
	FormUploadRule,
	PdfSourceType,
	IFormSimpleUser,
} from 'src/app/core/models/form.model';
import { FormEditorService } from 'src/app/core/services/form.editor.service';
import { FormService } from 'src/app/core/services/form.service';
import { ValidationMessageService } from 'src/app/core/services/validation.message.service';

@Component({
	providers: [],
	selector: 'advenium-form-editor',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './form-editor.component.html',
	styleUrls: ['./form-editor.component.scss'],
})
export class FormEditorComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	@Input() form!: IEditingForm;

	@Input() readOnly!: boolean;

	@Input() formPersons!: IFormPerson[];

	@Input() showUpload = false;

	@Input() hideTitle = false;

	reloadSubscription!: Subscription;

	formAction!: IFormEditorAction;

	constructor(
		public formEditorService: FormEditorService,
		private formService: FormService,
		public validationService: ValidationMessageService,
	) {}

	getFormPersons() {
		const persons = this.isNew() ? this.formPersons : this.form.formPersons;
		return persons
			.filter((p) => p.role === FormPersonRole.Patient || p.role === FormPersonRole.Clinician)
			.map((p) => {
				const item = {
					role: '',
					name: p.personName,
					routerLink: null,
				} as IFormSimpleUser;
				switch (p.role) {
					case FormPersonRole.Patient:
						item.routerLink = ['/patientperson', p.personId];
						item.role = 'Patient';
						return item;
					case FormPersonRole.Clinician:
						item.role = 'Clinician';
						return item;
					default:
						return item;
				}
			});
	}

	ngOnInit(): void {
		this.reloadSubscription = this.formEditorService
			.subscriptionToReload()
			.subscribe(() => this.reload());
	}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	isNew(): boolean {
		return this.form.id.toString() === Guid.EMPTY;
	}

	canUpload(): boolean {
		return this.isNew() && this.form.revision.uploadRule > FormUploadRule.None && !this.form.file;
	}

	canAppend(): boolean {
		return !this.isNew() && this.form.revision.uploadRule === FormUploadRule.Append;
	}

	canRemoveFiles(): boolean {
		return (
			!this.isNew() &&
			this.form.file !== null &&
			this.form.file.sourceType === PdfSourceType.Uploaded
		);
	}

	canUploadMultiple(): boolean {
		return (
			(this.canUpload() || this.canAppend()) &&
			this.form.revision.uploadRule >= FormUploadRule.Combine
		);
	}

	canReopen(): boolean {
		return this.form.file !== null && this.form.file.sourceType === PdfSourceType.PublishedForm;
	}

	isEditingForm(): boolean {
		return this.form.file === null && this.form.revision.editorType !== FormEditorType.None;
	}

	isDownloadable(): boolean {
		return this.form.file !== null;
	}

	isPdfEditor() {
		return this.form.revision.editorType === FormEditorType.PdfEditor;
	}

	onAppendClick() {
		this.showUpload = !this.showUpload;
	}

	onUploadClick() {
		this.showUpload = !this.showUpload;
	}

	onRemoveFilesClick() {
		this.formService.unpublish(this.form.id).subscribe(() => {
			this.reload();
		});
	}

	onSaveClick() {
		this.formAction = { form: this.form, action: FormEditorActionType.Save };
	}

	onResetClick() {
		this.formAction = { form: this.form, action: FormEditorActionType.Reset };
	}

	onPublishClick() {
		this.formAction = { form: this.form, action: FormEditorActionType.Publish };
	}

	onDownloadClick() {
		this.formService.getPdfFile(this.form.file.id).subscribe((response) => {
			const a = document.createElement('a');
			a.href = window.URL.createObjectURL(response.body);
			a.target = '_blank';
			a.download = `${this.form.file.id}.pdf`;
			a.click();
		});
	}

	onReopenClick() {
		this.formService.reopenForm(this.form.id).subscribe((response) => {
			this.validationService.displayResponse(response);
			this.reload();
		});
	}

	getPageCount() {
		return this.form.file == null ? 'Pages: 0' : `Pages: ${this.form.file.pageCount}`;
	}

	reload() {
		const { id } = this.form;
		this.form = null!;
		this.formAction = null!;
		this.formService.getForm(id).subscribe((x) => {
			this.form = x;
			this.showUpload = false;
		});
	}

	showPageCount() {
		return this.form.file !== null || this.form.revision.uploadRule > FormUploadRule.None;
	}
}

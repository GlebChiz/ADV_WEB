import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
	FileRestrictions,
	RemoveEvent,
	SelectEvent,
	UploadComponent,
} from '@progress/kendo-angular-upload';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { IFormPerson } from 'src/app/core/models/form.model';
import { IDropDownData } from 'src/app/core/models/kendo/dropdown-data.model';
import { FormEditorService } from 'src/app/core/services/form.editor.service';
import { FormService } from 'src/app/core/services/form.service';
import { ValidationMessageService } from 'src/app/core/services/validation.message.service';

@Component({
	providers: [],
	selector: 'advenium-form-upload',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './form-upload-control.component.html',
	styleUrls: ['./form-upload-control.component.scss'],
})
export class FormUploadComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	public active = true;

	public submitted = false;

	public uploadForm!: FormGroup;

	public files: any = {};

	public restrictions: FileRestrictions = {
		allowedExtensions: ['jpg', 'jpeg', 'png', 'pdf', 'tif', 'tiff', 'bmp'],
	};

	@Input() public editableFields!: string[];

	@Input() public displayedFields!: string[];

	@Input() public formTypeLookup!: IDropDownData[];

	@Input() public formPersons!: IFormPerson[];

	@Input() public formTypeId!: Guid;

	@Input() public multiple = false;

	@Input() public showValidation = false;

	@Input() public formId!: Guid;

	@Input() public formEditorService!: FormEditorService;

	public constructor(
		private fb: FormBuilder,
		private formService: FormService,
		public validationService: ValidationMessageService,
	) {}

	public showUpload(upload: UploadComponent) {
		if (!this.uploadForm.value.formTypeId) {
			return false;
		}
		return upload.fileList.count > 0;
	}

	public isEditable(field: string): boolean {
		return this.editableFields && this.editableFields.includes(field);
	}

	public isDisplayed(field: string): boolean {
		return (this.displayedFields && this.displayedFields.includes(field)) || this.isEditable(field);
	}

	public ngOnInit(): void {
		this.uploadForm = this.fb.group({
			formTypeId: [this.formTypeId, [Validators.required]],
			files: [null, [Validators.required]],
		});
		this.uploadForm.valueChanges.subscribe((data) => this.onValueChanged(data));
	}

	public onValueChanged(_data?: any): void {
		// handle model changes
	}

	public ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	public selectFile(e: SelectEvent): void {
		const formData: FormData = new FormData();
		e.files.forEach((f) => {
			this.files[f.uid!] = f.name;
			formData.append(f.uid!, f.rawFile!);
		});
		this.formService.uploadFile(formData).subscribe((response) => {
			this.validationService.displayResponse(response);
		});
	}

	public removeFile(e: RemoveEvent): void {
		e.files.forEach((f) => {
			delete this.files[f.uid!];
			this.formService.removeFile(f.uid!).subscribe(() => {});
		});
	}

	public save(upload: UploadComponent): void {
		this.submitted = true;
		const fileNames: Object[] = [];
		Object.keys(this.files).forEach((_value: string, uid: number) => {
			if (uid) {
				fileNames.push({
					uid,
					name: this.files[uid],
				});
			}
		});
		// for (const uid in this.files) {
		// 	if (uid) {
		// 		fileNames.push({
		// 			uid,
		// 			name: this.files[uid],
		// 		});
		// 	}
		// }

		const value = {
			...this.uploadForm.value,
			files: fileNames,
			roles: this.formPersons,
			formId: this.formId,
		};

		this.formService.uploadForm(value).subscribe((response) => {
			this.validationService.displayResponse(response);
			upload.clearFiles();
			if (this.formEditorService) {
				this.formEditorService.reload();
			}
		});
	}
}

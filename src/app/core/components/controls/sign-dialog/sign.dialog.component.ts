import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	ViewChild,
} from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
import { Subject } from 'rxjs';

@Component({
	selector: 'advenium-sign',
	templateUrl: './sign.dialog.component.html',
	styleUrls: ['./sign.dialog.component.scss'],
})
export class SignDialogComponent implements OnDestroy, AfterViewInit {
	private _destroy$ = new Subject();

	@Input() opened = false;

	@ViewChild(SignaturePad) signaturePad!: SignaturePad;

	signaturePadOptions: any = {
		// passed through to szimek/signature_pad constructor
		minWidth: 5,
		canvasWidth: 500,
		canvasHeight: 300,
	};

	signature!: string;

	@Output() closeDialog: EventEmitter<any> = new EventEmitter<any>();

	@Output() saveSignature: EventEmitter<any> = new EventEmitter<any>();

	// constructor() {}

	ngAfterViewInit(): void {
		this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
		this.signaturePad.clear();
	}

	drawComplete() {
		// will be notified of szimek/signature_pad's onEnd event
		this.signature = this.signaturePad.toDataURL();
	}

	drawStart() {}

	// ngOnInit(): void {}

	close() {
		this.opened = false;
		this.closeDialog.emit();
	}

	clear() {
		this.signaturePad.clear();
		this.signature = null!;
	}

	save() {
		this.saveSignature.emit({
			signature: this.signature,
			width: parseInt(this.signaturePadOptions.canvasWidth, 10),
			height: parseInt(this.signaturePadOptions.canvasHeight, 10),
		});
	}

	ngOnDestroy(): void {
		this._destroy$.next();
	}
}

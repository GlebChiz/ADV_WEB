// import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { saveAs } from '@progress/kendo-file-saver';
import { Observable } from 'rxjs';
import { IDownload } from 'src/app/shared/interfaces/download.interface';
import { DownloadFileService } from 'src/app/shared/services/download.service';
import { IStore } from 'src/app/store';
import { environment } from 'src/environments/environment';
import { DownloadFileActions } from './../../../../store/actions/download.actions';

@Component({
	selector: 'advenium-download',
	templateUrl: './download.component.html',
})
export class DownloadComponent {
	public constructor(
		public _store: Store<IStore>,
		public downloadFileService: DownloadFileService,
	) {}

	public user$: Observable<string> = this._store.select('userState' as any, 'user', 'urlAvatar');

	public downloadAvatar(image: string): void {
		saveAs(image, 'image.png');
	}

	public downloadFile(): void {
		this._store.dispatch(DownloadFileActions.DownloadFilePending());
		this.downloadFileService.downloadFile().subscribe((item: IDownload) => {
			const a: HTMLAnchorElement = document.createElement('a');
			a.href = `${environment.apiUrl}/content/download-report-async/${item.fileId}`;
			// a.target = '_blank';
			// a.download = `${item.fileName}`;
			a.click();
		});
	}
}

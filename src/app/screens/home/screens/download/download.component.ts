// import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDownload } from 'src/app/shared/interfaces/download.interface';
import { DownloadFileService } from 'src/app/shared/services/download.service';
import { IStore } from 'src/app/store';
import { DownloadFileActions } from 'src/app/store/actions/download.actions';
import { environment } from 'src/environments/environment';
// import { DownloadFileActions } from './../../../../store/actions/download.actions';

@Component({
	selector: 'advenium-download',
	templateUrl: './download.component.html',
})
export class DownloadComponent {
	public constructor(
		public _store: Store<IStore>,
		public downloadFileService: DownloadFileService,
	) {}

	public downloadFile(): void {
		this._store.dispatch(DownloadFileActions.DownloadFilePending());
		this.downloadFileService.downloadFile().subscribe((item: IDownload) => {
			const a: HTMLAnchorElement = document.createElement('a');
			a.href = `${environment.apiUrl}/content/download-report-async/${item.fileId}`;
			a.click();
		});
	}
}

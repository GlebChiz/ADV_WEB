// import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { saveAs } from '@progress/kendo-file-saver';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/store';

@Component({
	selector: 'advenium-download',
	templateUrl: './download.component.html',
})
export class DownloadComponent {
	public constructor(public _store: Store<IStore>) {}

	public user$: Observable<string> = this._store.select('userState' as any, 'user', 'urlAvatar');

	public downloadAvatar(image: string): void {
		saveAs(image, 'image.png');
	}
}

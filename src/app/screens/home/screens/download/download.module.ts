import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DownloadComponent } from './download.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: DownloadComponent,
			},
		]),
	],

	declarations: [DownloadComponent],
	entryComponents: [],
})
export class DownloadModule {}

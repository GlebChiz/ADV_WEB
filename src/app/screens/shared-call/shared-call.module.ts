import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/modules/core.module';
import { KendoModule } from 'src/app/core/modules/kendo/kendo.module';
import { SharedCallHomeComponent } from './shared-call-home/shared-call-home.component';
import { SharedCallLoginComponent } from './shared-call-login/shared-call-login.component';

@NgModule({
	declarations: [SharedCallLoginComponent, SharedCallHomeComponent],
	imports: [CommonModule, KendoModule, FormsModule, ReactiveFormsModule, CoreModule, RouterModule],
	exports: [SharedCallLoginComponent, SharedCallHomeComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedCallModule {}

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { selectUser } from 'src/app/core/store/user/user.selectors';
import { IUser } from 'src/app/core/models/user.model';
import { Observable } from 'rxjs';
import { AlertService, AuthenticationService } from '../../shared/services';

@Component({
	selector: 'advenium-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	apiUser!: string;

	user$: Observable<IUser>;

	constructor(
		private authenticationService: AuthenticationService,
		private alertService: AlertService,
		private _store: Store<IAppState>,
	) {}

	ngOnInit() {
		this.user$ = this._store.pipe(select(selectUser));
		this.authenticationService.apiUser().subscribe(
			(user) => {
				this.apiUser = user?.userName;
			},
			(error) => {
				this.alertService.error(error);
			},
		);
		this._store.dispatch(PageSettingsActions.SetTitle({ settings: { title: 'Home' } }));
		this.test();
	}

	test() {
		/*
    const takeNth = (n: number) => <T>(source: Observable<T>) =>
     new Observable<T>(observer => {
       let current = 1;

       return source.subscribe(
         vl => {
           if(current++ === n){
             observer.next(vl);
             observer.complete();
           }
         },
         err => observer.error(err),
         () => observer.complete()
       )
     });

    from(['Jack', 'Jane', 'Jim', 'Jason']).pipe(
     takeNth(3)
    ).subscribe(
     vl => console.log(vl),
     err => {},
     () => console.log('Completed')
    ); */
		/* const s = interval(0).subscribe(vl =>{
      if (vl >= 100){
        s.unsubscribe();
      }
      console.log(vl);});
      */
	}
}

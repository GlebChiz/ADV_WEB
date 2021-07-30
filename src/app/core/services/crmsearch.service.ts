import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services';
import { ICall } from '../models/call.model';
import {
	ICRMResult,
	ICRMSearch,
	ICRMPersonFound,
	ICRMSearchFilter,
	CRMSearchType,
} from '../models/crm-search.model';
import { IPerson } from '../models/person.model';
import { selectCRMSearch } from '../store/crmsearch/crmsearch.selectors';
import { IAppState } from '../store/state/app.state';

@Injectable({ providedIn: 'root' })
export class CRMSearchService extends DataService {
	constructor(http: HttpClient, private _store: Store<IAppState>) {
		super(http, 'crm');
	}

	private getKeys(arr: any) {
		const keys: number[] = [];
		if (arr) {
			Object.keys(arr).forEach((_value: string, key: number) => {
				if (arr[key]) {
					keys.push(key);
				}
			});
			// for (const key in arr) {
			// 	if (arr[key]) {
			// 		keys.push(key);
			// 	}
			// }
		}
		return keys;
	}

	clearResult(result: ICRMResult, search: ICRMSearch) {
		const filter = this.getFilter(search, null);

		const phoneKeys = this.getKeys(result?.byPhone);
		phoneKeys.forEach((key) => {
			if (!filter.phones.includes(key.toString())) {
				delete result.byPhone[key];
			}
		});

		const lastnameKeys = this.getKeys(result?.byLastname);
		lastnameKeys.forEach((key) => {
			if (!filter.lastnames.includes(key.toString())) {
				delete result.byLastname[key];
			}
		});
		const callerIdKeys = this.getKeys(result?.byCallerId);
		callerIdKeys.forEach((key) => {
			if (filter.callerId !== key.toString()) {
				delete result.byCallerId[key];
			}
		});
	}

	addResult(result: ICRMResult, items: ICRMPersonFound[]) {
		items.forEach((item) => {
			item.matches.forEach((m) => {
				switch (m.type) {
					case CRMSearchType.Phone:
						if (!result.byPhone) {
							result.byPhone = {};
						}
						result.byPhone[m.matchValue] = item;
						break;
					case CRMSearchType.Lastname:
						if (!result.byLastname) {
							result.byLastname = {};
						}
						result.byLastname[m.matchValue] = item;
						break;
					case CRMSearchType.CallerId:
						if (!result.byCallerId) {
							result.byCallerId = {};
						}
						result.byCallerId[m.matchValue] = item;
						break;
					default:
						break;
				}
			});
		});
	}

	getFilter(search: ICRMSearch, result: ICRMResult | null) {
		return {
			phones: this.getSearchPhones(search, result?.byPhone),
			callerId: search?.callerId || null,
			lastnames: this.getSearchLastnames(search, result?.byLastname),
			skipCallId: search?.call?.id,
			skipPersonIds: this.getSkippedPersonIds(search?.call),
		} as ICRMSearchFilter;
	}

	search(search: ICRMSearch, result: ICRMResult): Observable<ICRMPersonFound[]> {
		const filter = this.getFilter(search, result);

		const filterId = Guid.create();
		const url = `${filterId}/search`;
		return this.saveFilterData('save-filter', filterId, filter).pipe(
			switchMap(() => this.get(url)),
		);
	}

	combineResultPersons(list: ICRMPersonFound[]): ICRMPersonFound[] {
		const keys: any = {};
		list.forEach((p) => {
			p.calls = p.call ? [p.call] : [];
			if (!keys![p.person.id.toString()]) {
				keys[p.person.id.toString()] = p;
			} else {
				const person = keys[p.person.id.toString()] as ICRMPersonFound;
				person.matches = person.matches.concat(p.matches);
				if (p.roles) {
					p.roles.forEach((r) => {
						if (!person.roles.includes(r)) {
							person.roles.push(r);
						}
					});
				}
				if (p.calls) {
					p.calls.forEach((c) => {
						if (person.calls.filter((x) => x.id === c.id).length === 0) {
							person.calls.push(c);
						}
					});
				}

				keys[p.person.id.toString()] = person;
			}
		});

		const output: ICRMPersonFound[] = [];
		Object.keys(keys).forEach((_value: string, key: number) => {
			if (keys[key]) {
				output.push(keys[key]);
			}
		});
		// for (const key in keys) {
		// 	if (keys[key]) {
		// 		output.push(keys[key]);
		// 	}
		// }
		return output;
	}

	getResultPersons(result: ICRMResult): ICRMPersonFound[] {
		const persons: any[] = [];
		if (result?.byPhone) {
			Object.keys(result.byPhone).forEach((_value: string, p: number) => {
				if (result.byPhone[p]) {
					persons.push(result.byPhone[p]);
				}
			});
			// for (const p in result.byPhone) {
			// 	if (result.byPhone[p]) {
			// 		persons.push(result.byPhone[p]);
			// 	}
			// }
		}
		if (result?.byLastname) {
			Object.keys(result.byLastname).forEach((_value: string, p: number) => {
				if (result.byLastname[p]) {
					persons.push(result.byLastname[p]);
				}
			});
			// for (const p in result.byLastname) {
			// 	if (result.byLastname[p]) {
			// 		persons.push(result.byLastname[p]);
			// 	}
			// }
		}
		if (result?.byCallerId) {
			Object.keys(result.byCallerId).forEach((_value: string, p: number) => {
				if (result.byCallerId[p]) {
					persons.push(result.byCallerId[p]);
				}
			});
			// for (const p in result.byCallerId) {
			// 	if (result.byCallerId[p]) {
			// 		persons.push(result.byCallerId[p]);
			// 	}
			// }
		}

		return persons;
	}

	getSearchPhones(search: ICRMSearch, byPhone: any = null): string[] {
		const phones = this.getCallPhones(search?.call);
		if (search?.phones) {
			Object.keys(search.phones).forEach((_value: string, key: number) => {
				if (search.phones[key]) {
					phones.push(search.phones[key]);
				}
			});
		}
		return this.validatePhones(phones, byPhone);
	}

	getSearchLastnames(search: ICRMSearch, byLastname: any = null): string[] {
		const names = this.getCallLastnames(search?.call);
		if (search?.lastnames) {
			Object.keys(search.lastnames).forEach((_value: string, key: number) => {
				if (search.lastnames[key]) {
					names.push(search.lastnames[key]);
				}
			});
		}
		return this.validateLastnames(names, byLastname);
	}

	getSearch(): Observable<ICRMSearch | null> {
		return this._store.select(selectCRMSearch);
	}

	getCallLastnames(call: ICall) {
		const names = [];
		if (call) {
			names.push(call.person?.lastname);
			if (call.patients) {
				call.patients.forEach((p) => {
					names.push(p.patient.person!.lastname);
				});
			}
		}
		return this.validateLastnames(names);
	}

	private getPersonPhones(person: IPerson): string[] {
		const phones = [];
		if (person) {
			phones.push(person.homePhone);
			phones.push(person.mobilePhone);
			phones.push(person.otherPhone);
			phones.push(person.workPhone);
		}
		return this.validatePhones(phones);
	}

	getSkippedPersonIds(call: ICall): Guid[] {
		const ids: Guid[] = [];
		if (call) {
			ids.push(call.person?.id);
			if (call.patients) {
				call.patients.forEach((p) => ids.push(p.patient?.person!.id));
			}
		}
		return ids.filter((x) => x && x.toString() !== Guid.EMPTY);
	}

	private getCallPhones(call: ICall) {
		const phones: string[] = [];
		if (call) {
			phones.push(call.fromPhone!);
			this.getPersonPhones(call.person).forEach((ph) => phones.push(ph));
			if (call.patients) {
				call.patients.forEach((p) => {
					this.getPersonPhones(p.patient.person!).forEach((ph) => phones.push(ph));
				});
			}
		}
		return this.validatePhones(phones);
	}

	private validatePhones(phones: string[], byPhones: any = null): string[] {
		const list: string[] = [];
		phones.forEach((p) => {
			if (!byPhones || !byPhones[p]) {
				const isValidPhone = p && /^\d{10}$/.test(p);
				if (isValidPhone === true && !list.includes(p)) {
					list.push(p);
				}
			}
		});
		return list;
	}

	private validateLastnames(names: string[], byLastname: any = null): string[] {
		const list: string[] = [];
		names.forEach((p) => {
			if (!byLastname || !byLastname[p]) {
				// const isValidPhone = p && /^\d{10}$/.test(p);
				if (p && p.length > 0 && !list.includes(p)) {
					list.push(p);
				}
			}
		});
		return list;
	}
}

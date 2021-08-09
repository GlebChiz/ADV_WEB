import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services';
import { ICall, ICallPatientIndex } from '../models/call.model';
import {
	ICRMResult,
	ICRMSearch,
	ICRMPersonFound,
	ICRMSearchFilter,
	CRMSearchType,
	ICRMMatch,
} from '../models/crm-search.model';
import { IPerson } from '../models/person.model';
import { selectCRMSearch } from '../store/crmsearch/crmsearch.selectors';
import { IAppState } from '../store/state/app.state';

@Injectable({ providedIn: 'root' })
export class CRMSearchService extends DataService {
	public constructor(http: HttpClient, private _store: Store<IAppState>) {
		super(http, 'crm');
	}

	private getKeys(arr: any): string[] {
		const keys: string[] = [];
		if (arr) {
			Object.keys(arr).forEach((key: string) => {
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

	public clearResult(result: ICRMResult, search: ICRMSearch): void {
		const filter: ICRMSearchFilter = this.getFilter(search, null);

		const phoneKeys: string[] = this.getKeys(result?.byPhone);
		phoneKeys.forEach((key: string) => {
			if (!filter.phones.includes(key.toString())) {
				delete result.byPhone[key];
			}
		});

		const lastnameKeys: string[] = this.getKeys(result?.byLastname);
		lastnameKeys.forEach((key: string) => {
			if (!filter.lastnames.includes(key.toString())) {
				delete result.byLastname[key];
			}
		});
		const callerIdKeys: string[] = this.getKeys(result?.byCallerId);
		callerIdKeys.forEach((key: string) => {
			if (filter.callerId !== key.toString()) {
				delete result.byCallerId[key];
			}
		});
	}

	public addResult(result: ICRMResult, items: ICRMPersonFound[]): void {
		items.forEach((item: ICRMPersonFound) => {
			item.matches.forEach((m: ICRMMatch) => {
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

	public getFilter(search: ICRMSearch, result: ICRMResult | null): ICRMSearchFilter {
		return {
			phones: this.getSearchPhones(search, result?.byPhone),
			callerId: search?.callerId || null,
			lastnames: this.getSearchLastnames(search, result?.byLastname),
			skipCallId: search?.call?.id,
			skipPersonIds: this.getSkippedPersonIds(search?.call),
		} as ICRMSearchFilter;
	}

	public search(search: ICRMSearch, result: ICRMResult): Observable<ICRMPersonFound[]> {
		const filter: ICRMSearchFilter = this.getFilter(search, result);

		const filterId: Guid = Guid.create();
		const url: string = `${filterId}/search`;
		return this.saveFilterData('save-filter', filterId, filter).pipe(
			switchMap(() => this.get<ICRMPersonFound[]>(url)),
		);
	}

	public combineResultPersons(list: ICRMPersonFound[]): ICRMPersonFound[] {
		const keys: any = {};
		list.forEach((p: ICRMPersonFound) => {
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
		Object.keys(keys).forEach((key: string) => {
			if (keys[key]) {
				output.push(keys[key]);
			}
		});
		// for (const key in keys) {
		// 	if (keys[key]) {
		// 		output.push(keys[key]);
		// 	}
		// } // TODO
		return output;
	}

	public getResultPersons(result: ICRMResult): ICRMPersonFound[] {
		const persons: any[] = [];
		if (result?.byPhone) {
			Object.keys(result.byPhone).forEach((key: string) => {
				if (result.byPhone[key]) {
					persons.push(result.byPhone[key]);
				}
			});
			// for (const p in result.byPhone) {
			// 	if (result.byPhone[p]) {
			// 		persons.push(result.byPhone[p]);
			// 	}
			// }
		}
		if (result?.byLastname) {
			Object.keys(result.byLastname).forEach((key: string) => {
				if (result.byLastname[key]) {
					persons.push(result.byLastname[key]);
				}
			});
			// for (const p in result.byLastname) {
			// 	if (result.byLastname[p]) {
			// 		persons.push(result.byLastname[p]);
			// 	}
			// }
		}
		if (result?.byCallerId) {
			Object.keys(result.byCallerId).forEach((key: string) => {
				if (result.byCallerId[key]) {
					persons.push(result.byCallerId[key]);
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

	public getSearchPhones(search: ICRMSearch, byPhone: any = null): string[] {
		const phones: string[] = this.getCallPhones(search?.call);
		if (search?.phones) {
			Object.keys(search.phones).forEach((key: string) => {
				if (search.phones[key]) {
					phones.push(search.phones[key]);
				}
			});
		}
		return this.validatePhones(phones, byPhone);
	}

	public getSearchLastnames(search: ICRMSearch, byLastname: any = null): string[] {
		const names: string[] = this.getCallLastnames(search?.call);
		if (search?.lastnames) {
			Object.keys(search.lastnames).forEach((key: string) => {
				if (search.lastnames[key]) {
					names.push(search.lastnames[key]);
				}
			});
		}
		return this.validateLastnames(names, byLastname);
	}

	public getSearch(): Observable<ICRMSearch | null> {
		return this._store.select(selectCRMSearch);
	}

	public getCallLastnames(call: ICall): string[] {
		const names: string[] = [];
		if (call) {
			names.push(call.person?.lastname);
			if (call.patients) {
				call.patients.forEach((p: ICallPatientIndex) => {
					names.push(p.patient.person.lastname);
				});
			}
		}
		return this.validateLastnames(names);
	}

	private getPersonPhones(person: IPerson | null): string[] {
		const phones: string[] = [];
		if (person) {
			phones.push(person.homePhone);
			phones.push(person.mobilePhone);
			phones.push(person.otherPhone);
			phones.push(person.workPhone);
		}
		return this.validatePhones(phones);
	}

	public getSkippedPersonIds(call: ICall): Guid[] {
		const ids: Guid[] = [];
		if (call) {
			ids.push(call.person?.id);
			if (call.patients) {
				call.patients.forEach((p) => ids.push(p.patient?.person!.id));
			}
		}
		return ids.filter((x) => x && x.toString() !== Guid.EMPTY);
	}

	private getCallPhones(call: ICall): string[] {
		const phones: string[] = [];
		if (call) {
			phones.push(call.fromPhone);
			this.getPersonPhones(call.person).forEach((ph: string) => phones.push(ph));
			if (call.patients) {
				call.patients.forEach((p: ICallPatientIndex) => {
					this.getPersonPhones(p.patient.person).forEach((ph: string) => phones.push(ph));
				});
			}
		}
		return this.validatePhones(phones);
	}

	private validatePhones(phones: string[], byPhones: any = null): string[] {
		const list: string[] = [];
		phones.forEach((p: string) => {
			if (!byPhones || !byPhones[p]) {
				const isValidPhone: string | boolean = p && /^\d{10}$/.test(p);
				if (isValidPhone === true && !list.includes(p)) {
					list.push(p);
				}
			}
		});
		return list;
	}

	private validateLastnames(names: string[], byLastname: any = null): string[] {
		const list: string[] = [];
		names.forEach((p: string) => {
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

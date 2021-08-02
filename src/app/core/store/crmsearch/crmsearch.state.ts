import { ICRMSearch } from '../../models/crm-search.model';

export interface ICRMSearchState {
	search: ICRMSearch | null;
}

export const initialCRMSearchState: ICRMSearchState = {
	search: null,
};

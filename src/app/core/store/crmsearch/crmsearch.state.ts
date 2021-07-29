import { CRMSearch } from '../../models/crm-search.model';

export interface ICRMSearchState {
	search: CRMSearch | null;
}

export const initialCRMSearchState: ICRMSearchState = {
	search: null,
};

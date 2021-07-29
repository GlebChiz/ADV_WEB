import { Guid } from 'guid-typescript';
import { FormGroupType, FormPersonRole } from '../form.model';

export interface FormFilterModel {
	personId: Guid;
	patientIds: Guid[];
	formPersonRoles: FormPersonRole[];
	formGroupTypes: FormGroupType[];
}

import { Guid } from 'guid-typescript';
import { FormGroupType, FormPersonRole } from '../form.model';

export interface IFormFilterModel {
	personId: Guid;
	patientIds: Guid[];
	formPersonRoles: FormPersonRole[];
	formGroupTypes: FormGroupType[];
}

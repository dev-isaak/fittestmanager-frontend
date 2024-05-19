import { Dayjs } from "dayjs";

interface IFormValidation {
    firstName?: string,
    lastName?: string,
    dni?: string,
    email?: string,
    birthDate?: Dayjs,
    phone?: string,
    emergencyPhone?: string,
    avatar?: string,
    userId?: string,
    address?: string,
    country?: string,
    town?: string,
    postalCode?: string,
    gender?: string,
    plan?: string,
    status?: string
}

export const coachFormValidation = (formValues: IFormValidation) => {
  const errors: IFormValidation = {};
debugger
  if (!formValues.firstName) {
    errors.firstName = "Requerido";
  }
  if (!formValues.lastName) {
    errors.lastName = "Requerido";
  }
  if (!formValues.dni) {
    errors.dni = "Requerido";
  }
  if (!formValues.email) {
    errors.email = "Requerido";
  }
  
  return errors;
};
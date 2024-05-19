interface IClassFormValidation {
  className?: string,
  classDescription?: string
  classId?: string
  color?: string
}

export const classFormValidation = (formValues: IClassFormValidation) => {
const errors: IClassFormValidation = {};

if (!formValues.className) {
  errors.className = "Requerido";
}
return errors;
};
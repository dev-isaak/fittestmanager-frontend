interface IHoursTableValidation {
  weekDay?: string,
  roomId?: string,
  sinceHour?: string,
  toHour?: string,
  sinceDate?: any,
  toDate?: any,
  coach?: string,
  limitPersons?: string
  scheduleId?: string
}

export const hoursTableValidation = (formValues: IHoursTableValidation) => {
const errors: IHoursTableValidation = {};

if (!formValues.weekDay) {
  errors.weekDay = "Requerido";
}
if (!formValues.roomId) {
  errors.roomId = "Requerido";
}
if (!formValues.sinceHour) {
  errors.sinceHour = "Requerido";
}
if (!formValues.toHour) {
  errors.toHour = "Requerido";
}
if (!formValues.sinceDate) {
  errors.sinceDate = "Requerido";
}
if (!formValues.toDate) {
  errors.toDate = "Requerido";
}
if (!formValues.limitPersons) {
  errors.limitPersons = "Requerido";
}
return errors;
};
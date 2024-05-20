interface IClassFormValidation {
  className?: string,
  classDescription?: string
  classId?: string
  color?: string
  bookingLimitPerDay?: string
  minimumPersonsPerClass?: string
  limitTimeForBooking?: string
  waitingListType?: string
  calendarOrder?: string
  limitCancellationTime?: string
  roomId?: string
}

export const classFormValidation = (formValues: IClassFormValidation) => {
const errors: IClassFormValidation = {};

if (!formValues.className) {
  errors.className = "Requerido";
}
return errors;
};
interface ISeminarFormValidation {
  seminarName?: string,
  seminarDescription?: string
  seminarId?: string
  color?: string
  bookingLimitPerDay?: string
  minimumPersonsPerClass?: string
  limitTimeForBooking?: string
  waitingListType?: string
  calendarOrder?: string
  limitCancellationTime?: string
  roomId?: string
  date: any,
  time: any
}

export const seminarFormValidation = (formValues: ISeminarFormValidation) => {
  const errors: ISeminarFormValidation = {};

  if (!formValues.seminarName) {
    errors.seminarName = "Requerido";
  }
  return errors;
};
interface IEventsValidation {
  bookingId?: string,
}

export const eventsValidation = (formValues: IEventsValidation) => {
  const errors: IEventsValidation = {};

  // if (!formValues.className) {
  //   errors.className = "Requerido";
  // }
  return errors;
};
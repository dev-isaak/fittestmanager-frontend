interface ISeminarFormValidation {
  name?: string,
  description?: string
  id?: string
  color?: string
  booking_limit_per_day?: string
  minimum_persons_per_class?: string
  limit_time_for_bookings?: string
  waiting_list_type?: string
  calendar_order?: string
  limit_cancellation_time?: string
  room_id?: string
  date: any,
  time: any
}

export const seminarFormValidation = (formValues: ISeminarFormValidation) => {
  const errors: ISeminarFormValidation = {};

  if (!formValues.name) {
    errors.name = "Requerido";
  }
  return errors;
};
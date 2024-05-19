interface IRoomFormValidation {
    roomName?: string,
    roomDescription?: string
    roomId?: string
}

export const roomFormValidation = (formValues: IRoomFormValidation) => {
  const errors: IRoomFormValidation = {};

  if (!formValues.roomName) {
    errors.roomName = "Requerido";
  }
  return errors;
};
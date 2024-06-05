import { Dayjs } from "dayjs";

interface IInviteUsersValidation {
  // day: Dayjs
  // hour: Dayjs
  // fitnessCenterId: string
  // scheduleId: string
  // userId: string
  // bookedPersons: number
  // limitPersons: number
}

export const inviteUsersValidation = (formValues: IInviteUsersValidation) => {
  const errors: IInviteUsersValidation = {};
  // if (!formValues.className) {
  //   errors.className = "Requerido";
  // }
  return errors;
};
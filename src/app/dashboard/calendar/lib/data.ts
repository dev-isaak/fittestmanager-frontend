import { createClient } from "@/app/utils/supabase/client"
import dayjs from "dayjs"

export const getAllClassesSchedulesByFitnessCenterId = async (fitnessCenterId: number) => {
  const supabase = createClient()

  try {
    let { data: schedule, error } = await supabase
      .from('classes_schedule')
      .select('*, class_id(id, color(*)), bookings(*, members(*))')
      .eq('fitness_center_id', fitnessCenterId)

    return schedule || error
  } catch (e) {
    console.error(e)
  }
}

export const getAllClassesSchedulesByClassId = async (classId: number) => {
  const supabase = createClient()

  try {
    let { data: schedule, error } = await supabase
      .from('classes_schedule')
      .select('*, class_id(id, color(*))')
      .eq('class_id', classId)

    return schedule || error
  } catch (e) {
    console.error(e)
  }
}

export const getAllSchedulesBetweenTwoDates = async (fitnessCenterId: any, startDate, endDate) => {
  const supabase = createClient()
  // arreglar esto:
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  const start = formatDate(startDate)
  const end = formatDate(endDate)

  try {
    let { data: schedule, error } = await supabase
      .from('schedules')
      .select('*, class_id(id, color(*)), classes_schedule_id(event_id, since_day, until_day)')
      .eq('fitness_center_id', fitnessCenterId)
      .gte('date_time', start)
      .lte('date_time', end)

    return schedule || error
  } catch (e) {
    console.error(e)
  }
}

export const updateSchedule = async (scheduleData: any) => {
  const supabase = createClient()
  const formData = { ...scheduleData, class_id: scheduleData.class_id.id, classes_schedule_id: scheduleData.classes_schedule_id.event_id }
  try {
    const { data, error } = await supabase
      .from('schedules')
      .update(formData)
      .eq('id', scheduleData.id)
      .select('*, class_id(id, color(*)), classes_schedule_id(event_id, since_day, until_day)')

    if (error) {
      const error: any = new Error('Error updating the schedule.');
      error.code = 500;
      throw error;
    }
    console.log(error)
    return data || error
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

function getDaysOfWeek(dayOfWeek, startDate, endDate) {
  const daysOfWeekDict = {
    "sunday": 0,
    "monday": 1,
    "tuesday": 2,
    "wednesday": 3,
    "thursday": 4,
    "friday": 5,
    "saturday": 6,
  };

  let startDateObj = dayjs(startDate);
  let endDateObj = dayjs(endDate);

  // Get the number corresponding to the day of the week
  let dayOfWeekNum = daysOfWeekDict[dayOfWeek.toLowerCase()];

  // Find the first day that matches the selected day of the week
  let firstDay = startDateObj;

  while (firstDay.day() !== dayOfWeekNum) {
    firstDay = firstDay.add(1, 'day');
  }

  // Generate all the selected days of the week within the range
  let days = [];
  while (firstDay.isBefore(endDateObj) || firstDay.isSame(endDateObj, 'day')) {
    days.push(firstDay.format('YYYY-MM-DD'));
    firstDay = firstDay.add(7, 'day');
  }

  return days;
}


export const createClassSchedule = async (scheduleData: any, eventName: string, classId: any, currentCenterId: any) => {
  const supabase = createClient()

  const formData = { title: eventName, room_id: scheduleData.roomId, class_id: classId, fitness_center_id: currentCenterId, week_day: scheduleData.weekDay, start: scheduleData.sinceHour, end: scheduleData.toHour, since_day: scheduleData.sinceDate, until_day: scheduleData.toDate, limit_persons: parseInt(scheduleData.limitPersons), coach_id: scheduleData.coach }

  try {
    let { data, error } = await supabase
      .from('classes_schedule')
      .insert(formData)
      .select('*, class_id(color(*))')

    if (error) throw new Error('Error creando el horario: ', error)
    console.log(data)
    const eventId = data[0]?.event_id
    const selectedDays = getDaysOfWeek(scheduleData.weekDay, scheduleData.sinceDate, scheduleData.toDate);
    const time = dayjs(scheduleData.sinceHour).format('HH:mm')

    selectedDays.forEach(async (day) => {
      const dateTime = `${day}T${time}:00+02:00`

      const newEvent = {
        fitness_center_id: currentCenterId,
        date_time: dateTime,
        class_id: classId,
        coach_id: scheduleData.coach,
        limit_persons: scheduleData.limitPersons,
        title: eventName,
        classes_schedule_id: eventId
      }

      let { data, error } = await supabase
        .from('schedules')
        .insert(newEvent)
        .select('*, class_id(color(*))')

      if (error) throw new Error('Error creando el evento: ', error)

    })

    return data
  } catch (e) {
    console.error(e)
  }
}

export const updateClassSchedule = async (scheduleData: any) => {
  const supabase = createClient()

  const formData = { room_id: scheduleData.roomId || scheduleData.room_id, week_day: scheduleData.weekDay || scheduleData.week_day, start: scheduleData.sinceHour || scheduleData.start, end: scheduleData.toHour || scheduleData.end, since_day: scheduleData.sinceDate || scheduleData.since_day, until_day: scheduleData.toDate || scheduleData.until_day, limit_persons: scheduleData.limitPersons || scheduleData.limit_persons, coach_id: scheduleData.coach || scheduleData.coach_id, wod: scheduleData.wod, show_wod: scheduleData.show_wod }

  try {
    const { data, error } = await supabase
      .from('classes_schedule')
      .update(formData)
      .eq('event_id', scheduleData.scheduleId || scheduleData.event_id)
      .select('*, class_id(color(*))')

    if (error) {
      const error: any = new Error('Error updating the schedule.');
      error.code = 500;
      throw error;
    }
    return data || error
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}


export const getAllBookingsByFitnessCenterIdBetweenTwoDates = async (fitnessCenterId: number, startDate, endDate) => {
  const supabase = createClient()
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  const start = formatDate(startDate)
  const end = formatDate(endDate)

  try {
    let { data: bookings, error } = await supabase
      .from('bookings')
      .select('*, member_id(*)')
      .eq('fitness_center_id', fitnessCenterId)
      .gte('date', start)
      .lte('date', end)

    return bookings || error
  } catch (e) {
    console.error(e)
  }
}

export const getAllBookingsBySchedule = async (scheduleId: number) => {
  const supabase = createClient()

  try {
    let { data: bookings, error } = await supabase
      .from('bookings')
      .select('*, member_id(*)')
      .eq('schedule_id', scheduleId)

    return bookings || error
  } catch (e) {
    console.error(e)
  }
}

export const bookAClass = async (bookingData: any) => {
  const supabase = createClient()

  const formData = { member_id: bookingData.userId, schedule_id: bookingData.scheduleId, fitness_center_id: bookingData.fitnessCenterId, date: bookingData.date, hour: bookingData.hour }

  try {
    let { data, error } = await supabase
      .from('bookings')
      .insert(formData)
      .select('*, member_id(*)')

    if (error?.code === 'P0001') {
      const error: any = new Error('El usuario ya está apuntando en esta clase.');
      error.code = 500;
      throw error;
    }

    return data || error
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

export const updateABooking = async (bookingData: any) => {
  const supabase = createClient()

  const formData = { date: bookingData.date, hour: bookingData.hour, is_cancelled: bookingData.is_cancelled }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .update(formData)
      .eq('id', bookingData.id)
      .select('*, member_id(*)')

    if (error) {
      const error: any = new Error('Error updating the booking.');
      error.code = 500;
      throw error;
    }

    return data
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

export const userCancelsBooking = async (booking) => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', booking.id)
      .select()

    if (error) {
      const error: any = new Error('Error cancelling the booking.');
      error.code = 500;
      throw error;
    }

    return data
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

export const getWaitingListBySchedule = async (scheduleId: number) => {
  const supabase = createClient()

  try {
    let { data: bookings, error } = await supabase
      .from('booking_waiting_list')
      .select('*, member_id(*)')
      .eq('schedule_id', scheduleId)


    if (error) {
      const error: any = new Error('Error getting waiting list.');
      error.code = 500;
      throw error;
    }

    return bookings
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

export const addUserToWaitingList = async (bookingData: any) => {
  const supabase = createClient()

  const formData = { member_id: bookingData.userId, schedule_id: bookingData.scheduleId, fitness_center_id: bookingData.fitnessCenterId, date: bookingData.date, hour: bookingData.hour }

  try {
    let { data, error } = await supabase
      .from('booking_waiting_list')
      .insert(formData)
      .select('*, member_id(*)')

    if (error) {
      const error: any = new Error('Error adding user to waiting list.');
      error.code = 500;
      throw error;
    }

    return data
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

export const deleteUserFromWaitingList = async (booking) => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('booking_waiting_list')
      .delete()
      .eq('id', booking.id)
      .select()

    if (error) {
      const error: any = new Error('Error cancelling the booking.');
      error.code = 500;
      throw error;
    }

    return data
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

export const getCancellationsBySchedule = async (scheduleId: number) => {
  const supabase = createClient()

  try {
    let { data: bookings, error } = await supabase
      .from('booking_cancellations')
      .select('*, member_id(*)')
      .eq('schedule_id', scheduleId)


    if (error) {
      const error: any = new Error('Error getting cancellation list.');
      error.code = 500;
      throw error;
    }

    return bookings
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

export const addUserToCancelationList = async (bookingData: any) => {
  const supabase = createClient()

  const formData = { member_id: bookingData.member_id.id, schedule_id: bookingData.schedule_id, fitness_center_id: bookingData.fitness_center_id, date: bookingData.date, hour: bookingData.hour }
  // debugger
  try {
    let { data, error } = await supabase
      .from('booking_cancellations')
      .insert(formData)
      .select('*, member_id(*)')

    if (error) {
      const error: any = new Error('Error adding user to cancellations list.');
      error.code = 500;
      throw error;
    }

    return data
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

export const deleteUserFromCancellationList = async (booking) => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('booking_cancellations')
      .delete()
      .eq('id', booking.id)
      .select()

    if (error) {
      const error: any = new Error('Error cancelling the booking.');
      error.code = 500;
      throw error;
    }

    return data
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}
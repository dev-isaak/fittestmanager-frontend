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
      .select('*, class_id(id, color(*)), bookings(*, members(*))')
      .eq('class_id', classId)

    return schedule || error
  } catch (e) {
    console.error(e)
  }
}

export const createClassSchedule = async (scheduleData: any, eventName: string, classId: any, currentCenterId: any) => {
  const supabase = createClient()

  const formData = { title: eventName, room_id: scheduleData.roomId, class_id: classId, fitness_center_id: currentCenterId, week_day: scheduleData.weekDay, start: scheduleData.sinceHour, end: scheduleData.toHour, since_day: scheduleData.sinceDate, until_day: scheduleData.toDate, limit_persons: parseInt(scheduleData.limitPersons), coach_id: scheduleData.coach }

  try {
    let { data, error } = await supabase
      .from('classes_schedule')
      .insert(formData)
      .select()

    return data || error
  } catch (e) {
    console.error(e)
  }
}

export const updateClassSchedule = async (scheduleData: any) => {
  const supabase = createClient()

  const formData = { room_id: scheduleData.roomId, week_day: scheduleData.weekDay, start: scheduleData.sinceHour, end: scheduleData.toHour, since_day: scheduleData.sinceDate, until_day: scheduleData.toDate, limit_persons: scheduleData.limitPersons, coach_id: scheduleData.coach }

  try {
    const { data, error } = await supabase
      .from('classes_schedule')
      .update(formData)
      .eq('event_id', scheduleData.scheduleId)
      .select()

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

export const bookAClass = async (bookingData: any) => {
  const supabase = createClient()
  const formData = { class_id: null, member_id: bookingData.userId, schedule_id: bookingData.scheduleId, fitness_center_id: bookingData.fitnessCenterId, date: bookingData.date, hour: bookingData.hour }

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
    return data || error


  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}
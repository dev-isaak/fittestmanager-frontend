import { createClient } from "@/app/utils/supabase/client"
import dayjs from "dayjs"

export const getAllSeminars = async (currentCenterId: number) => {
  const supabase = createClient()

  try {
    let { data: seminars, error } = await supabase
      .from('seminars')
      .select('*, color(*)')
      .eq('fitness_center_id', currentCenterId)

    return seminars || error
  } catch (e) {
    console.error(e)
  }
}

export const createSeminar = async (seminarData: any, centerId: number) => {
  let finalData
  const supabase = createClient()
  const formData = { name: seminarData.seminarName, description: seminarData.seminarDescription, fitness_center_id: centerId, booking_limit_per_day: seminarData.bookingLimitPerDay, minimum_persons_per_class: seminarData.minimumPersonsPerClass, limit_time_for_booking: seminarData.limitTimeForBooking, waiting_list_type: seminarData.waitingListType, calendar_order: seminarData.calendarOrder, limit_cancellation_time: seminarData.limitCancellationTime, room_id: seminarData.roomId, date: dayjs(seminarData.date).format('YYYY-MM-DD'), time: dayjs(seminarData.time).format('HH:mm') }
  try {

    const { data, error } = await supabase
      .from('seminars')
      .insert(formData)
      .select('*, color(*)')

    if (error) {
      const error: any = new Error('Error creating the seminar.');
      error.code = 500;
      throw error;
    }

    const color = await createColor(data[0].id, seminarData.color)

    if (color) {
      finalData = await updateSeminar({ ...formData, color: color[0].id, seminarId: data[0].id })
    }

    return finalData
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

export const updateSeminar = async (seminarData: any) => {
  const supabase = createClient()
  let colorId
  if (isNaN(seminarData.color)) {
    const color = await updateColor(seminarData.seminarId, seminarData.color)
    colorId = color[0].id
  } else {
    colorId = seminarData.color
  }
  const formData = { name: seminarData.name, description: seminarData.description, color: colorId, booking_limit_per_day: seminarData.booking_limit_per_day, minimum_persons_per_class: seminarData.minimum_persons_per_class, limit_time_for_booking: seminarData.limit_time_for_booking, waiting_list_type: seminarData.waiting_list_type, calendar_order: seminarData.calendar_order, limit_cancellation_time: seminarData.limit_cancellation_time, room_id: seminarData.room_id, date: seminarData.date, time: seminarData.time }

  try {
    const { data, error } = await supabase
      .from('seminars')
      .update(formData)
      .eq('id', seminarData.seminarId)
      .select('*, color(*)')

    if (error) {
      const error: any = new Error('Error updating the seminar.');
      error.code = 500;
      throw error;
    }

    return data
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

const createColor = async (seminarId: number, color: any) => {
  const supabase = createClient()
  const formData = { seminar_id: seminarId, color: color }

  try {
    const { data, error } = await supabase
      .from('seminars_colors')
      .insert(formData)
      .select()

    if (error) {
      const error: any = new Error('Error creating the color.');
      error.code = 500;
      throw error;
    }

    return data || error
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

const updateColor = async (seminarId, color: any) => {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from('seminars_colors')
      .update({ seminar_id: seminarId, color: color })
      .eq('seminar_id', seminarId)
      .select()

    if (error) {
      const error: any = new Error('Error updating the color.');
      error.code = 500;
      throw error;
    }

    return data
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

export const deleteSeminar = async (classId) => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('seminars')
      .delete()
      .eq('id', classId)
      .select('*')

    if (error) {
      const error: any = new Error('Error updating the class.');
      error.code = 500;
      throw error;
    }

    return data
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}
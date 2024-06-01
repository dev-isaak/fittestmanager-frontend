import { createClient } from "@/app/utils/supabase/client"

export const getAllClassesSchedulesByFitnessCenterId = async(fitnessCenterId: number) => {
  const supabase = createClient()
  
  try {
    let { data: schedule, error } = await supabase
    .from('classes_schedule')
    .select('*, class_id(color(*))')
    .eq('fitness_center_id', fitnessCenterId)
    
    return schedule || error
  } catch (e) {
    console.error(e)
  }
}

export const getAllClassesSchedulesByClassId = async(classId: number) => {
  const supabase = createClient()
  
  try {
    let { data: schedule, error } = await supabase
    .from('classes_schedule')
    .select('*, class_id(color(*))')
    .eq('class_id', classId)
    
    return schedule || error
  } catch (e) {
    console.error(e)
  }
}

export const createClassSchedule = async(scheduleData: any, eventName: string, classId: any, currentCenterId: any) => {
  const supabase = createClient()
  
  const formData = {title: eventName, room_id: scheduleData.roomId, class_id: classId, fitness_center_id: currentCenterId, week_day: scheduleData.weekDay, start: scheduleData.sinceHour, end: scheduleData.toHour, since_day: scheduleData.sinceDate, until_day: scheduleData.toDate, limit_persons: parseInt(scheduleData.limitPersons), coach_id: scheduleData.coach}
  
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

export const updateClassSchedule = async(scheduleData: any) => {
  const supabase = createClient()
  
  const formData = {room_id: scheduleData.roomId, week_day: scheduleData.weekDay, start: scheduleData.sinceHour, end: scheduleData.toHour, since_day: scheduleData.sinceDate, until_day: scheduleData.toDate, limit_persons: scheduleData.limitPersons, coach_id: scheduleData.coach}

  try {
    const { data, error } = await supabase
    .from('classes_schedule')
    .update(formData)
    .eq('event_id', scheduleData.scheduleId)
    .select()

    if(error) {
      const error: any = new Error('Error updating the schedule.');
      error.code = 500;
      throw error;
    }
    return data || error
    

  } catch(e: any){
    console.error(e)
    return { error: e.message, code: e.code}
  }
}

export const getAllBookingsByFitnessCenterId = async(fitnessCenterId: number) => {
  const supabase = createClient()
  
  try {
    let { data: bookings, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('fitness_center_id', fitnessCenterId)
    
    return bookings || error
  } catch (e) {
    console.error(e)
  }
}

export const bookAClass = async(bookingData: any, classId: any, currentCenterId: any, clientId: any) => {
  const supabase = createClient()
  
  const formData = {client_id: clientId, class_id: classId, fitness_center_id: currentCenterId, date: bookingData.date, hour: bookingData.hour}
  
  try {
    let { data, error } = await supabase
    .from('bookings')
    .insert(formData)
    .select()
    
    return data || error
  } catch (e) {
    console.error(e)
  }
}

export const updateABooking = async(bookingData: any, bookingId: any) => {
  const supabase = createClient()
  
  const formData = { date: bookingData.date, hour: bookingData.hour}

  try {
    const { data, error } = await supabase
    .from('bookings')
    .update(formData)
    .eq('id', bookingId)
    .select()

    if(error) {
      const error: any = new Error('Error updating the booking.');
      error.code = 500;
      throw error;
    }
    return data || error
    

  } catch(e: any){
    console.error(e)
    return { error: e.message, code: e.code}
  }
}
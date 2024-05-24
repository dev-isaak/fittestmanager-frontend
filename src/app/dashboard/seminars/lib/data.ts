import { createClient } from "@/app/utils/supabase/client"

export const getAllSeminars = async(currentCenterId: number) => {
  const supabase = createClient()
  
  try {
    let { data: seminars, error } = await supabase
    .from('seminars')
    .select('*')
    .eq('fitness_center_id', currentCenterId)
    
    return seminars || error
  } catch (e) {
    console.error(e)
  }
}

export const createSeminar = async(seminarData: any, centerId: number) => {
  const supabase = createClient()
  const formData = {name: seminarData.seminarName, description: seminarData.seminarDescription, color: seminarData.color, fitness_center_id: centerId, booking_limit_per_day: seminarData.bookingLimitPerDay, minimum_persons_per_class: seminarData.minimumPersonsPerClass, limit_time_for_booking: seminarData.limitTimeForBooking, waiting_list_type: seminarData.waitingListType, calendar_order: seminarData.calendarOrder, limit_cancellation_time: seminarData.limitCancellationTime, room_id: seminarData.roomId }
  try {

    const { data, error } = await supabase
    .from('seminars')
    .insert(formData)
    .select()

    if(error) {
      const error: any = new Error('Error creating the seminar.');
      error.code = 500;
      throw error;
    }
    
    return data || error
  } catch(e: any){
    console.error(e)
    return { error: e.message, code: e.code}
  }
}

export const updateSeminar = async(seminarData: any) => {
  const supabase = createClient()
  const formData = {name: seminarData.seminarName, description: seminarData.seminarDescription, color: seminarData.color,booking_limit_per_day: seminarData.bookingLimitPerDay, minimum_persons_per_class: seminarData.minimumPersonsPerClass, limit_time_for_booking: seminarData.limitTimeForBooking, waiting_list_type: seminarData.waitingListType, calendar_order: seminarData.calendarOrder, limit_cancellation_time: seminarData.limitCancellationTime, room_id: seminarData.roomId}
  try {
    const { data, error } = await supabase
    .from('seminars')
    .update(formData)
    .eq('id', seminarData.seminarId)
    .select()

    if(error) {
      const error: any = new Error('Error updating the seminar.');
      error.code = 500;
      throw error;
    }

    return data || error
  } catch(e: any){
    console.error(e)
    return { error: e.message, code: e.code}
  }
}
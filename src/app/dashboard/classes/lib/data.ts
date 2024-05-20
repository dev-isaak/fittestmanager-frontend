import { createClient } from "@/app/utils/supabase/client"

export const getAllClasses = async(currentCenterId: number) => {
  const supabase = createClient()
  
  try {
    let { data: classes, error } = await supabase
    .from('classes')
    .select('*')
    .eq('fitness_center_id', currentCenterId)
    
    return classes || error
  } catch (e) {
    console.error(e)
  }
}

export const createClass = async(classData: any, centerId: number) => {
  const supabase = createClient()
  const formData = {name: classData.className, description: classData.classDescription, color: classData.color, fitness_center_id: centerId, booking_limit_per_day: classData.bookingLimitPerDay, minimum_persons_per_class: classData.minimumPersonsPerClass, limit_time_for_booking: classData.limitTimeForBooking, waiting_list_type: classData.waitingListType, calendar_order: classData.calendarOrder, limit_cancellation_time: classData.limitCancellationTime, room_id: classData.roomId }
  try {

    const { data, error } = await supabase
    .from('classes')
    .insert(formData)
    .select()

    if(error) {
      const error: any = new Error('Error creating the class.');
      error.code = 500;
      throw error;
    }
    return data || error
    

  } catch(e: any){
    console.error(e)
    return { error: e.message, code: e.code}
  }
}

export const updateClass = async(classData: any) => {
  const supabase = createClient()
  const formData = {name: classData.className, description: classData.classDescription, color: classData.color,booking_limit_per_day: classData.bookingLimitPerDay, minimum_persons_per_class: classData.minimumPersonsPerClass, limit_time_for_booking: classData.limitTimeForBooking, waiting_list_type: classData.waitingListType, calendar_order: classData.calendarOrder, limit_cancellation_time: classData.limitCancellationTime, room_id: classData.roomId}
  try {

    const { data, error } = await supabase
    .from('classes')
    .update(formData)
    .eq('id', classData.classId)
    .select()

    if(error) {
      const error: any = new Error('Error updating the room.');
      error.code = 500;
      throw error;
    }
    return data || error
    

  } catch(e: any){
    console.error(e)
    return { error: e.message, code: e.code}
  }
}
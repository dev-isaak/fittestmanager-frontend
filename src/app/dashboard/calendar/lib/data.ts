import { createClient } from "@/app/utils/supabase/client"

export const getAllClassesSchedules = async(classId: number) => {
  const supabase = createClient()
  
  try {
    let { data: schedule, error } = await supabase
    .from('classes_schedule')
    .select('*')
    .eq('class_id', classId)
    
    return schedule || error
  } catch (e) {
    console.error(e)
  }
}

export const createClassSchedule = async(scheduleData: any, eventName: string, eventColor: string, classId: any, currentCenterId: any) => {
  const supabase = createClient()
  const formData = {title: eventName, color: eventColor, room_id: scheduleData.roomId, class_id: classId, fitness_center_id: currentCenterId, week_day: scheduleData.weekDay, start: scheduleData.sinceHour, end: scheduleData.toHour, since_day: scheduleData.sinceDate, until_day: scheduleData.toDate, limit_persons: scheduleData.limitPersons}
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
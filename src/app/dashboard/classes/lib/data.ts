import { createClient } from "@/app/utils/supabase/client"

export const getAllClasses = async (currentCenterId: number) => {
  const supabase = createClient()

  try {
    let { data: classes, error } = await supabase
      .from('classes')
      .select('*, color(color)')
      .eq('fitness_center_id', currentCenterId)

    return classes || error
  } catch (e) {
    console.error(e)
  }
}

export const createClass = async (classData: any, centerId: number) => {
  let finalData
  const supabase = createClient()
  const formData = { name: classData.className, description: classData.classDescription, fitness_center_id: centerId, booking_limit_per_day: classData.bookingLimitPerDay, minimum_persons_per_class: classData.minimumPersonsPerClass, limit_time_for_booking: classData.limitTimeForBooking, waiting_list_type: classData.waitingListType, calendar_order: classData.calendarOrder, limit_cancellation_time: classData.limitCancellationTime }
  try {
    const { data, error } = await supabase
      .from('classes')
      .insert(formData)
      .select()

    if (error) {
      const error: any = new Error('Error creating the class.');
      error.code = 500;
      throw error;
    }

    const color = await createColor(data[0].id, classData.color)
    if (color) {
      finalData = await updateClass({ ...formData, color: color[0].id, classId: data[0].id })
    }

    return finalData || error
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

export const updateClass = async (classData: any) => {
  const supabase = createClient()
  let colorId
  if (isNaN(classData.color)) {
    const color = await updateColor(classData.classId, classData.color)
    colorId = color[0].id
  } else {
    colorId = classData.color
  }

  const formData = { name: classData.className, description: classData.classDescription, color: colorId, booking_limit_per_day: classData.bookingLimitPerDay, minimum_persons_per_class: classData.minimumPersonsPerClass, limit_time_for_booking: classData.limitTimeForBooking, waiting_list_type: classData.waitingListType, calendar_order: classData.calendarOrder, limit_cancellation_time: classData.limitCancellationTime, room_id: classData.roomId }
  try {

    const { data, error } = await supabase
      .from('classes')
      .update(formData)
      .eq('id', classData.classId)
      .select('*, color(color)')

    if (error) {
      const error: any = new Error('Error updating the class.');
      error.code = 500;
      throw error;
    }

    return data || error
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

const createColor = async (classId: number, color: any) => {
  const supabase = createClient()
  const formData = { class_id: classId, color: color }

  try {
    const { data, error } = await supabase
      .from('classes_colors')
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

const updateColor = async (classId, color: any) => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('classes_colors')
      .update({ class_id: classId, color: color })
      .eq('class_id', classId)
      .select()

    if (error) {
      const error: any = new Error('Error updating the color.');
      error.code = 500;
      throw error;
    }

    return data || error
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code }
  }
}

export const deleteClass = async (classId) => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('classes')
      .delete()
      .eq('id', classId)
      .select('*')

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
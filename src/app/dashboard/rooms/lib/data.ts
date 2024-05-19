import { createClient } from "@/app/utils/supabase/client"

export const getAllRooms = async(currentCenterId: number) => {
  const supabase = createClient()
  
  try {
    let { data: rooms, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('fitness_center_id', currentCenterId)
    
    return rooms || error
  } catch (e) {
    console.error(e)
  }
}

export const createRoom = async(room: any, centerId: number) => {
  const supabase = createClient()
  const formData = {name: room.roomName, description: room.roomDescription, fitness_center_id: centerId}
  try {

    const { data, error } = await supabase
    .from('rooms')
    .insert(formData)
    .select()

    if(error) {
      const error: any = new Error('Error creating the room.');
      error.code = 500;
      throw error;
    }
    return data || error
    

  } catch(e: any){
    console.error(e)
    return { error: e.message, code: e.code}
  }
}

export const updateRoom = async(room: any) => {
  const supabase = createClient()
  const formData = {name: room.roomName, description: room.roomDescription}
  try {

    const { data, error } = await supabase
    .from('rooms')
    .update(formData)
    .eq('id', room.roomId)
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
import { createClient } from "@/app/utils/supabase/client"

export const getAllMembers = async(currentCenterId: number) => {
  const supabase = createClient()
  
  try {
    let { data: members, error } = await supabase
    .from('members')
    .select('*')
    .eq('fitness_center_id', currentCenterId)

    return members || error
  } catch (e) {
    console.error(e)
  }
}
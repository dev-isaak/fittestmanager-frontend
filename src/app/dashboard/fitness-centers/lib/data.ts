import { getMyUser } from "@/app/sign-in/lib/data"
import { createClient } from "@/app/utils/supabase/client"

export const getOwnFitnessCenters = async() => {
  const supabase = createClient()
  try {
    const user = await getMyUser()
    
    let { data: fitness_centers, error } = await supabase
  .from('fitness_centers')
  .select(`*`).eq('manager_id', user?.id)
  
  return fitness_centers || error
  } catch(e) {
    console.error(e)
  }
}

export const getAllFitnessCenters = async() => {
  const supabase = createClient()
  try {
    let { data: fitness_centers, error } = await supabase
  .from('fitness_centers')
  .select(`*`)

  return fitness_centers || error
  } catch(e) {
    console.error(e)
  }
}
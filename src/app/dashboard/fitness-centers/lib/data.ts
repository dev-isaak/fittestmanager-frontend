import { createClient } from "@/app/utils/supabase/client"

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
import { createClient } from "@/app/utils/supabase/client"

export const getAllMembers = async() => {
  const supabase = createClient()
  try {
    let { data: members, error } = await supabase
    .from('members')
    .select('*, fitness_centers(*)')

    return members || error
  } catch (e) {
    console.error(e)
  }
}
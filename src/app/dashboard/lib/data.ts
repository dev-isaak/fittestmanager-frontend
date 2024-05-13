import { createClient } from "@/app/utils/supabase/client"

export const addCenterName = async(centerName: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
  .from('fitness_centers')
  .update({ center_name: centerName })
  .eq('id', 'someValue')
  .select()
}
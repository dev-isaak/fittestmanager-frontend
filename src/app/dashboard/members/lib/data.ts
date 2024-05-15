import { createClient } from "@/app/utils/supabase/client"
import { IMember } from "../interfaces/interfaces"
import { getAvatarURLFromSupabaseStorage } from "@/app/lib/data"

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

export const updateMember = async(member: any) => {
  const supabase = createClient()
  const fileUploaded = member.get('avatar').size !== 0
  const formData = {first_name: member.get('firstName'), last_name: member.get('lastName'), dni: member.get('dni'), birth_date: member.get('birthDate'), phone_number: member.get('phone'), emergency_phone: member.get('emergencyPhone'), address: member.get('address'), country: member.get('country'), town: member.get('town'), postal_code: member.get('postalCode') , plan: member.get('plan'), gender: member.get('gender') }
  const formDataWithAvatar = {...formData, photo: ''} 
  try{
    if (fileUploaded){
      const imagePath = await getAvatarURLFromSupabaseStorage(member.get('avatar'))
      formDataWithAvatar.photo = imagePath
    }
    const { data, error } = await supabase
    .from('members')
    .update(fileUploaded ? formDataWithAvatar : formData)
    .eq('user_id', member.get('userId'))
    .select()
    return data || error
  } catch (e) {
    console.error(e)
  }
}
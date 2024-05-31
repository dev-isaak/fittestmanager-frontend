import { createClient } from "@/app/utils/supabase/client"
import { getAvatarURLFromSupabaseStorage } from "@/app/lib/data"
import { inviteUser } from "@/app/lib/serverData"

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
  const fileUploaded = member.avatar !== undefined
  const formData = {first_name: member.firstName, last_name: member.lastName, dni: member.dni, birth_date: member.birthDate, phone_number: member.phone, emergency_phone: member.emergencyPhone, address: member.address, country: member.country, town: member.town, postal_code: member.postalCode , plan: member.plan, gender: member.gender, status: member.status }
  const formDataWithAvatar = {...formData, photo: ''} 
  try{
    if (fileUploaded){
      const imagePath = await getAvatarURLFromSupabaseStorage(member.avatar)
      formDataWithAvatar.photo = imagePath
    }
    const { data, error } = await supabase
    .from('members')
    .update(fileUploaded ? formDataWithAvatar : formData)
    .eq('user_id', member.userId)
    .select()
    return data || error
  } catch (e) {
    console.error(e)
  }
}

export const createMember = async(member: any, centerId: number) => {
  const supabase = createClient()
  const fileUploaded = member.avatar
  let imagePath = ''
  try{
    // TODO: AÑADIR PERMISOS PARA INVITAR A USUARIO.
    // const user = await inviteUser(member.email)
    // if (!user.user) {
    //   const error: any = new Error('Error sending an invititation to user.');
    //   error.code = 400;
    //   throw error;
    // }
    if(fileUploaded !== ''){
      imagePath = await getAvatarURLFromSupabaseStorage(fileUploaded)
    }
    const formData = {user_id: '57514a48-f8da-4a23-9206-3c8f314ade25', email: member.email, fitness_center_id: centerId, photo: imagePath, first_name: member.firstName, last_name: member.lastName, dni: member.dni, birth_date: member.birthDate, phone_number: member.phone, emergency_phone: member.emergencyPhone, address: member.address, country: member.country, town: member.town, postal_code: member.postalCode , plan: member.plan, gender: member.gender }

    const { data, error } = await supabase
    .from('members')
    .insert(formData)
    .select()
    
    if(error) {
      const error: any = new Error('Error creating the user.');
      error.code = 500;
      throw error;
    }
    return data || error
  } catch (e: any) {
    console.error(e)
    return { error: e.message, code: e.code}
  }
}
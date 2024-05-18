import { createClient } from "@/app/utils/supabase/client"
import { getAvatarURLFromSupabaseStorage, inviteUser } from "@/app/lib/data"

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

export const createMember = async(member: any, centerId: number) => {
  const supabase = createClient()
  const fileUploaded = member.get('avatar')

  try{
    // TODO: AÑADIR PERMISOS PARA INVITAR A USUARIO.
    const user = await inviteUser(member.get('email'))
    if (!user.user) {
      const error: any = new Error('Error sending an invititation to user.');
      error.code = 400;
      throw error;
    }
    
    const imagePath = await getAvatarURLFromSupabaseStorage(fileUploaded)
    const formData = {user_id: '57514a48-f8da-4a23-9206-3c8f314ade25', email: member.get('email'), fitness_center_id: centerId, photo: imagePath, first_name: member.get('firstName'), last_name: member.get('lastName'), dni: member.get('dni'), birth_date: member.get('birthDate'), phone_number: member.get('phone'), emergency_phone: member.get('emergencyPhone'), address: member.get('address'), country: member.get('country'), town: member.get('town'), postal_code: member.get('postalCode') , plan: member.get('plan'), gender: member.get('gender') }

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
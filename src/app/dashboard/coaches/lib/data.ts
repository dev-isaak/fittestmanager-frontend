import { getAvatarURLFromSupabaseStorage, inviteUser } from "@/app/lib/data"
import { createClient } from "@/app/utils/supabase/client"

export const getAllCoaches = async(currentCenterId: number) => {
  const supabase = createClient()

  try {
    let { data: coaches, error } = await supabase
    .from('coaches')
    .select('*')
    .eq('fitness_center_id', currentCenterId)

    return coaches || error
  } catch (e) {
    console.error(e)
  }
}

export const getCoachRole = async(coachId: string) => {
  const supabase = createClient()
  
  try {
    let { data: role, error } = await supabase
    .from('user_roles')
    .select('*')
    .eq('user_id', coachId)

    return role || error
  } catch (e) {
    console.error(e)
  }
}

export const updateCoach = async(coach: any) => {
  const supabase = createClient()
  console.log(coach)
  const fileUploaded = coach.avatar !== undefined
  const formData = {first_name: coach.firstName, last_name: coach.lastName, dni: coach.dni, birth_date: coach.birthDate, phone_number: coach.phone, address: coach.address, country: coach.country, town: coach.town, postal_code: coach.postalCode , gender: coach.gender }
  const formDataWithAvatar = {...formData, photo: ''} 
  try{
    if (fileUploaded){
      const imagePath = await getAvatarURLFromSupabaseStorage(coach.avatar)
      formDataWithAvatar.photo = imagePath
    }

    const roleUpdated = await updateCoachRole(coach.coachRole, coach.userId)
    if (!roleUpdated) throw new Error('No se ha podido actualizar el rol')

    const { data, error } = await supabase
    .from('coaches')
    .update(fileUploaded ? formDataWithAvatar : formData)
    .eq('user_id', coach.userId)
    .select()

    return data || error
  } catch (e) {
    console.error(e)
  }
}

const updateCoachRole = async(role: 'manager' | 'coach', user_uuid: string) => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
    .from('user_roles')
    .update({role: role})
    .eq('user_id', user_uuid)
    .select()
    console.log(user_uuid)
    console.log(error)
    return true
  } catch(e) {
    console.error(e)
  }

}

export const createCoach = async(coach: any, centerId: number) => {
  const supabase = createClient()
  const fileUploaded = coach.avatar

  try{
    // AÑADIR PERMISOS PARA INVITAR A USUARIO.
    // const user = await inviteUser(coach.email)
    // if (!user.user) {
    //   const error: any = new Error('Error sending an invititation to user.');
    //   error.code = 400;
    //   throw error;
    // }

    const imagePath = await getAvatarURLFromSupabaseStorage(fileUploaded)
    const formData = {user_id: '57514a48-f8da-4a23-9206-3c8f314ade25', email: coach.email, fitness_center_id: centerId, photo: imagePath, first_name: coach.firstName, last_name: coach.lastName, dni: coach.dni, birth_date: coach.birthDate, phone_number: coach.phone, emergency_phone: coach.emergencyPhone, address: coach.address, country: coach.country, town: coach.town, postal_code: coach.postalCode , plan: coach.plan, gender: coach.gender }


    const { data, error } = await supabase
    .from('coaches')
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
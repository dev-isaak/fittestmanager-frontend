import { adminAuthClient } from "../utils/supabase/adminAuth"

export const inviteUser = async(email: string) => {
  // const supabase = createClient()

  try{
    let { data, error } = await adminAuthClient.inviteUserByEmail(email)
    console.log('Invite user: ', data)
    return data || error
  } catch (e) {
    console.error(e)
  }
}
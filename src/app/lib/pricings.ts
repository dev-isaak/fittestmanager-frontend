import { createClient } from "../utils/supabase/client"

export const getStripePrices = async () => {
  const supabase = createClient()

  const { data: products, error } = await supabase
    .from('prices')
    .select('*, product_id(*)')


  if (error) {
    const error: any = new Error('Error getting products.');
    error.code = 500;
    throw error;
  }

  return products
}
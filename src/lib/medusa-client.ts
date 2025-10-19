import Medusa from '@medusajs/medusa-js'

const MEDUSA_API_URL = import.meta.env.VITE_MEDUSA_API_URL || 'http://localhost:9000'

export const medusaClient = new Medusa({ 
  baseUrl: MEDUSA_API_URL, 
  maxRetries: 3 
})

export default medusaClient

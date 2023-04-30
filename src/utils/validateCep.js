import { getCep } from "./getCep.js"

export const validateCep = async(cep) => {
   try {
    const response = await getCep(cep)
    if(response.data.erro !== undefined || response.data.erro !== null && response.data.erro === 'true'){
        return false
    }
    return true
   } catch (error) {
      return error
   }
}


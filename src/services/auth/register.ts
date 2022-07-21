import axios from '@axios/index'
import { AxiosError } from 'axios'

export const RegisterService = async (email: string, password: string) => {
  try{
    const response = await axios.post('/api/user/registration', {
      email,
      password
    })

    return response.data
  }
  catch (e){
    if (e instanceof Error) {
      let errorMessage = 'Ошибка регистрации'
      if (e instanceof AxiosError) {
        errorMessage = e.response?.data
      }

      return errorMessage
    }
  }
}

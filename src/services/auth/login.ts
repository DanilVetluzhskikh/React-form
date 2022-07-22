import axios from '@axios/index'
import { AxiosError } from 'axios'
import { setCookie } from '@utils/cookie'

export const LoginService = async (email: string, password: string) => {
  try {
    const response = await axios.post('/api/user/login', {
      email,
      password
    })

    setCookie('token', response.data.token, { 'max-age': 86400 })
    setCookie('userId', response.data.id, { 'max-age': 86400 })

    return response.data
  }
  catch (e){
    let errorMessage = 'Ошибка авторизации'
    if (e instanceof AxiosError) {
      errorMessage = e.response?.data
    }

    return errorMessage
  }
}

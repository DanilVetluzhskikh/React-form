import { deleteCookie } from '@utils/cookie'
import axios from '@axios/index'

export const LogoutService = async () => {
  try {
    const response = await axios.post('/api/user/logout')
    deleteCookie('token')
    deleteCookie('userId')
  }
  catch (e){
    console.log(e)
    return e
  }
}

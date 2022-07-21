import { deleteCookie } from '@utils/cookie'

export const LogoutService = () => {
  deleteCookie('token')
}

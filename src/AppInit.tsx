import React, {
  FC, useEffect
} from 'react'
import { Header } from '@components/Header'
import { useAppDispatch } from '@store/index'
import { setUserAuth } from '@store/slices'
import { getCookie } from '@utils/cookie'

export const AppInit: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(getCookie('token')){
      dispatch(setUserAuth(true))
    }
  }, [])

  return (
    <div className='h-screen w-screen bg-fuchsia-50'>
      <Header />
      <div className='pl-5 pr-5'>

      </div>
    </div>
  )
}

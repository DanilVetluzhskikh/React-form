import React, { FC } from 'react'
import { useAppDispatch } from '@store/index'
import { LogoutService } from '@services/auth/logout'
import { setUserAuth } from '@store/slices'
import {
  Link,
  useNavigate
} from 'react-router-dom'
import { getUserDataService } from '@services/user/getUserData'
import { CircularProgress } from '@mui/material'
import { getFirstLetter } from '@utils/line/firstLetter'

interface ToolTipProps {
  handleChangeToolTip: () => void;
}

export const ToolTip: FC<ToolTipProps> = ({ handleChangeToolTip }) => {
  const {
    isLoading, data
  } = getUserDataService.useFetchDataUserQuery('')

  const navigation = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    await LogoutService()
    dispatch(setUserAuth(false))
    navigation('/')
  }

  const firstLetter = getFirstLetter(data?.email)

  return (
    <div
      className='absolute bg-white h-72 w-72 top-10 right-3 shadow-lg border border-gray-100 border rounded flex flex-col items-center'
    >
      {
        isLoading
          ? (
            <div className='flex items-center justify-center'><CircularProgress /></div>
          )
          : (
            <>
              <div
                className='ml-auto mr-auto mt-3 rounded-full bg-emerald-600 w-16 h-16 flex items-center justify-center text-white'
              >{firstLetter}</div>

              <p className='mt-2'>{data.name}</p>

              <p className='text-gray-400'>{data.email}</p>

              <Link
                to='/profile'
                onClick={handleChangeToolTip}
                className='border border-gray-300 pl-5 pr-5 pt-2 pb-2 mt-5 rounded-3xl hover:bg-gray-100'
              >
                Управление аккаунтом
              </Link>

              <div
                className='h-px w-full bg-gray-300 mt-8'
              />

              <button
                className='hover:bg-gray-100 pt-2 pb-2 pl-5 pr-5 border border-gray-300 rounded mt-2'
                onClick={handleLogout}
              >
                Выйти
              </button>
            </>
          )}
    </div>
  )
}

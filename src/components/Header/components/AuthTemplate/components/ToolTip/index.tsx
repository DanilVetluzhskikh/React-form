import React, { FC } from 'react'
import { useAppDispatch } from '@store/index'
import { LogoutService } from '@services/auth/logout'
import { setUserAuth } from '@store/slices'
import { useNavigate } from 'react-router-dom'

export const ToolTip: FC = () => {
  const navigation = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    await LogoutService()
    dispatch(setUserAuth(false))
    navigation('/')
  }

  return (
    <div
      className='absolute bg-white h-72 w-72 top-10 right-3 shadow-lg border border-gray-100 border rounded flex flex-col items-center'
    >
      <div
        className='ml-auto mr-auto mt-3 rounded-full bg-emerald-600 w-16 h-16 flex items-center justify-center text-white'
      >L</div>

      <p className='mt-2'>Danil</p>

      <p>vetlzdanilvv@gmail.com</p>

      <button
        className='border border-gray-300 pl-5 pr-5 pt-2 pb-2 mt-5 rounded-3xl hover:bg-gray-100'
      >
          Управление аккаунтом
      </button>

      <div
        className='h-px w-full bg-gray-300 mt-8'
      />

      <button
        className='hover:bg-gray-100 pt-2 pb-2 pl-5 pr-5 border border-gray-300 rounded mt-2'
        onClick={handleLogout}
      >
          Выйти
      </button>
    </div>
  )
}

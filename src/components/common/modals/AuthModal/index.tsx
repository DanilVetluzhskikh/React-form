import React, { FC } from 'react'
import {
  LoginForm,
  RegisterForm
} from './components'

import CloseIcon from '@mui/icons-material/Close'

interface AuthModalProps {
  register: boolean;
  show: boolean;
  handleClose: () => void;
  handleChangeRegister: () => void;
}

export const AuthModal: FC<AuthModalProps> = ({
  register,
  show,
  handleClose,
  handleChangeRegister
}) => {

  if(!show){
    return null
  }

  return (
    <div className='absolute z-10 bg-black/[.5] top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
      <div className='relative pl-20 pr-20 pt-10 pb-10 bg-white rounded-lg flex items-center flex-col'>
        <button
          onClick={handleClose}
          className='absolute right-3 top-3'
        >
          <CloseIcon />
        </button>

        {register ? <LoginForm /> : <RegisterForm />}

        <div className='flex mt-5 gap-2'>
          <span>{register ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}</span>
          <button
            className='text-blue-900'
            onClick={handleChangeRegister}
          >
            {register ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  )
}

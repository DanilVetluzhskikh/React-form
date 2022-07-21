import React, { FC } from 'react'
import {
  LoginForm,
  RegisterForm
} from './components'

import { ModalContainer } from '@components/UI/containers'

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
    <ModalContainer handleClose={handleClose}>
      {register
        ? <LoginForm handleClose={handleClose} />
        : <RegisterForm handleChangeRegister={handleChangeRegister} />
      }

      <div className='flex mt-5 gap-2'>
        <span>{register ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}</span>
        <button
          className='text-blue-900'
          onClick={handleChangeRegister}
        >
          {register ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </div>
    </ModalContainer>
  )
}

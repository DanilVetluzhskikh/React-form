import React, {
  FC,
  useState
} from 'react'
import {
  SubmitHandler,
  useForm
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material'
import * as yup from 'yup'
import { LoginService } from '@services/auth/login'
import { useAppDispatch } from '@store/index'
import { setUserAuth } from '@store/slices'

interface Form {
    email: string;
    password: string;
}

interface LoginFormProps {
    handleClose: () => void
}

const schema = yup.object().shape({
  email: yup.string().email('Некорректная почта').required('Введите почту'),
  password: yup.string().required('Введите пароль')
})

export const LoginForm: FC<LoginFormProps> = ({ handleClose }) => {
  const [ access, setAccess ] = useState('')
  const [ error, setError ] = useState('')
  const {
    register, handleSubmit, formState: { errors }
  } = useForm<Form>({ resolver: yupResolver(schema) })

  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<Form> = async ({
    email, password
  }) => {
    setAccess('')
    setError('')
    const data = await LoginService(email, password)

    if(data.error){
      return setError(data.error)
    }

    setAccess(data.message)
    setTimeout(() => {
      handleClose()
      dispatch(setUserAuth(true))
    }, 500)
  }

  return (
    <>
      <h5 className='text-4xl'>Вход</h5>
      <div className='w-72 flex gap-5 flex-col mt-5'>
        <TextField
          {...register('email')}
          helperText={errors.email && errors.email.message}
          error={!!errors.email}
          label='Почта'
          type='email'
          variant='standard'
          fullWidth
        />

        <TextField
          {...register('password')}
          helperText={errors.password && errors.password.message}
          error={!!errors.password}
          label='Пароль'
          type='password'
          variant='standard'
          fullWidth
        />
      </div>

      <button
        className='border border-blue-500 text-blue-500 py-2 px-5 rounded mt-5'
        onClick={handleSubmit(onSubmit)}
      >
          Войти
      </button>

      <div className='mt-2'>
        {access && <span className='text-green-500'>{access}</span>}
        {error && <span className='text-red-500'>{error}</span>}
      </div>
    </>
  )
}

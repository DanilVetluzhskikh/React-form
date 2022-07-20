import React, { FC } from 'react'
import {
  SubmitHandler,
  useForm
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material'
import * as yup from 'yup'

interface Form {
    email: string;
    password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Некорректная почта').required('Введите почту'),
  password: yup.string().required('Введите пароль')
})

export const LoginForm: FC = () => {
  const {
    register, handleSubmit, formState: { errors }
  } = useForm<Form>({ resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<Form> = data => console.log(data)

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
    </>
  )
}

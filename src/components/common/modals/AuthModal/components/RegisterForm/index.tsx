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
import { RegisterService } from '@services/auth/register'
import * as yup from 'yup'

interface Form {
    email: string;
    password: string;
    repeatPassword: string;
}

interface RegisterFormProps {
    handleChangeRegister: () => void
}

const schema = yup.object().shape({
  email: yup.string().email('Некорректная почта').required('Введите почту'),
  password: yup.string().min(8, 'Пароль не должен быть меньше 8 символов').max(32, 'Пароль должен быть больше 32 символов').required('Введите пароль'),
  repeatPassword: yup.string()
    .oneOf([ yup.ref('password'), null ], 'Пароли не совпадают')
})

export const RegisterForm: FC<RegisterFormProps> = ({ handleChangeRegister }) => {
  const [ error, setError ] = useState('')
  const [ access, setAccess ] = useState('')
  const {
    register, handleSubmit, formState: { errors }
  } = useForm<Form>({ resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<Form> = async ({
    email,
    password
  }) => {
    setAccess('')
    setError('')

    const data = await RegisterService(email, password)

    if(data.error){
      return setError(data.error)
    }

    setAccess(data.message)
    setTimeout(() => {
      handleChangeRegister()
    }, 500)
  }

  return (
    <>
      <h5 className='text-4xl'>Регистрация</h5>
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

        <TextField
          {...register('repeatPassword')}
          helperText={errors.repeatPassword && errors.repeatPassword.message}
          error={!!errors.repeatPassword}
          label='Подтверждение пароля'
          type='password'
          variant='standard'
          fullWidth
        />
      </div>

      <button
        className='border border-blue-500 text-blue-500 py-2 px-5 rounded mt-5'
        onClick={handleSubmit(onSubmit)}
      >
          Зарегистрироваться
      </button>

      {access && <span className='text-green-500'>{access}</span>}
      {error && <span className='text-red-500'>{error}</span>}
    </>
  )
}

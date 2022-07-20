import React, { FC } from 'react'
import {
  AuthTemplate,
  LoginTemplate
} from './components'

export const Header: FC = () => {
  const auth = true

  return (
    <div className='h-24 bg-white shadow-md pl-5 pr-5 pt-5 flex justify-between'>
      {auth ? <AuthTemplate /> : <LoginTemplate />}
    </div>
  )
}

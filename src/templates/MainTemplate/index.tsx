import React, { FC } from 'react'
import { Header } from '@components/Header'

interface MainTemplateProps {
    children: React.ReactNode
}

export const MainTemplate: FC<MainTemplateProps> = ({ children }) => (
  <div className='h-screen w-screen bg-fuchsia-50'>
    <Header />
    <div className='pl-5 pr-5'>
      {children}
    </div>
  </div>
)

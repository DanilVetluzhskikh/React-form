import React, {
  FC,
  useState
} from 'react'
import { AuthModal } from '@components/UI/modals/AuthModal'

export const LoginTemplate: FC = () => {
  const [ isShowModal, setIsShowModal ] = useState(false)
  const [ isRegister, setIsRegister ] = useState(false)

  const handleCloseModal = () => setIsShowModal(false)

  const handleOpenModal = (register: boolean) => {
    setIsRegister(register)
    setIsShowModal(true)
  }

  const handleChangeRegister = () => setIsRegister((prev) => !prev)

  return (
    <>
      <div className='flex h-10 items-center gap-2 ml-auto'>
        <button
          className='py-2 px-5 bg-purple-600 text-white hover:bg-purple-500'
          onClick={() => handleOpenModal(false)}
        >
          Регистрация
        </button>

        <button
          className='py-2 px-5 bg-purple-600 text-white hover:bg-purple-500'
          onClick={() => handleOpenModal(true)}
        >
          Войти
        </button>

        <AuthModal
          show={isShowModal}
          handleClose={handleCloseModal}
          register={isRegister}
          handleChangeRegister={handleChangeRegister}
        />
      </div>
    </>
  )
}

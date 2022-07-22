import React, {
  FC,
  useEffect,
  useState
} from 'react'
import { ChangedInput } from '@components/common'
import {
  UserType,
  getUserDataService
} from '@services/user/getUserData'
import { CircularProgress } from '@mui/material'
import { getFirstLetter } from '@utils/line/firstLetter'
import { Link } from 'react-router-dom'

const emailValidator = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')

export const Profile: FC = () => {
  const {
    isLoading,
    data,
    error
  } = getUserDataService.useFetchDataUserQuery('')
  const [ updateData, {
    data: dataUpdate,
    isLoading: isLoadingUpdate
  } ] = getUserDataService.useUpdateDataMutation()

  const [ isSave, setIsSave ] = useState(false)
  const [ changeData, setChangeData ] = useState<UserType>(data)

  const handleSave = (name: string, value: string) => {
    setChangeData((prev) => ({
      ...prev,
      [name]: value
    }))
    setIsSave(true)
  }

  const handleChangeData = () => {
    setIsSave(false)
    updateData({
      email: changeData.email,
      name: changeData.name
    })
  }

  useEffect(() => {
    setChangeData(data)
  }, [ data ])

  if(isLoading || isLoadingUpdate){
    return <div className='flex flex-1 align-center justify-center'>
      <CircularProgress />
    </div>
  }

  if(error){
    return <span className='flex items-center justify-center text-red-500'>Ошибка получения данных</span>
  }

  const firstLetter = getFirstLetter(data?.email)

  return (
    <div className='mt-5 flex flex-col'>
      <div
        className='w-72 h-72 bg-emerald-600 rounded-full flex items-center justify-center text-white text-4xl ml-auto mr-auto'
      >{firstLetter}</div>

      <div className='flex justify-between mt-5'>
        <div className='bg-white flex-1 border flex-col flex'>
          <ChangedInput
            value={changeData?.email}
            name='email'
            handleSave={handleSave}
            maxLength={40}
            validate={emailValidator}
            textError='Некорректная почта'
          />

          <ChangedInput
            value={changeData?.name}
            name='name'
            handleSave={handleSave}
            maxLength={20}
          />
        </div>
      </div>

      <div className='flex-1 flex gap-2 mt-5'>
        <Link
          to='/'
          className='bg-blue-400 rounded-2xl pt-5 pb-5 text-2xl text-white flex-1 text-center'
        >Мои тесты</Link>
        <Link
          to='/create'
          className='bg-red-400 rounded-2xl pt-5 pb-5 text-2xl text-white flex-1 text-center'
        >Создать тест</Link>
      </div>

      {isSave && (
        <button
          className='bg-green-400 rounded-2xl pt-5 pb-5 text-2xl text-white flex-1 mt-5'
          onClick={handleChangeData}
        >Применить изменения</button>
      )}

      {dataUpdate && <span className='text-green-500 text-center mt-5 text-xl'>{dataUpdate.message}</span>}
    </div>
  )
}

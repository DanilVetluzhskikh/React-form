import React, {
  FC,
  useState
} from 'react'
import { TextField } from '@mui/material'

interface ChangedInputProps {
    value: string;
    handleSave: (name: string, value: string) => void,
    name: string;
    maxLength?: number;
    validate?: RegExp;
    textError?: string;
}

export const ChangedInput: FC<ChangedInputProps> = ({
  value,
  handleSave,
  name,
  maxLength,
  validate,
  textError
}) => {
  const [ inputValue, setInputValue ] = useState('')
  const [ isChange, setIsChange ] = useState(false)
  const [ error, setError ] = useState('')

  const handleStartChange = () => {
    setInputValue(value)
    setIsChange((prev) => !prev)
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSaveData = () => {
    setError('')

    if(validate){
      if(!validate.test(inputValue)){
        return setError(textError ?? 'Ошибка валидации')
      }
    }

    handleSave(name, inputValue)
    handleStartChange()
  }

  return (
    <div
      className='text-2xl p-5 flex-1 border-b flex items-center justify-between'
    >
      {isChange ? (
        <>
          <TextField
            value={inputValue}
            variant='standard'
            onChange={handleChangeInput}
            placeholder='Введите данные'
            required
            fullWidth
            inputProps={{ maxLength }}
            helperText={error}
            error={!!error.length}
          />
          <button
            className='border bg-emerald-600 p-2 text-white rounded ml-5'
            onClick={handleSaveData}
          >Сохранить</button>
        </>
      )
        : (
          <>
            <span>{name}: {value && value.length ? value : 'Не указано'}</span>
            <button
              className='border bg-white p-2 text-emerald-600 rounded'
              onClick={handleStartChange}
            >Изменить</button>
          </>
        )}
    </div>
  )
}

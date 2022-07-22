import React, {
  FC,
  useState
} from 'react'
import { ToolTip } from './components'

import Logo from '@assets/svg/logo.svg'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import { Link } from 'react-router-dom'

export const AuthTemplate: FC = () => {
  const [ isFavorite, setIsFavorite ] = useState(false)
  const [ isOpen, setIsOpen ] = useState(false)

  const handleChangeFavorite = () => setIsFavorite((prev) => !prev)
  const handleChangeToolTip = () => setIsOpen((prev) => !prev)

  return (
    <>
      <div className='flex h-10 items-center'>
        <Link to='/'>
          <img
            className='w-10 h-10'
            src={Logo}
            alt='logo'
          />
        </Link>

        <h4 className='text-lg ml-5'>React Form</h4>

        {/*<button className='ml-2' onClick={handleChangeFavorite}>*/}
        {/*  {isFavorite ? <StarOutlinedIcon/> : <StarBorderIcon/>}*/}
        {/*</button>*/}
      </div>

      <div className='flex h-10 items-center gap-2 relative'>
        <button
          onClick={handleChangeToolTip}
        >
          <PermIdentityOutlinedIcon color='primary' fontSize='large' />
        </button>

        {isOpen && (<ToolTip handleChangeToolTip={handleChangeToolTip} />)}
      </div>
    </>
  )
}

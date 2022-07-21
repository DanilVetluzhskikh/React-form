import React, { FC } from 'react'
import CloseIcon from '@mui/icons-material/Close'

interface ModalContainer {
    handleClose: () => void;
    children: React.ReactNode
}

export const ModalContainer: FC<ModalContainer> = ({
  handleClose,
  children
}) => (
  <div className='absolute z-10 bg-black/[.5] top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
    <div className='relative pl-20 pr-20 pt-10 pb-10 bg-white rounded-lg flex items-center flex-col'>
      <button
        onClick={handleClose}
        className='absolute right-3 top-3'
      >
        <CloseIcon />
      </button>

      {children}
    </div>
  </div>
)

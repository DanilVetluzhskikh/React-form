import React, {
  FC,
  useEffect
} from 'react'
import {
  useAppDispatch, useAppSelector
} from '@store/index'
import {
  getUserAuth,
  setUserAuth
} from '@store/slices'
import { getCookie } from '@utils/cookie'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router-dom'
import {
  navigationRoutes,
  navigationSecureRoutes
} from '@navigation/index'
import { MainTemplate } from '@templates/index'

const token = getCookie('token')
const userId = getCookie('userId')

export const AppInit: FC = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(getUserAuth)

  useEffect(() => {
    if(token && userId){
      dispatch(setUserAuth(true))
    }
  }, [])

  const renderRoutes = () => {
    const resultRoutes = [ ...navigationRoutes ]

    if(auth){
      resultRoutes.push(...navigationSecureRoutes)
    }

    return resultRoutes.map((item, index) => (
      <Route
        key={`${item.path}__${index}`}
        path={item.path}
        element={<item.component />}
      />
    ))
  }

  return (
    <BrowserRouter>
      <MainTemplate>
        <Routes>
          {renderRoutes()}
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </MainTemplate>
    </BrowserRouter>
  )
}

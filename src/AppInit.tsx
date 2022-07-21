import React, {
  FC,
  useCallback,
  useEffect
} from 'react'
import { useAppDispatch } from '@store/index'
import { setUserAuth } from '@store/slices'
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

export const AppInit: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(getCookie('token')){
      dispatch(setUserAuth(true))
    }
  }, [])

  const renderRoutes = useCallback(() => {
    const resultRoutes = [ ...navigationRoutes ]

    if(getCookie('token')){
      resultRoutes.push(...navigationSecureRoutes)
    }

    return resultRoutes.map((item, index) => (
      <Route
        key={`${item.path}__${index}`}
        path={item.path}
        element={<item.component />}
      />
    ))
  }, [])

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

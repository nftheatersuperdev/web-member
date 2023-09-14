import React from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { Box, CircularProgress } from '@material-ui/core'
import { Toaster } from 'react-hot-toast'
import { routes, ROUTE_PATHS } from './routes'
import LayoutRoute from './layout/LayoutRoute'
import ValidateToken from './components/ValidateToken'

function App(): JSX.Element {
  return (
    <React.Suspense
      fallback={
        <Box
          height="100vh"
          width="100vw"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      }
    >
      <Router>
        <Toaster />
        <ValidateToken />
        <Switch>
          {routes.map(({ exact, path, component, isPublic }) => (
            <LayoutRoute
              key={path}
              exact={exact}
              path={path}
              component={component}
              isPublic={isPublic}
            />
          ))}
          <Redirect to={ROUTE_PATHS.NOT_FOUND} />
        </Switch>
      </Router>
    </React.Suspense>
  )
}

export default App

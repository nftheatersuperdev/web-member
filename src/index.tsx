import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'
import { StylesProvider, CssBaseline } from '@material-ui/core'
import { QueryClient, QueryClientProvider } from 'react-query'
import theme from 'theme'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { LiffProvider } from 'react-liff'
import App from './App'
import config from './config'

// Ensure that internationalization is bundled into app
import './i18n'

const queryClient = new QueryClient()

if (config.isProductionEnvironment) {
  // eslint-disable-next-line
  console.info('[Application] Running in production mode.')
  Sentry.init({
    dsn: config.sentry.dsn,
    release: `${config.appName}@${config.appVersion}`,
    integrations: [new Integrations.BrowserTracing()],
    environment: config.sentry.environment,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  })
} else {
  // eslint-disable-next-line
  console.info('[Application] Running in development mode.')
}

const liffId = config.liffId

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme()}>
        <ThemeProvider theme={theme()}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <LiffProvider liffId={liffId}>
              <App />
            </LiffProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

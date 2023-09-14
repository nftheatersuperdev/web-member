import React, { useEffect } from 'react'
import { THEMES } from 'theme-constants'

const initialState = {
  theme: THEMES.DEFAULT,
  setTheme: (_theme: string) => {},
}
const ThemeContext = React.createContext(initialState)

interface ThemeProviderProps {
  children: React.ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, _setTheme] = React.useState<string>(initialState.theme)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')

    if (storedTheme) {
      _setTheme(JSON.parse(storedTheme))
    }
  }, [])

  const setTheme = (theme: string) => {
    localStorage.setItem('theme', JSON.stringify(theme))
    _setTheme(theme)
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export { ThemeProvider, ThemeContext }

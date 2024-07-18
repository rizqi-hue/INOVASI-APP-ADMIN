import { useEffect } from 'react'
import useCurrentTheme from './components/themes/useCurrentTheme'

const useChangeThemeColor = () => {
  const theme = useCurrentTheme()
  const color = theme.palette?.primary?.light || theme.palette?.primary?.main || '#ffffff'
  useEffect(() => {

    const themeColor = document.querySelector("meta[name='theme-color']")
    if (themeColor) {
      themeColor.setAttribute('content', color)
    }
  }, [color])
}

export default useChangeThemeColor

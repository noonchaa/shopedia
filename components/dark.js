import { useEffect, useState } from "react"

const Dark = () => {
    const [theme, setTheme] = useState('light')
    const colorTheme = theme==='light'?'dark':'light'

    useEffect(()=>{
        const root = window.document.documentElement
        root.classList.remove(colorTheme)
        root.classList.add(theme)
    },[colorTheme,theme])

    return [colorTheme, setTheme]
}
export default Dark
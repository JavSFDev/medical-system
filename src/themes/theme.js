import { teal, orange } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
    palette: {
        mode: 'light',
        primary: teal,
        secondary: orange
    }
})
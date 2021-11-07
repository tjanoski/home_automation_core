import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import {makeStyles} from '@mui/styles'
import { blue, red, grey } from '@mui/material/colors'

import Pomodoro from "../widgets/pomodoro";
// @ts-ignore
const theme = createTheme({
    palette: {
        primary: {
            main: red["A400"]
        },
        secondary: {
            main: blue["A200"]
        },
        info: {
            main: grey[50]
        }
    }
})

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    pomodoroContainer: {
        width: '70%',
        height: '100%',
    },
    todoContainer: {
        width: '30%',
        height: '100%',
        backgroundColor: 'black'
    }
})

const Focus = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <div className={classes.pomodoroContainer}>
                    <Pomodoro circle_size={800} font_size={128} max_time={10} />
                </div>
                <div className={classes.todoContainer}>
                </div>
            </div>
        </ThemeProvider>
)
}

export default Focus
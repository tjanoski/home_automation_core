import { makeStyles } from '@mui/styles'
import { Theme, useTheme } from "@mui/material/styles";
import {CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import IconButton from '@mui/material/IconButton'
import PlayCircleIcon from '@mui/icons-material/PlayCircleFilled'
import PauseCircleIcon from '@mui/icons-material/PauseCircleFilled'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import ReplayIcon from '@mui/icons-material/Replay'

const useStyles = (theme: Theme) => makeStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.dark
    },
    circleProgress: {
        position: 'absolute',
        zIndex: 1
    },
    circleInner: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',
        backgroundColor: theme.palette.primary.light,
    },
    circleInnerText: {
        color: theme.palette.info.main
    },
    buttonContainer: {
        position: 'absolute',
        display: 'flex',
        zIndex: 2
    },
    button: {
        margin: '10px',
        padding: '0px'
    }
})

interface displayTime {
    minutes: number;
    seconds: number;
}

interface IProps {
    circle_size: number;
    font_size: number;
    max_time: number;
}
const Pomodoro = (props: IProps) => {
    const { circle_size, font_size, max_time } = props
    const theme = useTheme();
    const classes = useStyles(theme).call(theme);
    const [currentTime, setCurrentTime] = useState<displayTime>({minutes: max_time, seconds: 0})
    const [percent, setPercent] = useState<number>(100)
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const countDown = () => {
        calculatePercent()
        if(currentTime.minutes <= 0 && currentTime.seconds <= 1)
            pause()

        if(currentTime.seconds < 1){
            console.log(currentTime.seconds)
            setCurrentTime(prevState => ({minutes: prevState.minutes - 1, seconds: 59}))
        } else {
            setCurrentTime(prevState => ({minutes: prevState.minutes, seconds: prevState.seconds - 1}))
        }
    }

    useEffect(() => {
        let timer : NodeJS.Timeout;
        if(isPlaying){
            timer = setTimeout(() => {
                countDown()
            }, 1000)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [currentTime, isPlaying])

    const displayTime = () => {
        const extraZero = currentTime.seconds < 10 ? '0' : ''
        return `${currentTime.minutes}:${extraZero}${currentTime.seconds}`
    }

    const calculatePercent = () => {
        console.log(percent)
        setPercent((((currentTime.minutes * 60) + currentTime.seconds) / (max_time * 60)) * 100)
    }

    const play = () => {
        if(currentTime.minutes === 0 && currentTime.seconds === 0){
            calculatePercent()
            setCurrentTime({minutes: max_time, seconds: 0})
        }
        setIsPlaying(true)
    }

    const pause = () => {
        setIsPlaying(false)
    }

    const rewind = () => {
        setCurrentTime({minutes: max_time, seconds: 0})
        setPercent(100)
    }

    const zero = () => {
        setIsPlaying(false)
        setCurrentTime({minutes: 0, seconds: 0})
        setPercent(0)
    }

    return (
        <div className={classes.root}>
            <CircularProgress className={classes.circleProgress} size={circle_size} color="secondary" value={percent} thickness={1} variant="determinate" />
            <div className={classes.circleInner} style={{width: circle_size, height: circle_size}} >
                <div className={classes.circleInnerText} style={{fontSize: font_size * 1.5}}>
                    {displayTime()}
                </div>
                <div className={classes.buttonContainer} style={{bottom: font_size}}>
                    <IconButton style={{visibility: isPlaying ? 'hidden' : 'visible', fontSize: font_size}} onClick={rewind}  className={classes.button}>
                        <ReplayIcon fontSize="inherit"/>
                    </IconButton>
                    {isPlaying === false
                        ?
                        <IconButton onClick={play} className={classes.button} style={{fontSize: font_size}}>
                            <PlayCircleIcon fontSize="inherit" />
                        </IconButton>
                        :
                        <IconButton onClick={pause} className={classes.button} style={{fontSize: font_size}}>
                            <PauseCircleIcon fontSize="inherit" />
                        </IconButton>
                    }
                    <IconButton style={{visibility: isPlaying ? 'hidden' : 'visible', fontSize: font_size}} onClick={zero} className={classes.button}>
                        <SkipNextIcon fontSize="inherit" />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Pomodoro
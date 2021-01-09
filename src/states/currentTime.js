import moment from 'moment-timezone'

import { useEffect } from 'react'
import { atom, useSetRecoilState } from 'recoil'

export const getJPMoment = () => {
    const currentJPMoment = moment().tz('Asia/Tokyo')

    const currentSecond = moment.duration(currentJPMoment.format('HH:mm')).asSeconds()

    const currentDayNumber = currentJPMoment.day()
    const currentDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][currentDayNumber]
    
    return {
      currentJPMoment,
      currentSecond,
      currentDay,
      currentDayNumber
    }
}

export const currentSecondState = atom({
    key: 'currentSecondState',
    default: getJPMoment().currentSecond
})

export const currentDayState = atom({
    key: 'currentDayState',
    default: getJPMoment().currentDay
})

export const RefreshCurrentTimeComponent = () => {
    const setSecondState = useSetRecoilState(currentSecondState)
    const setDayState = useSetRecoilState(currentSecondState)

    const refreshTimes = () => {
        const { currentSecond, currentDay } = getJPMoment()

        setSecondState(currentSecond)
        setDayState(currentDay)
    }

    useEffect(() => {
        const interval = setInterval(refreshTimes, 1000 * 10)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return null
}
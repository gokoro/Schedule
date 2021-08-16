import * as React from 'react'
import { useRecoilValue } from 'recoil'
import { currentDayState } from '../states/currentTime'
import { LocaleMessageState } from '../states/preferredLanguage'
import ClassNameAsPathLink from './ClassNameAsPathLink'

const HeaderLinks = ({ isDisplayColor }) => {
  const {
    common: { day: dayLocaleSet },
  } = useRecoilValue(LocaleMessageState)

  return (
    <div className="wrapper">
      <DayLink
        text={dayLocaleSet.sun}
        isDisplayColor={isDisplayColor}
        value="sun"
      />
      <DayLink
        text={dayLocaleSet.mon}
        isDisplayColor={isDisplayColor}
        value="mon"
      />
      <DayLink
        text={dayLocaleSet.tue}
        isDisplayColor={isDisplayColor}
        value="tue"
      />
      <DayLink
        text={dayLocaleSet.wed}
        isDisplayColor={isDisplayColor}
        value="wed"
      />
      <DayLink
        text={dayLocaleSet.thu}
        isDisplayColor={isDisplayColor}
        value="thu"
      />
      <DayLink
        text={dayLocaleSet.fri}
        isDisplayColor={isDisplayColor}
        value="fri"
      />
      <DayLink
        text={dayLocaleSet.sat}
        isDisplayColor={isDisplayColor}
        value="sat"
      />
      <style jsx>{`
        .wrapper {
          width: 100%;
          display: flex;
        }
      `}</style>
    </div>
  )
}
const DayLink = ({ value, text, isDisplayColor }) => {
  const {
    components: { header: dayLocaleSet },
  } = useRecoilValue(LocaleMessageState)
  const currentDay = useRecoilValue(currentDayState)

  const isTodayActive = currentDay === value

  return (
    <>
      <ClassNameAsPathLink
        activeClassName="active"
        href="/[day]"
        as={`/${value}`}
      >
        <a>
          {isTodayActive && <div className="now">{dayLocaleSet.now}</div>}
          <div className={`today${isTodayActive ? ' nowActive' : ''}`}>
            {text}
          </div>
        </a>
      </ClassNameAsPathLink>
      <style jsx>{`
        a {
          flex: 1;
          display: inline-block;
          position: relative;
          cursor: pointer;
          font-size: 15px;
          transition: all 0.05s ease-in;
          outline: 0;
          text-align: center;
          padding: 12px 0;
          height: fit-content;
          letter-spacing: 0;
          color: ${!isDisplayColor ? '#FFF ' : 'var(--sub-text-color);'};
          border-bottom: 2px solid transparent;
        }
        .now {
          position: absolute;
          width: 100%;
          font-size: 10px;
          left: 0;
          top: -3px;
          display: initial;
          font-weight: bold;
          color: ${!isDisplayColor ? '#FFF ' : '#000000'};
        }
        .nowActive {
          font-weight: bold;
          color: ${!isDisplayColor ? '#FFF ' : '#000000'};
        }
        .active {
          border-bottom: 2px solid #6c5ce7;
          color: ${!isDisplayColor ? '#FFF ' : '#6c5ce7'};
          font-weight: bold;
        }
        .active .nowActive {
          color: ${!isDisplayColor ? '#FFF ' : '#6c5ce7'};
        }
      `}</style>
    </>
  )
}

export default HeaderLinks

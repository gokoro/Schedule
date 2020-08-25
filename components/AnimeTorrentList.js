import Placeholder from './Placeholder'
import ShadowWhiteBox from './ShadowWhiteBox'

import LanguageContext from '../context/LanguageContext'

import { useAnime } from '../hooks/useAnime'
import { useContext } from 'react'

const AnimeTorrentList = props => {
    const res = useAnime(props.animeId)
    const lang = useContext(LanguageContext.Original)
    const { locale } = lang

    let data = null

    if (!res.isLoading) {
        data = res.data.data
    }

    return (
        <ShadowWhiteBox className="animetorrentlist">
            <div className="header bold size-18">{locale.components.animeTorrentList.torrentList}</div>
            <div className="container">
                {res.isLoading ? 
                    <Placeholder lineCountFor={18}/> : <>
                    {[...data.items].reverse().map(item => (
                        <AnimeTorrentListItem 
                            key={item._id}
                            name={data.title[lang.lang]}
                            romajiName={data.name}
                            episode={item.episode}
                            resolution={item.resolution}
                            audioFormat={item.audioFormat}
                            videoFormat={item.videoFormat}
                            broadcaster={item.broadcaster}
                            original={item.original}
                            torrentLink={item.link}
                            created_at={item.created_at}
                        />
                    ))
                    }
                    </>
                }
            </div>
            <style jsx>{`
                :global(.animetorrentlist) > .header {
                    margin-bottom: 16px;
                }
            `}</style>
        </ShadowWhiteBox>
    )
}
const AnimeTorrentListItem = props => {
    return (
        <div className="item">
            <div className="left sec">
                    <img src="/svg/file-icon.svg" alt=""/>
            </div>
            <div className="main sec">
                <a className="torrent bold" href={props.torrentLink}>{props.name} - {props.episode}</a>
                <div className="info">
                    {props.resolution} {props.audioFormat} {props.videoFormat} {props.broadcaster} 
                </div>
            </div>
            <style jsx>{`
                .item {
                    display: flex;
                    margin: 8px 0;
                }
                .item .left.sec {
                    flex: 0 0 none;
                }
                .item .main.sec {
                    margin-left: 8px;
                    line-height: 125%;
                }
                .item .main.sec a.torrent {
                    color: var(--file-link-color);
                    font-size: 14px;
                    letter-spacing: 0.1px;
                }
                .item .main.sec a.torrent:hover {
                    color: var(--file-link-hover-color);
                }
                .item .main.sec .info {
                    font-size: 14px;
                    letter-spacing: 0;
                }
            `}</style>
        </div>
    )
}
export default AnimeTorrentList
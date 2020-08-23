import Placeholder from './Placeholder'
import ShadowWhiteBox from './ShadowWhiteBox'

import { useAnime } from '../hooks/useAnime'

const AnimeTorrentOtherLink = props => {
    const res = useAnime(props.animeId)
    const data = res.data

    return (
        <ShadowWhiteBox className="anime-torrent-other-link">
            <div className="header bold size-18">External Links</div>
            <div className="content">
                {res.isLoading ? <Placeholder lineCountFor={2}/> : 
                <div className="links">
                    <ExternalLinkItem text="Fanmade" href={`https://ohys.seia.io/series/${data.data.name}`} />
                    <ExternalLinkItem text="Mirror" href={`https://cryental.dev/services/anime/?search=${data.data.name}`} />
                    <ExternalLinkItem text="Nyaa" href={`https://nyaa.si/user/ohys?f=0&c=0_0&q=${data.data.name}`} />
                </div>
                }
            </div>
            <style jsx>{`
                .header {
                    margin-bottom: 24px;
                }
            `}</style>
        </ShadowWhiteBox>
    )
}
const ExternalLinkItem = props => {
    return (
        <a target="_blank" rel="noopener noreferrer" className="rounded bold item" href={props.href}>
            {props.text}
            <style jsx>{`
                .item {
                    font-size: 15px;
                    padding: 8px 16px;
                    background-color: #e0e1e2;
                    color: rgba(0,0,0,.6);
                    margin-right: 10px;
                    transition: background-color 0.1s;
                }
                .item:hover {
                    background-color: #cacbcd;
                }
            `}</style>
        </a>
    )
}
export default AnimeTorrentOtherLink
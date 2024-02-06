import Popup from "reactjs-popup";
import ReactPlayer from 'react-player'
import 'reactjs-popup/dist/index.css'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import {
    PopupContainer,
    WatchButton,
    VideoPlayerContainer,
    CloseButton,
    CloseIcon,
    VideoPlayer
} from './styledComponents'

const ReactPopUp = (props) => {
    const { videoId } = props
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`

    return (
        <PopupContainer>
            <Popup modal
                trigger={
                    <WatchButton type="button" > <TbPlayerPlayFilled /></WatchButton>
                }
            >
                {close => (
                    <VideoPlayerContainer className="popup-content">
                        <CloseButton
                            type="button"
                            onClick={() => close()}
                        >
                            <CloseIcon />
                        </CloseButton>
                        <VideoPlayer>
                            <ReactPlayer url={videoUrl} controls  origin= 'http://localhost:3000' />
                        </VideoPlayer>
                    </VideoPlayerContainer>
                )}
            </Popup>
        </PopupContainer>
    )
}
export default ReactPopUp
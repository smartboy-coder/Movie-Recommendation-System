import Popup from "reactjs-popup";
import ReactPlayer from 'react-player'
import 'reactjs-popup/dist/index.css'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import {AiFillCloseCircle} from 'react-icons/ai'

const ReactPopUp = (props) => {
    const { videoId } = props
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`

    return (
        <div>
            <Popup
                modal
                trigger={
                    <button
                        type="button"
                        className="flex justify-center items-center text-black bg-blue-200 hover:bg-blue-300 rounded-full text-[30px] p-2 border-none outline-none cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-aqua"
                    >
                        <TbPlayerPlayFilled />
                    </button>
                }
            >
                {(close) => (
                    <div className="flex flex-col items-center popup-content">
                        <button
                            type="button"
                            onClick={() => close()}
                            className="flex justify-center items-center mb-2.5 bg-transparent border-none rounded-md text-[25px] cursor-pointer"
                        >
                            <AiFillCloseCircle
                                className="text-white text-[40px] animate-[translateY_1s_ease-in-out]"
                            />
                        </button>
                        <div className="border border-white w-fit">
                            <ReactPlayer url={videoUrl} controls origin="http://localhost:3000" />
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    )
}
export default ReactPopUp
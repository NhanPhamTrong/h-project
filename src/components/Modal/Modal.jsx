import { useState } from "react"
import "./Modal.scss"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"

import endOfALife from "../../assets/musics/MoriCalliope/[MV]_end_of_a_life_-_Calliope_Mori_(Original_Song).mp3"

export const Modal = (props) => {
    const musicTracks = [
        // {
        //     name: "Memories",
        //     src: "https://www.bensound.com/bensound-music/bensound-memories.mp3"
        // },
        // {
        //     name: "Creative Minds",
        //     src: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3"
        // },
        {
            name: "Acoustic Breeze",
            src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3"
        },
        {
            name: "End of a life",
            src: endOfALife
        }
    ];

    const [trackIndex, setTrackIndex] = useState(0);

    const ClickPrevious = () => {
        setTrackIndex((currentTrack) =>
            currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
        );
    };

    const ClickNext = () => {
        setTrackIndex((currentTrack) =>
            currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0
        );
    };

    const CloseModal = () => {
        // props.CloseModal()
    }

    const GetListItem = (e) => {
        setTrackIndex(parseInt(e.target.getAttribute("order")))
    }

    return (
        <div id="modal">
            <div className="modal-background" onClick={CloseModal}></div>
            <div className="modal-container">
                <div className="header">
                    <h1>ABC</h1>
                    <button type="button" onClick={CloseModal}>
                        <ion-icon name="close-circle"></ion-icon>
                    </button>
                </div>
                <div className="play-section">
                    <AudioPlayer
                        style={{ borderRadius: "1rem" }}
                        autoPlay
                        src={musicTracks[trackIndex].src}
                        onPlay={(e) => console.log("onPlay")}
                        showSkipControls={true}
                        showJumpControls={false}
                        header={`Now playing: ${musicTracks[trackIndex].name}`}
                        onClickPrevious={ClickPrevious}
                        onClickNext={ClickNext}
                        onEnded={ClickNext}
                    />
                </div>
                <ul>
                    {musicTracks.map((item, index) => {
                        return (
                            <li key={index}>
                                <button className="name" type="button" onClick={GetListItem} order={index}>{item.name}</button>
                                <div className="item-menu">
                                    <button className="item-menu-toggler" type="button">
                                        <ion-icon name="ellipsis-horizontal"></ion-icon>
                                    </button>
                                    <div className={"item-options"}>
                                        <button type="button">Go to top</button>
                                        <button type="button">Hide</button>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
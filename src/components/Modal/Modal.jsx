import "./Modal.scss"
import "react-h5-audio-player/lib/styles.css"
import { useState, useEffect } from "react"
import AudioPlayer from "react-h5-audio-player"

// 9QCKN-J8PV4-YFQ2X-94FFG-PDKTT

export const Modal = (props) => {
    const [trackIndex, setTrackIndex] = useState(0)
    const [playlist, setPlaylist] = useState(props.data.playlist)
    const [hiddenPlaylist, setHiddenPlaylist] = useState([])
    const [isActive, setIsActive] = useState(false)

    const RemoveActiveMenu = () => {
        document.querySelectorAll(".item-menu").forEach((i) => {
            i.classList.remove("active")
        })
    }

    const HandleClickOutside = (e) => {
        if (e.target.classList.contains("item-menu-toggler") === false && e.target.closest("div").classList.contains("item-options") === false) {
            RemoveActiveMenu()
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", HandleClickOutside)
        return (() => {
            document.removeEventListener("mousedown", HandleClickOutside)
        })
    })

    const ClickPrevious = () => {
        setTrackIndex((currentTrack) =>
            currentTrack === 0 ? playlist.length - 1 : currentTrack - 1
        )
    }

    const ClickNext = () => {
        setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
        )
    }

    const CloseModal = () => {
        props.CloseModal()
    }

    const GetListItem = (e) => {
        setTrackIndex(parseInt(e.target.closest("li").getAttribute("order")))
        props.SetAutoPlay()
    }

    const ClickItemMenu = (e) => {
        if (e.currentTarget.closest(".item-menu").classList.contains("active")) {
            RemoveActiveMenu()
        }
        else {
            RemoveActiveMenu()
            e.currentTarget.closest(".item-menu").classList.add("active")
        }
    }

    const ClickToTop = (e) => {
        setPlaylist(() => {
            let remainList = playlist.filter((item) => item.name !== e.target.closest("li").getAttribute("name"))
            let topItem = playlist.filter((item) => item.name === e.target.closest("li").getAttribute("name"))
            return [...topItem, ...remainList]
        })

        const order = parseInt(e.target.closest("li").getAttribute("order"))
        if (order > trackIndex) {
            setTrackIndex(trackIndex + 1)
        }
        else if (order < trackIndex) {
            setTrackIndex(trackIndex)
        }
        else {
            setTrackIndex(0)
        }

        RemoveActiveMenu()
    }

    const ClickHide = (e) => {
        setPlaylist(playlist.filter((item) => item.name !== e.target.closest("li").getAttribute("name")))
        setHiddenPlaylist((prevValue) => {
            return [...prevValue, ...playlist.filter((item) => item.name === e.target.closest("li").getAttribute("name"))]
        })
        setTrackIndex(parseInt(e.target.closest("li").getAttribute("order")) < trackIndex ? trackIndex - 1 : trackIndex)
        RemoveActiveMenu()
    }

    const ClickShow = (e) => {
        setPlaylist([...playlist, ...hiddenPlaylist.filter((item) => item.name === e.target.closest("li").getAttribute("name"))])
        setHiddenPlaylist(hiddenPlaylist.filter((item) => item.name !== e.target.closest("li").getAttribute("name")))
    }

    return (
        <div id="modal" className={props.isOpenModal ? "active" : ""}>
            <div className="modal-background" onClick={CloseModal}></div>
            <div className="modal-container">
                <div className="header">
                    <h1>{props.data.name}</h1>
                    <button type="button" onClick={CloseModal}>
                        <ion-icon name="close-circle"></ion-icon>
                    </button>
                </div>
                <div className="play-section">
                    <AudioPlayer
                        style={{ borderRadius: "1rem" }}
                        autoPlayAfterSrcChange={props.autoPlay}
                        src={playlist[trackIndex].src}
                        showSkipControls={true}
                        showJumpControls={false}
                        header={`Now playing: ${playlist[trackIndex].name}`}
                        onClickPrevious={ClickPrevious}
                        onClickNext={ClickNext}
                        onEnded={ClickNext}
                        onPlay={() => {props.SetAutoPlay()}}
                        volume={0.1}
                    />
                </div>
                <ul className="playlist">
                    {playlist.map((item, index) => {
                        return (
                            <li key={index} name={item.name} order={index}>
                                <button className="name" type="button" onClick={GetListItem}>{item.name}</button>
                                <div className="item-menu">
                                    <button className="item-menu-toggler" type="button" onClick={ClickItemMenu}>
                                        <ion-icon name="ellipsis-horizontal"></ion-icon>
                                    </button>
                                    <div className={"item-options"}>
                                        <button type="button" onClick={ClickToTop}>
                                            <ion-icon name="arrow-up"></ion-icon>
                                            Go to top
                                        </button>
                                        <button type="button" onClick={ClickHide}>
                                            <ion-icon name="close-circle"></ion-icon>
                                            Hide
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>

                <div className="hidden-section">
                    <button className="hidden-btn" type="button" onClick={() => setIsActive(isActive ? false : true)}>
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                        Hidden playlist
                    </button>

                    <ul className={"hidden-playlist " + (isActive ? "active" : "")}>
                        {hiddenPlaylist.map((item, index) => {
                            return (
                                <li key={index} name={item.name}>
                                    <p>{item.name}</p>
                                    <button className="show-btn" type="button" onClick={ClickShow} aria-label="Show in playlist">
                                        <ion-icon name="add-circle"></ion-icon>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
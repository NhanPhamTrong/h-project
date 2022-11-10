import "./MainSection.scss"
import { useState } from "react"
import { wrap } from "popmotion"
import { motion, AnimatePresence } from "framer-motion"

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0
        }
    }
}

const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
}

export const MainSection = (props) => {
    const [[illustrator, direction], setIllustrator] = useState([0, 0])
    const imageIndex = wrap(0, props.data.images.length, illustrator)

    const ClickImage = (e) => {
        const index = props.data.images.indexOf(e.target.getAttribute("src"))

        if (index > imageIndex) {
            setIllustrator([illustrator + index - imageIndex, index - imageIndex])
        }
        else if (index < imageIndex) {
            setIllustrator([illustrator - (imageIndex - index), -(imageIndex - index)])
        }
    }

    const OpenModal = () => {
        props.OpenModal()
    }

    return (
        <motion.div className="main-section"
            key={props.data.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <AnimatePresence>
                <div className="illustrator">
                    <motion.img src={props.data.images[imageIndex]} alt=""
                        key={illustrator}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4 }}/>
                </div>
            </AnimatePresence>
            <ul className="images" style={{ left: "calc(20vw * " + (-imageIndex + 2) + ")" }}>
                {props.data.images.map((img, index) => {
                    return (
                        <li key={index} className={props.data.images.indexOf(img) === imageIndex ? "active" : ""}>
                            <img src={img} onClick={ClickImage} alt="" />
                        </li>
                    )
                })}
            </ul>
            <div className="container">
                <h1>{props.data.name}</h1>
                <p>{props.data.content}</p>
                <hr />
                <button className="playlist" type="button" onClick={OpenModal}>
                    Playlist
                    <ion-icon name="list"></ion-icon>
                </button>
                <hr />
                <ul className="social-media">
                    <li>
                        <button type="button" style={{"--i" : "rgb(255, 0, 0)"}} onClick={() => openInNewTab("https://dribbble.com/Nhan_Pham")}>
                            <ion-icon name="logo-youtube"></ion-icon>
                        </button>
                        <button type="button" style={{"--i" : "rgb(29, 155, 240)"}} onClick={() => openInNewTab("https://dribbble.com/Nhan_Pham")}>
                            <ion-icon name="logo-twitter"></ion-icon>
                        </button>
                        <button type="button" style={{"--i" : "rgb(108, 36, 152)"}} onClick={() => openInNewTab("https://dribbble.com/Nhan_Pham")}>
                            <ion-icon name="logo-twitch"></ion-icon>
                        </button>
                    </li>
                </ul>
            </div>
        </motion.div>
    )
}
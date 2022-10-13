import "./MainSection.scss"
import { useState } from "react"
import { wrap } from "popmotion"
import { motion, AnimatePresence } from "framer-motion"
import $ from "jquery";

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
    const [imgListStyle, setImgListStyle] = useState()

    const ClickImage = (e) => {
        const index = props.data.images.indexOf(e.target.getAttribute("src"))

        if (index > imageIndex) {
            setIllustrator([illustrator + index - imageIndex, index - imageIndex])
        }
        else if (index < imageIndex) {
            setIllustrator([illustrator - (imageIndex - index), -(imageIndex - index)])
        }
    }

    $(window).resize(() => {
        setImgListStyle($(window).width() < 992 ? {
            left: "calc(35vw * " + (-imageIndex + 1) + ")",
            top: "0"
        } : {
            left: "0",
            top: "calc(21vh * " + (-imageIndex + 2) + ")"
        })
    })

    return (
        <motion.div className="main-section"
            key={props.data.id}
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
            <div className="images">
                <ul style={$(window).width() < 992 ? {
                    left: "calc(35vw * " + (-imageIndex + 1) + ")",
                    top: "0"
                } : {
                    left: "0",
                    top: "calc(21vh * " + (-imageIndex + 2) + ")"
                }}>
                {/* <ul style={imgListStyle}> */}
                    {props.data.images.map((img, index) => {
                        return (
                            <li key={index} className={props.data.images.indexOf(img) === imageIndex ? "active" : ""}>
                                <img src={img} onClick={ClickImage} alt="" />
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="container">
                <h1>{props.data.name}</h1>
                <p>{props.data.content}</p>
                <hr />
                {/* <ul className="videos">
                    {props.data.videos.map((vid, index) => {
                        return (
                            <li key={index}>
                                <iframe width="420" height="315" src={vid} title="Bohemian" />
                            </li>
                        )
                    })}
                </ul> */}
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
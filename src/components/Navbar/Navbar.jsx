import "./Navbar.scss"
import { Data } from "../Data"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Content = (props) => {
    const ClickMember = (e) => {
        props.onClickMember(e.target.getAttribute("name"))
    }

    return (
        <motion.ul
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}>
            {props.data.member.map((memberItem, index) => {
                return (
                    <li key={index}>
                        <button type="button" onClick={ClickMember} name={memberItem.name}>{memberItem.name}</button>
                    </li>
                )
            })}
        </motion.ul>
    )
}

const Item = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const ClickMember = (name) => {
        props.onClickMember(name)
    }
  
    return (
        <li className={isOpen ? "active" : ""}>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
                <ion-icon name="chevron-forward-outline"></ion-icon>
                {props.data.gen}
            </button>
            <AnimatePresence>{isOpen && <Content onClickMember={ClickMember} data={props.data} />}</AnimatePresence>
        </li>
    )
}

export const Navbar = (props) => {
    const [isActive, setIsActive] = useState(false)

    const ClickMember = (name) => {
        props.onClickMember(name)
    }

    return (
            <nav className={isActive ? "active" : ""}>
                <AnimatePresence>
                    {
                        isActive && 
                        <motion.ul className="nav-container"
                            initial={{ opacity: 0, x: -256 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -256 }}
                            transition={{duration: 0.4}}>
                            {Data.map((data, index) => {
                                return (
                                    <Item key={index} data={data} onClickMember={ClickMember} />
                                )
                            })}
                        </motion.ul>
                    }
                </AnimatePresence>
                <button className="menu-toggler" type="button" onClick={() => setIsActive(!isActive)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
    )
}